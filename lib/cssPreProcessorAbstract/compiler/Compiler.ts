/// <reference path="../../../types/node/node.d.ts" />

// todo: уметь использовать globals, functions, imports
// todo: уметь устанавливать переменные
// todo: уметь устанавливать дефолтные импорты
// todo: уметь устанавливать плагины
// todo: уметь управлять браузерами Autoprefixer'а
// todo: подключить плагины https://www.npmjs.com/search?q=node-sass

// TODO: ПРОВЕРИТЬ ПО ВСЕМУ ПРОЕКТУ ИСПОЛЬЗОВАНИЕ Array#concat

import BaseCompiler = require("../../compiler/compiler/Compiler");
import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import typeOf = require("../../typeOf");
import deferred = require("../../deferred");
import parallel = require("../../parallel");
import IMemory = require("../../memory/client/IClient");
import IResponse = require("../client/IResponse");
import path = require("path");
import fs = require("fs");
import BaseException = require("../../Exception");
import LessException = require("../Exception");
import IIncludeDirectoriesHelper = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../../helpers/IncludeDirectoriesHelper");
import ISourceMap = require("../../helpers/ISourceMap");

class Compiler extends BaseCompiler implements ICompiler {

    private _memory:IMemory;

    private _includeDirectories: IIncludeDirectoriesHelper = new IncludeDirectoriesHelper();

