/// <reference path="../../../types/node/node.d.ts" />

// todo: уметь использовать globals, functions, imports
// todo: уметь устанавливать переменные
// todo: уметь устанавливать дефолтные импорты
// todo: уметь устанавливать плагины
// todo: уметь управлять браузерами Autoprefixer'а

import CompilerBase = require("../../compiler/compiler/Compiler");
import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import {isDefined, isFunction, deferred, parallel} from "../../utils";
import parallel = require("../../parallel");
import IMemory = require("../../memory/client/IClient");
import IResponse = require("../client/IResponse");
import path = require("path");
import fs = require("fs");
import ExceptionBase = require("../../Exception");
import LessException = require("../Exception");
import IIncludeDirectoriesHelper = require("../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../helpers/IncludeDirectoriesHelper");
import BrandSpecificLogic = require("../helpers/BrandSpecificLogic");
import IBrandSpecificLogic = require("../helpers/IBrandSpecificLogic");
import SupportLanguages = require("../helpers/SupportLanguages");
import ISupportLanguages = require("../helpers/ISupportLanguages");
import ThrowErrors = require("../helpers/ThrowErrors");
import IThrowErrors = require("../helpers/IThrowErrors");
import UsedPostProcessing = require("../helpers/UsedPostProcessing");
import IUsedPostProcessing = require("../helpers/IUsedPostProcessing");
import ISourceMap = require("../../helpers/ISourceMap");


class Compiler extends CompilerBase implements ICompiler {

    private _memory:IMemory;

    private _includeDirectoriesInstance:IIncludeDirectoriesHelper;

    private _brandSpecificLogicInstance:IBrandSpecificLogic;

    private _supportLanguagesInstance:ISupportLanguages;

    private _throwErrorsInstance:IThrowErrors;

    private _usedPostProcessingInstance:IUsedPostProcessing;

    protected createIncludeDirectoriesInstance():IIncludeDirectoriesHelper {
        return new IncludeDirectoriesHelper();
    }

    protected getIncludeDirectoriesInstance():IIncludeDirectoriesHelper {
        if (!this._includeDirectoriesInstance) {
            this._includeDirectoriesInstance = this.createIncludeDirectoriesInstance();
        }
        return this._includeDirectoriesInstance;
    }

    protected createBrandSpecificLogicInstance():IBrandSpecificLogic {
        return new BrandSpecificLogic();
    }

    protected getBrandSpecificLogicInstance():IBrandSpecificLogic {
        if (!this._brandSpecificLogicInstance) {
            this._brandSpecificLogicInstance = this.createBrandSpecificLogicInstance();
        }
        return this._brandSpecificLogicInstance;
    }

    protected createSupportLanguagesInstance():ISupportLanguages {
        return new SupportLanguages();
    }

    protected getSupportLanguagesInstance():ISupportLanguages {
        if (!this._supportLanguagesInstance) {
            this._supportLanguagesInstance = this.createSupportLanguagesInstance();
        }
        return this._supportLanguagesInstance;
    }

    protected createThrowErrorsInstance():IThrowErrors {
        return new ThrowErrors();
    }

    protected getThrowErrorsInstance():IThrowErrors {
        if (!this._throwErrorsInstance) {
            this._throwErrorsInstance = this.createThrowErrorsInstance();
        }
        return this._throwErrorsInstance;
    }

    protected createUsedPostProcessingInstance():IUsedPostProcessing {
        return new UsedPostProcessing();
    }

    protected getUsedPostProcessingInstance():IUsedPostProcessing {
        if (!this._usedPostProcessingInstance) {
            this._usedPostProcessingInstance = this.createUsedPostProcessingInstance();
        }
        return this._usedPostProcessingInstance;
    }

    constructor(options:IOptions) {
        super(options);
        if (options && isDefined(options.includeDirectories)) {
            this.setIncludeDirectories(options.includeDirectories);
        }
        if (options && isDefined(options.brandSpecificLogic)) {
            this.setIsBrandSpecificLogic(options.brandSpecificLogic);
        }
        if (options && isDefined(options.supportLanguages)) {
            this.setIsSupportLanguages(options.supportLanguages);
        }
        if (options && isDefined(options.throwErrors)) {
            this.setIsThrowErrors(options.throwErrors);
        }
        if (options && isDefined(options.usedPostProcessing)) {
            this.setIsUsedPostProcessing(options.usedPostProcessing);
        }
    }

    public isBrandSpecificLogic():boolean {
        return this.getBrandSpecificLogicInstance().isUsed();
    }

    public getIsBrandSpecificLogic():boolean {
        return this.getBrandSpecificLogicInstance().getIsUsed();
    }

    public setIsBrandSpecificLogic(value:boolean):void {
        this.getBrandSpecificLogicInstance().setIsUsed(value);
    }

