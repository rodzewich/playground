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

    protected isThrowErrors(): boolean {
        return false;
    }

    protected isShowWarnings(): boolean {
        return true;
    }

    protected getIncludeDirectories():string[] {
        return this._includeDirectories.getDirectories();
    }

    protected setIncludeDirectories(value:string[]):void {
        this._includeDirectories.setDirectories(value);
    }

    public compile(callback:(errors:Error[], result:IResponse) => void):void {

        var resolve:string,
            mtime:number,
            content:string,
            memory:IMemory    = this.getMemory(),
            filename:string   = this.getFilename(),
            resultTime:number = parseInt(Number(new Date()).toString(10).slice(0, -3), 10),
            unlock:(callback?:(errors:Error[]) => void) => void,
            completion:((errors:Error[], result:IResponse) => void) =
                (errors:Error[], result:IResponse):void => {
                    if (typeOf(callback) === "function") {
                        if (errors && errors.length && this.isThrowErrors()) {
                            callback(errors, null);
                        } else if (errors && errors.length && result) {
                            callback(null, <IResponse>{
                                source : result.source,
                                result : this.createCssErrors(errors),
                                deps : result.deps,
                                map : result.map,
                                date : result.date
                            });
                        } else if (errors && errors.length) {
                            callback(null, {
                                source : null,
                                result : this.createCssErrors(errors),
                                deps : [],
                                map : {},
                                date : resultTime
                            });
                        } else {
                            callback(null, result);
                        }
                    }
                };

        deferred([

            // использование кеша
            (next:() => void):void => {
                if (this.isCacheUsed()) {
                    memory.getItem(filename, (errors:Error[], response:IResponse):void => {
                        completion(errors, response);
                    });
                } else {
                    next();
                }
            },

            // поиск исходника
            (next:() => void):void => {
                var directories:string[] = this.getIncludeDirectories(),
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
                    completion(errors, null);
                });
                deferred(actions);
            },

            // проверка всех зависимостей
            (next:() => void):void => {
                var directories:string[];
                memory.getItem(filename, (errors:Error[], response:IResponse):void => {
                    if ((!errors || !errors.length) &&
                        response && response.date >= mtime &&
                        response.deps.length === 0) {
                        completion(null, response);
                    } else if ((!errors || !errors.length) &&
                        response && response.date >= mtime &&
                        response.deps.length !== 0) {
                        directories = this.getIncludeDirectories();
                        directories.unshift(this.getSourcesDirectory());
                        parallel(response.deps.map((filename:string):((next:() => void) => void) => {
                            return (done:() => void):void => {
                                var actions:((next:() => void) => void)[] =
                                    directories.map((directory:string):((next:() => void) => void) => {
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
                        completion(errors, null);
                    } else {
                        next();
                    }
                });
            },

            // установка блокировки
            (next:() => void):void => {
                memory.lock(filename, (errors:Error[], result:(callback?:(errors:Error[]) => void) => void):void => {
                    if (!errors || !errors.length) {
                        unlock = result;
                        next();
                    } else {
                        completion(errors, null);
                    }
                });
            },

            // контент файла
            (next:() => void):void => {
                var temp:Error[] = [];
                fs.readFile(resolve, (error:Error, buffer:Buffer):void => {
                    if (!error) {
                        content = buffer.toString("utf8");
                        next();
                    } else {
                        temp.push(error);
                        deferred([
                            // снятие блокировки
                            (next:() => void):void => {
                                unlock((errors:Error[]):void => {
                                    if (errors && errors.length) {
                                        temp.concat(errors);
                                    }
                                    next();
                                });
                            },
                            ():void => {
                                completion(temp, null);
                            }
                        ]);
                    }
                });
            },

             // процессинг
            ():void => {
                var compiler:any,
                    postError:string = "",
                    includeDirectories = this.getIncludeDirectories();
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
                compiler.render((error:Error, result:string):void => {
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
                            result: result,
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
                                        // postcss processing
                                        (callback:() => void):void => {
                                            var postcss:IPostcss = new Postcss();
                                            postcss.compile(value.result, value.map, (error:Error, res:IResult):void => {
                                                if (error) {
                                                    temp.push(error);
                                                    next();
                                                } else {
                                                    value.result = res.result;
                                                    if (this.isShowWarnings()) {
                                                        //value.result +=
                                                    }
                                                    value.map = res.map;
                                                    callback();
                                                }
                                            });
                                        },
                                        ():void => {
                                            memory.setItem(filename, value, (errors:Error[]):void => {
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
                                if (this.isThrowErrors()) {
                                    completion(temp, null);
                                } else {
                                    completion(null, <IResponse>{
                                        source: null,
                                        result: this.createCssErrors(temp),
                                        deps: [],
                                        map: {},
                                        date: resultTime
                                    });
                                }
                            },
                        ]);
                    }
                });
            }

        ]);
    }


}

export = Compiler;