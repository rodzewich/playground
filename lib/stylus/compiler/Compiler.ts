/// <reference path="../../compiler/compiler/Compiler.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="./ICompiler.ts" />
/// <reference path="../../typeOf.ts" />
/// <reference path="../../Exception.ts" />
/// <reference path="../../deferred.ts" />
/// <reference path="../../parallel.ts" />
/// <reference path="../../memory/client/IClient.ts" />
/// <reference path="../client/IResponse" />
/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./autoprefixer.d.ts" />
/// <reference path="./stylus.d.ts" />
/// <reference path="../Exception.ts" />
/// <reference path="../../helpers/PostcssEpubHelper.ts" />
/// <reference path="../../helpers/IPostcssEpubHelper.ts" />
/// <reference path="../../helpers/PostcssAutoprefixerHelper.ts" />
/// <reference path="../../helpers/IPostcssAutoprefixerHelper.ts" />
/// <reference path="../../helpers/PostcssColorRgbaHelper.ts" />
/// <reference path="../../helpers/IPostcssColorRgbaHelper.ts" />

// todo: уметь использовать globals, functions, imports
// todo: уметь устанавливать переменные
// todo: уметь устанавливать дефолтные импорты
// todo: уметь устанавливать плагины
// todo: подружить с Autoprefixer

import BaseCompiler = require("../../compiler/compiler/Compiler");
import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import typeOf = require("../../typeOf");
import deferred = require("../../deferred");
import parallel = require("../../parallel");
import IMemory = require("../../memory/client/IClient");
import IResponse = require("../client/IResponse");
import stylus = require("stylus");
import path = require("path");
import fs = require("fs");
import BaseException = require("../../Exception");
import LessException = require("../Exception");

import postcss = require("postcss");
import postcssSafeParser = require("postcss-safe-parser");

class Compiler extends BaseCompiler implements ICompiler {