    constructor(options: IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.setIncludeDirectories(options.includeDirectories);
        }
    }

    protected isBrandSpecificLogic():boolean {
        return true;
    }

    protected isSupportLanguages():boolean {
        return true;
    }

    protected isThrowErrors():boolean {
        return false;
    }

    protected isUsedPostProcessing():boolean {
        return true;
    }

    protected getExtensions():string [] {
        return [];
    }

    protected getIncludeDirectories(): string[] {
        return this._includeDirectories.getDirectories();
    }

    protected setIncludeDirectories(value: string[]): void {
        this._includeDirectories.setDirectories(value);
    }

    public setMemory(value:IMemory):void {
        this._memory = value;
    }

    public getMemory():IMemory {
        return this._memory;
    }

    public compile(callback: (errors: Error[], result: IResponse) => void): void {
        var temp:string,
            filename:string          = this.getFilename(),
            brandSpecific:boolean    = this.isBrandSpecificLogic(),
            supportLanguages:boolean = this.isSupportLanguages(),
            done:((errors:Error[], result:IResponse) => void) =
                (errors:Error[], result:IResponse):void => {
                    if (typeOf(callback) !== "function") {
                        callback(errors, result);
                    }
                },
            compile:((filename:string, callback:(errors:Error[], result:IResponse) => void) => void) =
                (filename:string, callback:(errors:Error[], result:IResponse) => void):void => {

                    var resolve:string,
                        mtime:number,
                        content:string,
                        contents:({[key: string]: string}) = {},
                        dependencies:string[] = [],
                        sourceMap:ISourceMap  = null,
                        result:string         = null,
                        memory:IMemory        = this.getMemory(),
                        resultTime:number     = parseInt(Number(new Date()).toString(10).slice(0, -3), 10),
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
                                        deps   : result.deps,
                                        map    : result.map,
                                        date   : result.date
                                    });
                                } else if (errors && errors.length) {
                                    callback(null, <IResponse>{
                                        source : null,
                                        result : this.createCssErrors(errors),
                                        deps   : [],
                                        map    : {},
                                        date   : resultTime
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
                                actions:((next:() => void) => void)[] = [];
                            directories.unshift(this.getSourcesDirectory());
                            directories.forEach((directory:string):void => {
                                this.getExtensions().forEach((extension:string):void => {
                                    actions.push((callback:() => void):void => {
                                        resolve = path.join(directory, filename + extension);
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
                                    });
                                });
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
                                                    temp = temp.concat(errors);
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

                        // препроцессинг
                        (next:() => void):void => {
                            var errors: Error[] = [];
                            this.preProcessing({
                                filename : resolve,
                                content  : content
                            }, (errs:Error[], res:{css: string; maps: any; deps: string[];}):void => {
                                if (!errs || !errs.length) {
                                    sourceMap    = res.maps;
                                    dependencies = res.deps;
                                    result       = res.css;
                                    next();
                                } else {
                                    errors = errors.concat(errs);
                                    deferred([
                                        // снятие блокировки
                                        (next:() => void):void => {
                                            unlock((errs:Error[]):void => {
                                                if (errs && errs.length) {
                                                    errors = errors.concat(errs);
                                                }
                                                next();
                                            });
                                        },
                                        ():void => {
                                            completion(errors, <IResponse>{
                                                source : content,
                                                result : null,
                                                deps   : [],
                                                map    : {},
                                                date   : resultTime
                                            });
                                        }
                                    ]);
                                }
                            });
                        },

                        // загрузка исходников
                        (next:() => void):void => {
                            var errors:Error[] = [];
                            parallel((sourceMap.sources || []).map((filename:string):((done:() => void) => void) => {
                                return (done:() => void):void => {
                                    fs.readFile(filename, (error:Error, content:Buffer):void => {
                                        if (!error) {
                                            contents[filename] = content.toString("utf8");
                                        } else {
                                            errors.push(error);
                                        }
                                        done();
                                    });
                                };
                            }), ():void => {
                                if (!errors.length) {
                                    next();
                                } else {
                                    deferred([
                                        // снятие блокировки
                                        (next:() => void):void => {
                                            unlock((errs:Error[]):void => {
                                                if (errs && errs.length) {
                                                    errors = errors.concat(errs);
                                                }
                                                next();
                                            });
                                        },
                                        ():void => {
                                            completion(errors, <IResponse>{
                                                source : content,
                                                result : result,
                                                deps   : [],
                                                map    : {},
                                                date   : resultTime
                                            });
                                        }
                                    ]);
                                }
                            });
                        },

                        // постпроцессинг
                        (next:() => void):void => {
                            var errors: Error[] = [];
                            if (this.isUsedPostProcessing()) {
                                this.postProcessing({
                                    maps     : sourceMap,
                                    content  : result,
                                    contents : contents
                                }, (errs:Error[], res:{css: string; maps: ISourceMap;}):void => {
                                    if (!errs || !errs.length) {
                                        result    = res.css;
                                        sourceMap = res.maps;
                                        next();
                                    } else {
                                        errors = errors.concat(errs);
                                        deferred([
                                            // снятие блокировки
                                            (next:() => void):void => {
                                                unlock((errs:Error[]):void => {
                                                    if (errs && errs.length) {
                                                        errors = errors.concat(errs);
                                                    }
                                                    next();
                                                });
                                            },
                                            ():void => {
                                                completion(errors, <IResponse>{
                                                    source : content,
                                                    result : null,
                                                    deps   : [],
                                                    map    : {},
                                                    date   : resultTime
                                                });
                                            }
                                        ]);
                                    }
                                });
                            } else {
                                next();
                            }
                        },

                        // обрезание зависимостей
                        (next:() => void):void => {
                            var errors: Error[] = [],
                                includeDirectories = this.getIncludeDirectories();
                            includeDirectories.unshift(this.getSourcesDirectory());
                            dependencies = dependencies.map((item:string):string => {
                                var index:number,
                                    length:number    = includeDirectories.length,
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
                            if (!errors.length) {
                                next();
                            } else {
                                deferred([
                                    // снятие блокировки
                                    (next:() => void):void => {
                                        unlock((errs:Error[]):void => {
                                            if (errs && errs.length) {
                                                errors = errors.concat(errs);
                                            }
                                            next();
                                        });
                                    },
                                    ():void => {
                                        completion(errors, <IResponse>{
                                            source : content,
                                            result : result,
                                            deps   : [],
                                            map    : {},
                                            date   : resultTime
                                        });
                                    }
                                ]);
                            }
                        },

                        // обрезание мапов
                        (next:() => void):void => {
                            var errors: Error[] = [],
                                includeDirectories = this.getIncludeDirectories();
                            includeDirectories.unshift(this.getSourcesDirectory());
                            sourceMap.sources = (sourceMap.sources || []).map((item:string):string => {
                                var index:number,
                                    length:number    = includeDirectories.length,
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
                                return path.join("/", this.getWebRootDirectory(), relative);
                            });
                            if (!errors.length) {
                                next();
                            } else {
                                deferred([
                                    // снятие блокировки
                                    (next:() => void):void => {
                                        unlock((errs:Error[]):void => {
                                            if (errs && errs.length) {
                                                errors = errors.concat(errs);
                                            }
                                            next();
                                        });
                                    },
                                    ():void => {
                                        completion(errors, <IResponse>{
                                            source : content,
                                            result : result,
                                            deps   : [],
                                            map    : {},
                                            date   : resultTime
                                        });
                                    }
                                ]);
                            }
                        },

                        // результат
                        (next:() => void):void => {
                            var errors:Error[]  = [],
                                value:IResponse = {
                                    source : content,
                                    result : result,
                                    deps   : dependencies,
                                    map    : sourceMap,
                                    date   : resultTime
                                };
                            deferred([
                                // сохранение результа
                                (next:() => void):void => {
                                    memory.setItem(filename, value, (errs:Error[]):void => {
                                        if (errs && errs.length) {
                                            errors = errors.concat(errs);
                                        }
                                        next();
                                    });
                                },
                                // снятие блокировки
                                (next:() => void):void => {
                                    unlock((errs:Error[]):void => {
                                        if (errs && errs.length) {
                                            errors = errors.concat(errs);
                                        }
                                        next();
                                    });
                                },
                                // результат
                                (next:() => void):void => {
                                    if (!errors || !errors.length) {
                                        completion(null, value);
                                    } else {
                                        completion(errors, <IResponse>{
                                            source : content,
                                            result : result,
                                            deps   : [],
                                            map    : {},
                                            date   : resultTime
                                        });
                                    }
                                }
                            ]);
                        }

                    ]);

                };

        if (!brandSpecific && !supportLanguages) {
            // компилировать как есть
            compile(filename, callback);
        } else if (brandSpecific && !supportLanguages) {
            // только бредирование
            temp = filename.replace(/^(.+)-(?:\d+)$/, "$1");
            deferred([
                (next:() => void):void => {
                    compile(filename, (errors: Error[], result: IResponse): void => {
                        if (errors && errors.length) {
                            done(errors, null);
                        } else if (result) {
                            done(null, result);
                        } else if (temp !== filename) {
                            next();
                        } else {
                            done(null, null);
                        }
                    });
                },
                (next:() => void):void => {
                    compile(temp.replace(/^(.+)-(?:\d+)$/, "$1"), callback);
                }
            ]);
        } else if (!brandSpecific && supportLanguages) {
            // только локализация
            temp = filename.replace(/^(.+)-(?:[a-z]{2}(?:_[A-Z]{2})?)$/, "$1");
            compile(temp, callback);
        } else {
            // брендирование & локализация

        }


    }

    protected preProcessing(options:{filename: string; content: string;}, callback:(errors:Error[], result:{css: string; maps: any; deps: string[];}) => void):void {
        callback(null, null);
    }

    protected postProcessing(options:{content: string; maps: ISourceMap; contents: ({[key: string]: string})}, callback:(errors:Error[], result:{css: string; maps: ISourceMap;}) => void):void {
        callback(null, {css: options.content, maps: options.maps});
    }

}

export = Compiler;