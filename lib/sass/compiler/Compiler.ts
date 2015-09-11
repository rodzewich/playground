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

// todo: уметь использовать globals, functions, imports
// todo: уметь устанавливать переменные
// todo: уметь устанавливать дефолтные импорты
// todo: уметь устанавливать плагины
// todo: уметь управлять браузерами Autoprefixer'а

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
import autoprefixer = require('autoprefixer-stylus');
import IIncludeDirectoriesHelper = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../../helpers/IncludeDirectoriesHelper");
import ISassLocationHelper = require("../../helpers/ISassLocationHelper");
import SassLocationHelper = require("../../helpers/SassLocationHelper");
import ICompassLocationHelper = require("../../helpers/ICompassLocationHelper");
import CompassLocationHelper = require("../../helpers/CompassLocationHelper");
import ISassCompilerTypeHelper = require("../../helpers/ISassCompilerTypeHelper");
import SassCompilerTypeHelper = require("../../helpers/SassCompilerTypeHelper");
import ITemporaryDirectoryLocationHelper = require("../../helpers/ITemporaryDirectoryLocationHelper");
import TemporaryDirectoryLocationHelper = require("../../helpers/TemporaryDirectoryLocationHelper");
import CompilerType = require("../compiler/Type");
import sass = require("node-sass");

class Compiler extends BaseCompiler implements ICompiler {

    private _includeDirectories:IIncludeDirectoriesHelper = new IncludeDirectoriesHelper();

    private _sassLocation:ISassLocationHelper = new SassLocationHelper();

    private _compassLocation:ICompassLocationHelper = new CompassLocationHelper();

    private _temporaryDirectoryLocation:ITemporaryDirectoryLocationHelper = new TemporaryDirectoryLocationHelper();

    private _compilerType:ISassCompilerTypeHelper<CompilerType> = new SassCompilerTypeHelper<CompilerType>();

    constructor(options:IOptions) {
        super(options);
        if (options && typeOf(options.includeDirectories) !== "undefined") {
            this.getIncludeDirectories().setDirectories(options.includeDirectories);
        }
        if (options && typeOf(options.sassLocation) !== "undefined") {
            this.getSassLocation().setLocation(options.sassLocation);
        } else {
            this.getSassLocation().setLocation("/usr/local/bin/sass");
        }
        if (options && typeOf(options.compassLocation) !== "undefined") {
            this.getCompassLocation().setLocation(options.compassLocation);
        } else {
            this.getCompassLocation().setLocation("/usr/local/bin/compass");
        }
        if (options && typeOf(options.temporaryDirectory) !== "undefined") {
            this.getTemporaryDirectoryLocation().setLocation(options.temporaryDirectory);
        } else {
            this.getTemporaryDirectoryLocation().setLocation("/var/tmp");
        }
        if (options && typeOf(options.compilerType) !== "undefined" &&
            CompilerType.equal(CompilerType.NATIVE_SASS, options.compilerType)) {
            this.getCompilerType().setType(CompilerType.NATIVE_SASS);
        } else if (options && typeOf(options.compilerType) !== "undefined" &&
            CompilerType.equal(CompilerType.NODE_SASS, options.compilerType)) {
            this.getCompilerType().setType(CompilerType.NODE_SASS);
        } else if (options && typeOf(options.compilerType) !== "undefined" &&
            CompilerType.equal(CompilerType.COMPASS, options.compilerType)) {
            this.getCompilerType().setType(CompilerType.COMPASS);
        } else {
            this.getCompilerType().setType(CompilerType.NODE_SASS);
        }
    }

    protected getIncludeDirectories():IIncludeDirectoriesHelper {
        return this._includeDirectories;
    }

    protected getSassLocation():ISassLocationHelper {
        return this._sassLocation;
    }

    protected getCompassLocation():ICompassLocationHelper {
        return this._compassLocation;
    }

    protected getTemporaryDirectoryLocation():ITemporaryDirectoryLocationHelper {
        return this._temporaryDirectoryLocation;
    }