    private _includeDirectories:string[] = [];

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.setIncludeDirectories(options.includeDirectories);
        }
    }

    protected getIncludeDirectories():string[] {
        return this._includeDirectories;
    }

    protected setIncludeDirectories(value:string[]):void {
        this._includeDirectories = value;
    }

    /**
     pixrem generates pixel fallbacks for rem units.
     */

    protected postcss(options:{content: string; map: any}, callback:(errors?:Error[], result?:{content: string; map: any}) => void):void {
        postcss(this.getPostcssPlugins()).process(options.content, {
            parser: postcssSafeParser,
            map: {
                inline: false,
                prev: options.map || false,
                sourcesContent: false,
                annotation: false
            }
        }).then((result:any):void => {
            callback(null, {content: result.css, map: result.map});
        });
    }

    public compile(callback:(errors?:Error[], result?:IResponse) => void):void {
        var filename:string = this.getFilename(),
            resolve:string,
            mtime:number,
            memory:IMemory = this.getMemory(),
            unlock:(callback?:(errors?:Error[]) => void) => void,
            content:string;

        var postcss:((errors?:Error[], result?:IResponse) => void) = (errors?:Error[], result?:IResponse):void => {
            if (result && typeOf(result.result) === "string") {
                this.postcss({
                    content: result.result,
                    map: result.map
                }, (errors?:Error[], res?:{content: string; map: any}):void => {
                    callback(errors, {
                        source: result.source,
                        result: res.content,
                        deps: result.deps,
                        map: res.map,
                        date: result.date
                    });
                });
            } else {
                callback(errors, result);
            }
        };

        deferred([

            (next:() => void):void => {
                if (this.getCache().isUsed()) {
                    memory.getItem(filename, (errors?:Error[], response?:IResponse):void => {
                        if (!errors || errors.length) {
                            postcss(null, response || null);
                        } else {
                            postcss(errors, null);
                        }
                    });
                } else {
                    next();
                }
            },

            (next:() => void):void => {
                var directories:string[] = this.getIncludeDirectories().slice(0),
                    errors:Error[] = [],
                    actions:((next:() => void) => void)[];
                directories.unshift(this.getSourcesDirectory().getLocation());
                actions = directories.map((directory:string):((next:() => void) => void) => {
                    return (callback:() => void):void => {
                        resolve = path.join(directory, filename + ".styl");
                        fs.stat(resolve, (error:Error, stats:fs.Stats):void => {
                            if (!error && stats.isFile()) {
                                mtime = parseInt(Number(stats.mtime).toString(10).slice(0, -3), 10);
                                next();
                            } else {
                                if (error && BaseException.getCode(error) !== "ENOENT") {
                                    errors.push(error);
                                }
                                callback();
                            }
                        });
                    };
                });
                actions.push(():void => {
                    if (errors.length) {
                        postcss(null, <IResponse>{
                            source: null,
                            result: this.getCssErrors().create(errors),
                            deps: [],
                            map: {},
                            date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    } else {
                        postcss(null, null);
                    }
                });
                deferred(actions);
            },

            (next:() => void):void => {
                var directories:string[];
                memory.getItem(filename, (errors:Error[], response:IResponse):void => {
                    if ((!errors || !errors.length) && response && response.date >= mtime && response.deps.length === 0) {
                        postcss(null, response);
                    } else if ((!errors || !errors.length) && response && response.date >= mtime && response.deps.length !== 0) {
                        directories = this.getIncludeDirectories().slice(0);
                        directories.unshift(this.getSourcesDirectory().getLocation());
                        parallel(response.deps.map((filename:string):((next:() => void) => void) => {
                            return (done:() => void):void => {
                                var actions:((next:() => void) => void)[] = directories.map((directory:string):((next:() => void) => void) => {
                                    var temp:string = path.join(directory, filename);
                                    return (next:() => void):void => {
                                        fs.stat(temp, function (error:Error, stats:fs.Stats) {
                                            if (!error && stats.isFile()) {
                                                mtime = Math.max(mtime, parseInt(Number(stats.mtime).toString(10).slice(0, -3), 10));
                                            }
                                            next();
                                        });
                                    };
                                });
                                actions.push(():void => {
                                    done();
                                });
                                deferred(actions);
                            };
                        }), ():void => {
                            if (response.date >= mtime) {
                                postcss(null, response);
                            } else {
                                next();
                            }
                        });
                    } else if (errors && errors.length) {
                        postcss(null, <IResponse>{
                            source: null,
                            result: this.getCssErrors().create(errors),
                            deps: [],
                            map: {},
                            date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    } else {
                        next();
                    }
                });
            },

            (next:() => void):void => {
                memory.lock(filename, (errors?:Error[], result?:(callback?:(errors?:Error[]) => void) => void):void => {
                    if (!errors || !errors.length) {
                        unlock = result;
                        next();
                    } else {
                        postcss(null, <IResponse>{
                            source: null,
                            result: this.getCssErrors().create(errors),
                            deps: [],
                            map: {},
                            date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    }
                });
            },

            (next:() => void):void => {
                var temp:Error[] = [];
                fs.readFile(resolve, (error:Error, buffer:Buffer):void => {
                    if (!error) {
                        content = buffer.toString("utf8");
                        next();
                    } else {
                        temp.push(error);
                        deferred([
                            (next:() => void):void => {
                                unlock((errors:Error[]):void => {
                                    if (errors && errors.length) {
                                        temp.concat(errors);
                                    }
                                    next();
                                });
                            },
                            ():void => {
                                postcss(null, <IResponse>{
                                    source: null,
                                    result: this.getCssErrors().create(temp),
                                    deps: [],
                                    map: {},
                                    date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                                });
                            },
                        ]);
                    }
                });
            },

            ():void => {
                var compiler:any,
                    postError:string = "",
                    includeDirectories = this.getIncludeDirectories().slice(0);
                includeDirectories.unshift(this.getSourcesDirectory().getLocation());
                compiler = stylus(content).
                    set("filename", resolve).
                    set("compress", true).
                    set("sourcemap", {
                        comment: false,
                        inline: false,
                        sourceRoot: null,
                        basePath: "/"
                    }).
                    set("paths", this.getIncludeDirectories());
                compiler.render((error?:Error, result?:string):void => {
                    var temp:Error[] = [],
                        value:IResponse,
                        deps:string[],
                        errors:Error[] = [];
                    if (!error) {
                        deps = compiler.deps().map((item:string):string => {
                            var index:number,
                                length:number = includeDirectories.length,
                                directory:string = path.dirname(filename),
                                importDirectory:string,
                                relative:string;
                            for (index = 0; index < length; index++) {
                                importDirectory = includeDirectories[index];
                                relative = path.relative(importDirectory, item);
                                if (index === 0) {
                                    relative = path.join(directory, relative);
                                }
                                if (relative.slice(0, 2) !== "..") {
                                    break;
                                }
                            }
                            if (relative.slice(0, 2) === "..") {
                                errors.push(new Error("bla bla bla"));
                                return null;
                            }
                            return relative;
                        });

                        value = <IResponse>{
                            result: result + String(postError || ""),
                            source: content,
                            deps: deps,
                            map: (((map:any):any => {
                                if (!map.sources) {
                                    return {};
                                }
                                map.sources = map.sources.map((item:string):string => {
                                    var index:number,
                                        length:number = includeDirectories.length,
                                        directory:string = path.dirname(filename),
                                        importDirectory:string,
                                        relative:string;
                                    item = path.join("/", item);
                                    for (index = 0; index < length; index++) {
                                        importDirectory = includeDirectories[index];
                                        relative = path.relative(importDirectory, item);
                                        if (index === 0) {
                                            relative = path.join(directory, relative);
                                        }
                                        if (relative.slice(0, 2) !== "..") {
                                            break;
                                        }
                                    }
                                    if (relative.slice(0, 2) === "..") {
                                        errors.push(new Error("bla bla bla"));
                                        return null;
                                    }
                                    return path.join("/", this.getWebRootDirectory(), relative);
                                });
                                return map;
                            })(compiler.sourcemap || {})),
                            date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        };

                        if (!errors || !errors.length) {
                            deferred([
                                (next:() => void):void => {
                                    memory.setItem(filename, value, (errors?:Error[]):void => {
                                        if (errors && errors.length) {
                                            temp.concat(errors);
                                        }
                                        next();
                                    });
                                },
                                (next:() => void):void => {
                                    unlock((errors:Error[]):void => {
                                        if (errors && errors.length) {
                                            temp.concat(errors);
                                        }
                                        next();
                                    });
                                },
                                ():void => {
                                    if (temp.length) {
                                        postcss(null, <IResponse>{
                                            source: null,
                                            result: this.getCssErrors().create(temp),
                                            deps: [],
                                            map: {},
                                            date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                                        });
                                    } else {
                                        postcss(null, value);
                                    }
                                },
                            ]);
                        } else {
                            postcss(null, <IResponse>{
                                source: null,
                                result: this.getCssErrors().create(errors),
                                deps: [],
                                map: {},
                                date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                            });
                        }
                    } else {
                        temp.push(new LessException(error));
                        deferred([
                            (next:() => void):void => {
                                unlock((errors:Error[]):void => {
                                    if (errors && errors.length) {
                                        temp.concat(errors);
                                    }
                                    next();
                                });
                            },
                            ():void => {
                                postcss(null, <IResponse>{
                                    source: null,
                                    result: this.getCssErrors().create(temp),
                                    deps: [],
                                    map: {},
                                    date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                                });
                            },
                        ]);
                    }
                });
            }

        ]);
    }


}

export = Compiler;