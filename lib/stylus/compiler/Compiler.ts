/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./autoprefixer.d.ts" />
/// <reference path="./stylus.d.ts" />

// todo: уметь использовать globals, functions, imports
// todo: уметь устанавливать переменные
// todo: уметь устанавливать дефолтные импорты
// todo: уметь устанавливать плагины
// todo: подружить с Autoprefixer
// todo использовать https://github.com/rossPatton/stylint
// todo использовать http://nibstyl.us/#installation

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
import Postcss = require("../postcss/Postcss");
import IPostcss = require("../postcss/IPostcss");
import IResult = require("../postcss/IResult");
import IIncludeDirectoriesHelper = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../../helpers/IncludeDirectoriesHelper");

class Compiler extends BaseCompiler implements ICompiler {

    private _includeDirectories:IIncludeDirectoriesHelper = new IncludeDirectoriesHelper();

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.setIncludeDirectories(options.includeDirectories);
        }
    }

    protected getIncludeDirectories():string[] {
        return this._includeDirectories.getDirectories();
    }

    protected setIncludeDirectories(value:string[]):void {
        this._includeDirectories.setDirectories(value);
    }

    public compile(callback:(errors?:Error[], result?:IResponse) => void):void {
        var filename:string = this.getFilename(),
            resolve:string,
            mtime:number,
            memory:IMemory = this.getMemory(),
            unlock:(callback?:(errors?:Error[]) => void) => void,
            resultTime:number = parseInt(Number(new Date()).toString(10).slice(0, -3), 10),
            content:string;

        function completion(errors?:Error[], result?:IResponse):void {
            if (typeOf(callback) === "function") {
                callback(errors, result);
            }
        }

        deferred([

            (next:() => void):void => {
                if (this.isCacheUsed()) {
                    memory.getItem(filename, (errors?:Error[], response?:IResponse):void => {
                        if (!errors || errors.length) {
                            completion(null, response || null);
                        } else if (errors) {
                            completion(null, {
                                source: null,
                                result: this.createCssErrors(errors),
                                deps: [],
                                map: {},
                                date: resultTime
                            });
                        } else {
                            completion(null, null);
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
                directories.unshift(this.getSourcesDirectory());
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
                        completion(null, <IResponse>{
                            source: null,
                            result: this.createCssErrors(errors),
                            deps: [],
                            map: {},
                            date: resultTime
                        });
                    } else {
                        completion(null, null);
                    }
                });
                deferred(actions);
            },

            (next:() => void):void => {
                var directories:string[];
                memory.getItem(filename, (errors:Error[], response:IResponse):void => {
                    if ((!errors || !errors.length) && response && response.date >= mtime && response.deps.length === 0) {
                        completion(null, response);
                    } else if ((!errors || !errors.length) && response && response.date >= mtime && response.deps.length !== 0) {
                        directories = this.getIncludeDirectories().slice(0);
                        directories.unshift(this.getSourcesDirectory());
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
                                completion(null, response);
                            } else {
                                next();
                            }
                        });
                    } else if (errors && errors.length) {
                        completion(null, <IResponse>{
                            source: null,
                            result: this.createCssErrors(errors),
                            deps: [],
                            map: {},
                            date: resultTime
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
                        completion(null, <IResponse>{
                            source: null,
                            result: this.createCssErrors(errors),
                            deps: [],
                            map: {},
                            date: resultTime
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
                                completion(null, <IResponse>{
                                    source: null,
                                    result: this.createCssErrors(temp),
                                    deps: [],
                                    map: {},
                                    date: resultTime
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
                includeDirectories.unshift(this.getSourcesDirectory());
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
                            date: resultTime
                        };

                        if (!errors || !errors.length) {
                            deferred([
                                (next:() => void):void => {
                                    deferred([
                                        (callback:() => void):void => {
                                            var postcss:IPostcss = new Postcss();
                                            postcss.compile(value.result, value.map, (error?:Error, res?:IResult):void => {
                                                if (error) {
                                                    temp.push(error);
                                                    next();
                                                } else {
                                                    value.result = res.result;
                                                    value.map = res.map;
                                                    callback();
                                                }
                                            });
                                        },
                                        ():void => {
                                            memory.setItem(filename, value, (errors?:Error[]):void => {
                                                if (errors && errors.length) {
                                                    temp.concat(errors);
                                                }
                                                next();
                                            });
                                        }
                                    ]);
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
                                        completion(null, <IResponse>{
                                            source: null,
                                            result: this.createCssErrors(temp),
                                            deps: [],
                                            map: {},
                                            date: resultTime
                                        });
                                    } else {
                                        completion(null, value);
                                    }
                                },
                            ]);
                        } else {
                            completion(null, <IResponse>{
                                source: null,
                                result: this.createCssErrors(errors),
                                deps: [],
                                map: {},
                                date: resultTime
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
                                completion(null, <IResponse>{
                                    source: null,
                                    result: this.createCssErrors(temp),
                                    deps: [],
                                    map: {},
                                    date: resultTime
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