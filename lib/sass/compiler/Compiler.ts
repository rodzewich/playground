/// <reference path="../../../types/node/node.d.ts" />
/// <reference path="./sass.d.ts" />

// todo: уметь использовать globals, functions, imports
// todo: уметь устанавливать переменные
// todo: уметь устанавливать дефолтные импорты
// todo: уметь устанавливать плагины
// todo: уметь управлять браузерами Autoprefixer'а
// todo: подключить плагины https://www.npmjs.com/search?q=node-sass

import CompilerBase  = require("../../css/compiler/Compiler");
import IOptions      = require("./IOptions");
import ICompiler     = require("./ICompiler");
import {isFunction, deferred, parallel} from "../../utils";
import IMemory       = require("../../memory/client/IClient");
import IResponse     = require("../client/IResponse");
import path          = require("path");
import fs            = require("fs");
import ExceptionBase = require("../../Exception");
import LessException = require("../Exception");
import sass          = require("node-sass");
import IIncludeDirectoriesHelper = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper  = require("../../helpers/IncludeDirectoriesHelper");

class Compiler extends CompilerBase implements ICompiler {

    constructor(options: IOptions) {
        super(options);
    }

    public isThrowErrors(): boolean {
        return false;
    }

    protected getIndentType(): string {
        // todo: space or tab
        return "space";
    }

    protected getIndentWidth(): number {
        return 2;
    }

    protected getLineFeed(): string {
        // todo
        // Used to determine whether to use cr, crlf, lf or lfcr sequence for line break. UNIX=LF, MACOS=LF, OLD_MACOS=CR, WINDOWS=RCLF
        return "lf";
    }

    protected getOutputStyle(): string {
        // Determines the output format of the final CSS style.
        // Values: nested, expanded, compact, compressed
        return "compressed";
    }

    protected getPrecision(): number {
        // Used to determine how many digits after the decimal will be allowed. For instance, if you had a decimal number of 1.23456789 and a precision of 5, the result will be 1.23457 in the final CSS
        return 5;
    }

    protected isSourceComments(): boolean {
        // true enables additional debugging information in the output file as CSS comments
        return false;
    }

