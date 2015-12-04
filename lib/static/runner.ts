/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />

var messageSent = false;
process.title = "Static daemon";
process.addListener('uncaughtException', function (error:Error) {
    if (!messageSent) {
        if (argv && argv.json) {
            process.stderr.write(JSON.stringify({
                    started : false,
                    errors  : [Exception.convertFromError(error).toObject()]
                }) + "\n");
        } else {
            displayException(Exception.convertFromError(error));
        }
        messageSent = true;
    }
    if (logger) {
        logger.fatal(Exception.convertFromError(error).toString());
    }
});

import {isNull, isDefined, isString, isNumber, isArray, isBoolean} from "../utils/common";
import {displayException, installMapping} from "../utils";
import {IObject, IException, Exception} from "./exception";
import {IOptions, Daemon} from "./daemon";
import log4js     = require("../../logger");
import * as optimist from "optimist";
import * as path from "path";
import * as colors from "colors";
import config     = require("../../config");

installMapping();

var cache:any = {},
    logger:log4js.Logger = log4js.getLogger("memory"),
    argv:any = optimist
        .usage("Usage: static [options] [location]")

        .alias("m", "memory")
        .describe("m", "Memory socket location")
        .describe("metadataMemory", "Memory socket location for metadata")
        .describe("binaryMemory", "Memory socket location for binary data")
        .describe("gzipMemory", "Memory socket location for gzip data")
        .describe("lockMemory", "Memory socket location for locks\n")

        .alias("n", "namespace")
        .describe("n", "Memory namespace")
        .describe("metadataNamespace", "Namespace for metadata cache")
        .describe("binaryNamespace", "Namespace for binary data")
        .describe("gzipNamespace", "Namespace for gzip data")
        .describe("lockNamespace", "Namespace for locks\n")

        .alias("t", "timeout")
        .describe("t", "Memory timeout")
        .describe("metadataTimeout", "Timeout for metadata cache")
        .describe("binaryTimeout", "Timeout for binary data")
        .describe("gzipTimeout", "Timeout for gzip data")
        .describe("lockTimeout", "Timeout for locks\n")

        .alias("c", "charset")
        .describe("c", "Content charset")
        .alias("s", "sourcesDirectory")
        .describe("s", "Source directory")
        .alias("i", "includeDirectories")
        .describe("i", "Include directories\n")

        .boolean("useIndex")
        .describe("useIndex", "index")
        .describe("indexExtensions", "extensions\n")

        .boolean("useGzip").describe("useGzip", "index")
        .describe("gzipExtensions", "sdf")
        .describe("gzipCompressionLevel", "sdf\n")

        .boolean("j").alias("j", "json")
        .describe("j", "Response as json")
        .boolean("d").alias("d", "debug")
        .describe("d", "Debug mod")
        .boolean("h").alias("h", "help")
        .describe("h", "Show this help")

        .argv;

if (isArray(argv._) && (<Array<any>>argv._).length === 0 || argv.help) {
    optimist.showHelp();
    process.exit(0);
}

new Daemon(getOptions()).start((errors:IException[]):void => {
    var index:number,
        length:number;
    if (errors && errors.length) {
        if (!messageSent) {
            if (argv && !!argv.json) {
                process.stderr.write(JSON.stringify({
                        started : false,
                        errors  : errors.map((error:IException):IObject => {
                            return error.toObject();
                        })
                    }) + "\n");
            } else {
                errors.forEach((error:IException):void => {
                    displayException(error);
                });
            }
            messageSent = true;
        }
        length = errors.length;
        for (index = 0; index < length; index++) {
            logger.fatal(errors[index].getStack());
        }
    } else {
        if (!messageSent) {
            if (argv && !!argv.json) {
                process.stderr.write(JSON.stringify({
                        started : true
                    }) + "\n");
                messageSent = true;
            } else {
                showParameters();
            }
        }
        logger.info("Daemon started");
    }
});

function showParameters():void {
    console.log(colors.green("Daemon started with parameters:"));
    var property:string;
    var options:IOptions = getOptions();
    var value:string;
    for (property in options) {
        if (!options.hasOwnProperty(property)) {
            continue;
        }
        if (isNull(options[property])) {
            value = colors.cyan(JSON.stringify(options[property]));
        } else if (isString(options[property])) {
            value = colors.green(JSON.stringify(options[property]));
        } else if (isNumber(options[property])) {
            value = colors.blue(JSON.stringify(options[property]));
        } else if (isBoolean(options[property])) {
            value = colors.magenta(JSON.stringify(options[property]));
        } else {
            value = JSON.stringify(options[property]);
        }
        console.log(property + new Array(22 - property.length).join(" ") + ":", value);
    }
}

