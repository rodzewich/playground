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
/// <reference path="./less.d.ts" />
/// <reference path="../Exception.ts" />

import BaseCompiler = require("../../compiler/compiler/Compiler");
import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import typeOf = require("../../typeOf");
import deferred = require("../../deferred");
import parallel = require("../../parallel");
import IMemory = require("../../memory/client/IClient");
import IResponse = require("../client/IResponse");
import less = require("less");
import path = require("path");
import fs = require("fs");
import BaseException = require("../../Exception");
import LessException = require("../Exception");

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

    public compile(callback:(errors?:Error[], result?:IResponse) => void):void {
        var filename:string = this.getFilename(),
            resolve:string,
            mtime:number,
            memory:IMemory = this.getMemory(),
            unlock:(callback?:(errors?:Error[]) => void) => void,
            content:string;

        deferred([

            (next:() => void):void => {
                if (this.isUseCache()) {
                    memory.getItem(filename, (errors?:Error[], response?:IResponse):void => {
                        if (!errors || errors.length) {
                            callback(null, response || null);
                        } else {
                            callback(errors, null);
                        }
                    });
                } else {
                    next();
                }
            },

            (next:() => void):void => {
                var errors:Error[] = [],
                    actions:((next:() => void) => void)[] =
                        this.getIncludeDirectories().map((directory:string):((next:() => void) => void) => {
                            return (callback:() => void):void => {
                                resolve = path.join(directory, filename + ".less");
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
                        callback(null, <IResponse>{
                            source: null,
                            result: this.createCssErrors(errors),
                            imports: [],
                            map: {},
                            date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        });
                    } else {
                        callback(null, null);
                    }
                });
                deferred(actions);
            },

            (next:() => void):void => {
                var directories:string[];
                memory.getItem(filename, (errors:Error[], response:IResponse):void => {
                    if ((!errors || !errors.length) && response && response.date >= mtime && response.imports.length === 0) {
                        callback(null, response);
                    } else if ((!errors || !errors.length) && response && response.date >= mtime && response.imports.length !== 0) {
                        directories = this.getIncludeDirectories().slice(0);
                        directories.unshift(this.getSourcesDirectory());
                        parallel(response.imports.map((filename:string):((next:() => void) => void) => {
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
                                callback(null, response);
                            } else {
                                next();
                            }
                        });
                    } else if (errors && errors.length) {
                        callback(null, <IResponse>{
                            source: null,
                            result: this.createCssErrors(errors),
                            imports: [],
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
                        callback(null, <IResponse>{
                            source: null,
                            result: this.createCssErrors(errors),
                            imports: [],
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
                                callback(null, <IResponse>{
                                    source: null,
                                    result: this.createCssErrors(temp),
                                    imports: [],
                                    map: {},
                                    date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                                });
                            },
                        ]);
                    }
                });
            },

            ():void => {
                var includeDirectories = this.getIncludeDirectories().slice(0);
                includeDirectories.unshift(this.getSourcesDirectory());
                less.render(content, <less.Options>{
                    paths: this.getIncludeDirectories(),
                    filename: path.join(this.getSourcesDirectory(), filename + ".less"),
                    compress: true,
                    sourceMap: true,
                    lint: true
                }, (error:Error, result:less.Result):void => {
                    var temp:Error[] = [],
                        value:IResponse,
                        imports:string[],
                        errors:Error[] = [];
                    if (!error) {
                        imports = result.imports.map((item:string):string => {
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
                        value = {
                            css: result.css,
                            map: (function (map) {
                                if (!map.sources) {
                                    return "{}";
                                }
                                map.sources = map.sources.map(function (item) {
                                    var index,
                                        length = importDirs.length,
                                        directory = path.dirname(filename),
                                        importDirectory,
                                        relative;

                                    for (index = 0; index < length; index++) {
                                        importDirectory = importDirs[index];
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

                                    return path.join(rootDirectory, relative);
                                });

                                return JSON.stringify(map);
                            }(JSON.parse(String(result.map || "{}")))),
                            less: content,
                            date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10),
                            imports: imports
                        };
                        if (errors.length) {
                            done({
                                css: errorHandler(errors),
                                map: "{}",
                                less: content,
                                date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10),
                                imports: []
                            });
                            unlock();
                        } else {
                            memory.setItem(filename, value, function (error) {
                                if (!error) {
                                    done(value);
                                    unlock();
                                } else {
                                    done({
                                        css: errorHandler([error]),
                                        map: "{}",
                                        less: content,
                                        date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10),
                                        imports: []
                                    });
                                    unlock();
                                }
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
                                callback(null, <IResponse>{
                                    source: null,
                                    result: this.createCssErrors(temp),
                                    imports: [],
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