    public compile(callback: (errors: Error[], result: IResponse) => void): void {
        var filename: string   = this.getFilename(),
            resolve: string,
            mtime: number,
            memory: IMemory    = this.getMemory(),
            unlock: (callback?: (errors: Error[]) => void) => void,
            resultTime: number = parseInt(Number(new Date()).toString(10).slice(0, -3), 10),
            content: string;

        function completion(errors: Error[], result: IResponse): void {
            if (isFunction(callback)) {
                callback(errors, result);
            }
        }

        deferred([

            (next: () => void): void => {
                if (this.isCacheUsed()) {
                    memory.getItem(filename, (errors: Error[], response: IResponse): void => {
                        var errorsArg: Error[]   = null,
                            resultArg: IResponse = null;
                        if (!errors || !errors.length) {
                            resultArg = response;
                        } else if (errors && errors.length &&
                            this.isThrowErrors()) {
                            errorsArg = errors;
                        } else if (errors && errors.length) {
                            resultArg = {
                                source : null,
                                result : this.createCssErrors(errors),
                                deps   : [],
                                map    : {},
                                date   : resultTime
                            };
                        }
                        completion(errorsArg, resultArg);
                    });
                } else {
                    next();
                }
            },

            (next: () => void): void => {
                var directories: string[] = this.getIncludeDirectories(),
                    errors: Error[]       = [],
                    actions: ((next: () => void) => void)[] = [];
                directories.unshift(this.getSourcesDirectory());
                directories.forEach((directory: string): void => {
                    actions.push((callback: () => void): void => {
                        resolve = path.join(directory, filename + ".sass");
                        fs.stat(resolve, (error: Error, stats: fs.Stats): void => {
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
                    actions.push((callback: () => void): void => {
                        resolve = path.join(directory, filename + ".scss");
                        fs.stat(resolve, (error: Error, stats: fs.Stats): void => {
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
                actions.push((): void => {
                    var errorsArg: Error[]   = null,
                        resultArg: IResponse = null;
                    if (errors.length && this.isThrowErrors()) {
                        errorsArg = errors;
                    } else if (errors.length) {
                        resultArg = {
                            source : null,
                            result : this.createCssErrors(errors),
                            deps   : [],
                            map    : {},
                            date   : resultTime
                        };
                    }
                    completion(errorsArg, resultArg);
                });
                deferred(actions);
            },

            (next: () => void): void => {
                var directories: string[];
                memory.getItem(filename, (errors: Error[], response: IResponse): void => {
                    if ((!errors || !errors.length) && response && response.date >= mtime && response.deps.length === 0) {
                        completion(null, response);
                    } else if ((!errors || !errors.length) && response && response.date >= mtime && response.deps.length !== 0) {
                        directories = this.getIncludeDirectories();
                        directories.unshift(this.getSourcesDirectory());
                        parallel(response.deps.map((filename: string): ((next: () => void) => void) => {
                            return (done: () => void): void => {
                                var actions: ((next: () => void) => void)[] = directories.map((directory: string): ((next: () => void) => void) => {
                                    var temp: string = path.join(directory, filename);
                                    return (next: () => void): void => {
                                        fs.stat(temp, function (error: Error, stats: fs.Stats) {
                                            if (!error && stats.isFile()) {
                                                mtime = Math.max(mtime, parseInt(Number(stats.mtime).toString(10).slice(0, -3), 10));
                                            }
                                            next();
                                        });
                                    };
                                });
                                actions.push((): void => {
                                    done();
                                });
                                deferred(actions);
                            };
                        }), (): void => {
                            if (response.date >= mtime) {
                                completion(null, response);
                            } else {
                                next();
                            }
                        });
                    } else if (errors && errors.length && this.isThrowErrors()) {
                        completion(errors, null);
                    } else if (errors && errors.length) {
                        completion(null, <IResponse>{
                            source : null,
                            result : this.createCssErrors(errors),
                            deps   : [],
                            map    : {},
                            date   : resultTime
                        });
                    } else {
                        next();
                    }
                });
            },

            (next: () => void): void => {
                memory.lock(filename, (errors: Error[], result: (callback?: (errors: Error[]) => void) => void): void => {
                    if (!errors || !errors.length) {
                        unlock = result;
                        next();
                    } else if (this.isThrowErrors()) {
                        completion(errors, null);
                    } else {
                        completion(null, <IResponse>{
                            source : null,
                            result : this.createCssErrors(errors),
                            deps   : [],
                            map    : {},
                            date   : resultTime
                        });
                    }
                });
            },

            (next: () => void): void => {
                var temp: Error[] = [];
                fs.readFile(resolve, (error: Error, buffer: Buffer): void => {
                    if (!error) {
                        content = buffer.toString("utf8");
                        next();
                    } else {
                        temp.push(error);
                        deferred([
                            (next: () => void): void => {
                                unlock((errors: Error[]): void => {
                                    if (errors && errors.length) {
                                        temp = temp.concat(errors);
                                    }
                                    next();
                                });
                            },
                            (): void => {
                                var errorsArg: Error[]   = null,
                                    resultArg: IResponse = null;
                                if (this.isThrowErrors()) {
                                    errorsArg = temp;
                                } else {
                                    resultArg = {
                                        source : null,
                                        result : this.createCssErrors(temp),
                                        deps   : [],
                                        map    : {},
                                        date   : resultTime
                                    };
                                }
                                completion(errorsArg, resultArg);
                            }
                        ]);
                    }
                });
            },

            (): void => {
                var extension: string  = path.extname(resolve),
                    includeDirectories = this.getIncludeDirectories();
                includeDirectories.unshift(this.getSourcesDirectory());

                sass.render(<sass.Options>{
                    file              : path.join(this.getSourcesDirectory(), filename + extension),
                    data              : content,
                    linefeed          : this.getLineFeed().toString(),
                    precision         : this.getPrecision(),
                    sourceMap         : "remove",
                    indentType        : this.getIndentType().toString(),
                    indentWidth       : this.getIndentWidth(),
                    outputStyle       : this.getOutputStyle().toString(),
                    includePaths      : this.getIncludeDirectories(),
                    indentedSyntax    : true,
                    sourceComments    : this.isSourceComments(),
                    omitSourceMapUrl  : false,
                    sourceMapContents : true
                }, (error: sass.SassError, result: sass.Result): void => {
                    var temp:Error[] = [],
                        value:IResponse,
                        deps:string[],
                        errors:Error[] = [],
                        css:string;

                    if (!error) {

                        css = result.css.toString("utf8").
                            replace(/\/\*# sourceMappingURL=[^\r\n]+ \*\/\s*$/g, "");

                        deps = result.stats.includedFiles.map((item: string): string => {
                            var index: number,
                                length: number    = includeDirectories.length,
                                directory: string = path.dirname(filename),
                                importDirectory: string,
                                relative: string;
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

                        value = <IResponse>{
                            result : css,
                            source : content,
                            deps   : deps,
                            map    : (((map: any): any => {
                                if (!map.sources) {
                                    return {};
                                }
                                map.sources = map.sources.map((item: string): string => {
                                    var index: number,
                                        length: number    = includeDirectories.length,
                                        directory: string = path.dirname(filename),
                                        importDirectory: string,
                                        relative: string;
                                    item                  = path.join(process.cwd(), item);
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
                                return {
                                    version  : map.version,
                                    sources  : map.sources,
                                    mappings : map.mappings,
                                    names    : map.names
                                };
                            })(JSON.parse(result.map.toString("utf8")) || {})),
                            date   : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                        };

                        if (!errors || !errors.length) {
                            deferred([
                                (next: () => void): void => {
                                    memory.setItem(filename, value, (errors: Error[]): void => {
                                        if (errors && errors.length) {
                                            temp = temp.concat(errors);
                                        }
                                        next();
                                    });
                                },
                                (next: () => void): void => {
                                    unlock((errors: Error[]): void => {
                                        if (errors && errors.length) {
                                            temp = temp.concat(errors);
                                        }
                                        next();
                                    });
                                },
                                (): void => {
                                    if (temp.length) {
                                        callback(null, <IResponse>{
                                            source : null,
                                            result : this.createCssErrors(temp),
                                            deps   : [],
                                            map    : {},
                                            date   : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                                        });
                                    } else {
                                        callback(null, value);
                                    }
                                },
                            ]);
                        } else {
                            callback(null, <IResponse>{
                                source : null,
                                result : this.createCssErrors(errors),
                                deps   : [],
                                map    : {},
                                date   : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
                            });
                        }

                    } else {
                        temp.push(new LessException(error));
                        deferred([
                            (next: () => void): void => {
                                unlock((errors: Error[]): void => {
                                    if (errors && errors.length) {
                                        temp = temp.concat(errors);
                                    }
                                    next();
                                });
                            },
                            (): void => {
                                callback(null, <IResponse>{
                                    source : null,
                                    result : this.createCssErrors(temp),
                                    deps   : [],
                                    map    : {},
                                    date   : parseInt(Number(new Date()).toString(10).slice(0, -3), 10)
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