function getOptions():IOptions {
    return {
        charset              : getCharset(),
        location             : getLocation(),
        memoryLocation       : getMemory(),
        metadataLocation     : getMetadataMemory(),
        binaryLocation       : getBinaryMemory(),
        gzipLocation         : getGzipMemory(),
        lockLocation         : getLockMemory(),
        memoryNamespace      : getNamespace(),
        metadataNamespace    : getMetadataNamespace(),
        binaryNamespace      : getBinaryNamespace(),
        gzipNamespace        : getGzipNamespace(),
        lockNamespace        : getLockNamespace(),
        memoryTimeout        : getTimeout(),
        metadataTimeout      : getMetadataTimeout(),
        binaryTimeout        : getBinaryTimeout(),
        gzipTimeout          : getGzipTimeout(),
        lockTimeout          : getLockTimeout(),
        sourcesDirectory     : getSourcesDirectory(),
        includeDirectories   : getIncludeDirectories(),
        useIndex             : isUseIndex(),
        indexExtensions      : getIndexExtensions(),
        useGzip              : isUseGzip(),
        gzipExtensions       : getGzipExtensions(),
        gzipCompressionLevel : getGzipCompressionLevel(),
        debug                : isDebug()
    };
}

function getCharset():string {
    if (argv && isString(argv.charset)) {
        return String(argv.charset);
    }
    return config.PROJECT_SERVER_CHARSET;
}

function getLocation():string {
    if (argv && argv._ && isString(argv._[0]) && !path.isAbsolute(argv._[0])) {
        return path.normalize(path.join(process.cwd(), argv._[0]));
    } else if (argv && argv._ && isString(argv._[0])) {
        path.normalize(argv._[0]);
    }
    return config.PROJECT_STATIC_SOCKET;
}

function isDebug():boolean {
    return config.DEBUG && argv && argv.debug;
}

function getMemory():string {
    if (argv && isString(argv.memory) && !path.isAbsolute(argv.memory)) {
        return path.normalize(path.join(process.cwd(), argv.memory));
    } else if (argv && isString(argv.memory)) {
        return path.normalize(argv.memory);
    }
    return config.PROJECT_MEMORY_SOCKET;
}

function getMetadataMemory():string {
    if (argv && isString(argv.metadataMemory) && !path.isAbsolute(argv.metadataMemory)) {
        return path.normalize(path.join(process.cwd(), argv.metadataMemory));
    } else if (argv && isString(argv.metadataMemory)) {
        return path.normalize(argv.metadataMemory);
    }
    return config.PROJECT_MEMORY_SOCKET;
}

function getBinaryMemory():string {
    if (argv && isString(argv.binaryMemory) && !path.isAbsolute(argv.binaryMemory)) {
        return path.normalize(path.join(process.cwd(), argv.binaryMemory));
    } else if (argv && isString(argv.binaryMemory)) {
        return path.normalize(argv.binaryMemory);
    }
    return config.PROJECT_MEMORY_SOCKET;
}

function getGzipMemory():string {
    if (argv && isString(argv.gzipMemory) && !path.isAbsolute(argv.gzipMemory)) {
        return path.normalize(path.join(process.cwd(), argv.gzipMemory));
    } else if (argv && isString(argv.gzipMemory)) {
        return path.normalize(argv.gzipMemory);
    }
    return config.PROJECT_MEMORY_SOCKET;
}

function getLockMemory():string {
    if (argv && isString(argv.lockMemory) && !path.isAbsolute(argv.lockMemory)) {
        return path.normalize(path.join(process.cwd(), argv.lockMemory));
    } else if (argv && isString(argv.lockMemory)) {
        return path.normalize(argv.lockMemory);
    }
    return config.PROJECT_MEMORY_SOCKET;
}







function getNamespace():string {
    return "static";
}

function getMetadataNamespace():string {
    return "static.namespace";
}

function getBinaryNamespace():string {
    return "static.binary";
}

function getGzipNamespace():string {
    return "static.gzip";
}

function getLockNamespace():string {
    return "static.lock";
}

function getTimeout():number {
    return 300;
}

function getMetadataTimeout():number {
    return 300;
}

function getBinaryTimeout():number {
    return 300;
}

function getGzipTimeout():number {
    return 300;
}

function getLockTimeout():number {
    return 300;
}






function getSourcesDirectory():string {
    return config.PROJECT_PUBLIC_DIRECTORY;
}






function getIncludeDirectories():string[] {
    return null;
}

function isUseIndex():boolean {
    if (argv && isDefined(argv.useIndex)) {
        return !!argv.useIndex;
    }
    return config.PROJECT_STATIC_USE_INDEX;
}

function getIndexExtensions():string[] {
    if (argv && isArray(argv.indexExtensions)) {
        return argv.indexExtensions;
    }
    return config.PROJECT_STATIC_INDEX_EXTENSIONS;
}

function isUseGzip():boolean {
    if (argv && isDefined(argv.useGzip)) {
        return !!argv.useGzip;
    }
    return config.PROJECT_STATIC_USE_GZIP;
}

function getGzipExtensions():string[] {
    if (argv && isArray(argv.gzipExtensions)) {
        return argv.gzipExtensions;
    }
    return config.PROJECT_STATIC_GZIP_EXTENSIONS;
}

function getGzipCompressionLevel():number {
    if (argv && isString(argv.gzipCompressionLevel) &&
        !isNaN(argv.gzipCompressionLevel)) {
        return parseInt(argv.gzipCompressionLevel, 10);
    }
    return config.PROJECT_STATIC_GZIP_LEVEL;
}