    public getIncludeDirectories():string[] {
        return this.getIncludeDirectoriesInstance().getDirectories();
    }

    public setIncludeDirectories(value:string[]):void {
        this.getIncludeDirectoriesInstance().setDirectories(value);
    }

    public isSupportLanguages():boolean {
        return this.getSupportLanguagesInstance().isSupport();
    }

    public getIsSupportLanguages():boolean {
        return this.getSupportLanguagesInstance().getIsSupport();
    }

    public setIsSupportLanguages(value:boolean):void {
        this.getSupportLanguagesInstance().setIsSupport(value);
    }

    public isThrowErrors():boolean {
        return this.getThrowErrorsInstance().isThrow();
    }

    public getIsThrowErrors():boolean {
        return this.getThrowErrorsInstance().getIsThrow();
    }

    public setIsThrowErrors(value:boolean):void {
        return this.getThrowErrorsInstance().setIsThrow(value);
    }

    public isUsedPostProcessing():boolean {
        return this.getUsedPostProcessingInstance().isUsed();
    }

    public getIsUsedPostProcessing():boolean {
        return this.getUsedPostProcessingInstance().getIsUsed();
    }

    public setIsUsedPostProcessing(value:boolean):void {
        this.getUsedPostProcessingInstance().setIsUsed(value);
    }

    protected getExtensions():string [] {
        return null;
    }

    public setMemory(value:IMemory):void {
        this._memory = value;
    }

    public getMemory():IMemory {
        return this._memory;
    }

    public compile(callback:(errors:Error[], result:IResponse) => void):void {
        var temp1:string,
            temp2:string,
            filename:string          = this.getFilename(),
            brandSpecific:boolean    = this.isBrandSpecificLogic(),
            supportLanguages:boolean = this.isSupportLanguages(),
            done:((errors:Error[], result:IResponse) => void) =
                (errors:Error[], result:IResponse):void => {
                    if (isFunction(callback)) {
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
                                if (isFunction(callback)) {
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
                                errors:Error[]       = [],
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
                                                if (error && ExceptionBase.getCode(error) !== "ENOENT") {
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
                            var errors:Error[] = [];
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
                            var errors:Error[] = [];
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
                            var errors:Error[]     = [],
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
                                    relative        = path.relative(importDirectory, item);
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
                            var errors:Error[]     = [],
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
                                    relative        = path.relative(importDirectory, item);
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
                                return path.join(path.sep, this.getWebRootDirectory(), relative);
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

        // todo: проверять зависимости от *.json файлов в случае необходимости
        // todo: добавить postcss
        // todo: добавить rework

        if (!brandSpecific && !supportLanguages) {
            // компилировать как есть
            compile(filename, callback);
        } else if (brandSpecific && !supportLanguages) {
            // только бредирование
            temp1 = filename.replace(/^(.+)-(?:\d+)$/, "$1");
            deferred([
                (next:() => void):void => {
                    compile(filename, (errors:Error[], result:IResponse):void => {
                        if (errors && errors.length) {
                            done(errors, null);
                        } else if (result) {
                            done(null, result);
                        } else if (temp1 !== filename) {
                            next();
                        } else {
                            done(null, null);
                        }
                    });
                },
                (next:() => void):void => {
                    compile(temp1, callback);
                }
            ]);
        } else if (!brandSpecific && supportLanguages) {
            // только локализация
            temp1 = filename.replace(/^(.+)-(?:[a-z]{2}(?:_[A-Z]{2})?)$/, "$1");
            compile(temp1, callback);
        } else {
            // брендирование & локализация
            temp1 = filename.replace(/^(.+)-(?:[a-z]{2}(?:_[A-Z]{2})?)$/, "$1");
            temp2 = temp1.replace(/^(.+)-(?:\d+)$/, "$1");
            deferred([
                (next:() => void):void => {
                    compile(temp1, (errors:Error[], result:IResponse):void => {
                        if (errors && errors.length) {
                            done(errors, null);
                        } else if (result) {
                            done(null, result);
                        } else if (temp1 !== temp2) {
                            next();
                        } else {
                            done(null, null);
                        }
                    });
                },
                (next:() => void):void => {
                    compile(temp2, callback);
                }
            ]);
        }


    }

    protected preProcessing(options:{filename: string; content: string;}, callback:(errors:Error[], result:{css: string; maps: any; deps: string[];}) => void):void {
        callback(null, null);
    }

    protected postProcessing(options:{content: string; maps: ISourceMap; contents: ({[key: string]: string})}, callback:(errors:Error[], result:{css: string; maps: ISourceMap;}) => void):void {
        callback(null, {css : options.content, maps : options.maps});
    }

}

export = Compiler;