    protected getCompilerType():ISassCompilerTypeHelper<CompilerType> {
        return this._compilerType;
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
                if (this.getCache().isUsed()) {
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
                var directories:string[] = this.getIncludeDirectories().getDirectories().slice(0),
                    errors:Error[] = [],
                    actions:((next:() => void) => void)[] = [];
                directories.unshift(this.getSourcesDirectory().getLocation());
                directories.forEach((directory:string):void => {
                    actions.push((callback:() => void):void => {
                        resolve = path.join(directory, filename + ".sass");
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
                    actions.push((callback:() => void):void => {
                        resolve = path.join(directory, filename + ".scss");
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
                actions.push(():void => {
                    if (errors.length) {
                        callback(null, <IResponse>{
                            source: null,
                            result: this.getCssErrors().create(errors),
                            deps: [],
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
                    if ((!errors || !errors.length) && response && response.date >= mtime && response.deps.length === 0) {
                        callback(null, response);
                    } else if ((!errors || !errors.length) && response && response.date >= mtime && response.deps.length !== 0) {
                        directories = this.getIncludeDirectories().getDirectories().slice(0);
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
                                callback(null, response);
                            } else {
                                next();
                            }
                        });
                    } else if (errors && errors.length) {
                        callback(null, <IResponse>{
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
                        callback(null, <IResponse>{
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
                                callback(null, <IResponse>{
                                    source: null,
                                    result: this.getCssErrors().create(temp),
                                    deps: [],
                                    map: {},
                                    date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                                });
                            }
                        ]);
                    }
                });
            },

            ():void => {
                var compiler:any,
                    extension: string = path.extname(resolve),
                    includeDirectories = this.getIncludeDirectories().getDirectories().slice(0);
                includeDirectories.unshift(this.getSourcesDirectory().getLocation());

                sass.render({
                    file: path.join(this.getSourcesDirectory().getLocation(), filename + extension),
                    data: content,
                    includePaths: this.getIncludeDirectories().getDirectories(),
                    indentedSyntax: true,
                    omitSourceMapUrl: false,
                    // Used to determine whether to use space or tab character for indentation.
                    indentType: "space", // todo: space or tab
                    // Used to determine the number of spaces or tabs to be used for indentation.
                    indentWidth: 2,
                    // Used to determine whether to use cr, crlf, lf or lfcr sequence for line break.
                    linefeed: "lf",
                    // Determines the output format of the final CSS style.
                    // Values: nested, expanded, compact, compressed
                    outputStyle: "nested",
                    // Used to determine how many digits after the decimal will be allowed. For instance, if you had a decimal number of 1.23456789 and a precision of 5, the result will be 1.23457 in the final CSS
                    precision: 5,
                    // true enables additional debugging information in the output file as CSS comments
                    sourceComments: false,
                    sourceMap: "remove",
                    sourceMapContents: true
                }, (error:Error, result):void => {
                    var temp:Error[] = [],
                        value:IResponse,
                        deps:string[],
                        errors:Error[] = [];

                    // todo: удалить из контента ссылку на map

                    if (!error) {
                        deps = result.stats.includedFiles.map((item:string):string => {
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
                            result: result.css.toString("utf8").replace(/\/\*# sourceMappingURL=[^\r\n]+ \*\/\s*$/g, ""),
                            source: content,
                            deps: deps,
                            map: (((map:any):any => {
                                if (!map.sources) {
                                    return {};
                                }
                                map.sources = map.sources.map((item:string):string => {
                                    console.log("item", item);
                                    var index:number,
                                        length:number = includeDirectories.length,
                                        directory:string = path.dirname(filename),
                                        importDirectory:string,
                                        relative:string;
                                    item = path.join(process.cwd(), item);
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
                                    return path.join("/", this.getWebRootDirectory().getLocation(), relative);
                                });
                                return map;
                            })(JSON.parse(result.map.toString("utf8")) || {})),
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
                                        callback(null, <IResponse>{
                                            source: null,
                                            result: this.getCssErrors().create(temp),
                                            deps: [],
                                            map: {},
                                            date: parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                                        });
                                    } else {
                                        callback(null, value);
                                    }
                                },
                            ]);
                        } else {
                            callback(null, <IResponse>{
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
                                callback(null, <IResponse>{
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