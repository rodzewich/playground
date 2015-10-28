/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />

var messageSent = false;
process.title = "Static daemon";
process.addListener('uncaughtException', function (error:Error) {
    if (!messageSent) {
        if (argv.json) {
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
        logger.fatal(error);
    }
});

import displayException = require("../displayException");
import isDefined  = require("../isDefined");
import Exception  = require("../exception/Exception");
import IException = require("../exception/IException");
import IDaemon    = require("./daemon/IDaemon");
import Daemon     = require("./daemon/Daemon");
import log4js     = require("../../logger");
import optimist   = require("optimist");
import path       = require("path");
import isArray    = require("../isArray");
import config     = require("../../config");
require("../mapping");

var cache:any = {},
    daemon:IDaemon,
    logger:log4js.Logger = log4js.getLogger("memory"),
    argv:any = optimist
        .usage("Usage: static [options] [location]")

        .alias("m", "memory").describe("m", "Memory socket location")
        .describe("metadataMemory", "Memory socket location for metadata")
        .describe("binaryMemory", "Memory socket location for binary data")
        .describe("gzipMemory", "Memory socket location for gzip data")
        .describe("lockMemory", "Memory socket location for locks\n")

        .alias("n", "namespace").describe("n", "Memory namespace")
        .describe("metadataNamespace", "Namespace for metadata cache")
        .describe("binaryNamespace", "Namespace for binary data")
        .describe("gzipNamespace", "Namespace for gzip data")
        .describe("lockNamespace", "Namespace for locks\n")

        .alias("t", "timeout").describe("t", "Memory timeout")
        .describe("metadataTimeout", "Timeout for metadata cache")
        .describe("binaryTimeout", "Timeout for binary data")
        .describe("gzipTimeout", "Timeout for gzip data")
        .describe("lockTimeout", "Timeout for locks\n")

        .alias("s", "sourceDirectory").describe("s", "Source directory")
        .alias("i", "includeDirectories").describe("i", "Include directories\n")

        .boolean("useIndex").describe("useIndex", "index")
        .describe("indexExtensions", "extensions\n")

        .boolean("useGzip").describe("useGzip", "index")
        .describe("gzipExtensions", "sdf")
        .describe("gzipCompressionLevel", "sdf\n")

        .boolean("j").alias("j", "json").describe("j", "Response as json")
        .boolean("d").alias("d", "debug").describe("d", "Debug mod")
        .boolean("h").alias("h", "help").describe("h", "Show this help")

        .argv;

if (isArray(argv._) && (<Array>argv._).length === 0 || argv.help) {
    optimist.showHelp();
    process.exit(0);
}

daemon = new Daemon({
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
    sourceDirectory      : getSourceDirectory(),
    includeDirectories   : getIncludeDirectories(),
    useIndex             : isUseIndex(),
    indexExtensions      : getIndexExtensions(),
    useGzip              : isUseGzip(),
    gzipExtensions       : getGzipExtensions(),
    gzipCompressionLevel : getGzipCompressionLevel(),
    debug                : isDebug()
});

daemon.start((errors:IException[]):void => {
    var index:number,
        length:number;
    if (errors && errors.length) {
        if (!messageSent) {
            if (!!argv.json) {
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
            if (!!argv.json) {
                process.stderr.write(JSON.stringify({
                        started : true
                    }) + "\n");
                messageSent = true;
            } else {
                console.log("Static daemon started");
            }
        }
        logger.info("Static daemon started");
    }
});

function getLocation():string {
    var location:string = argv._.shift();
    if (!path.isAbsolute(location)) {
        location = path.join(process.cwd(), location);
    }
    return path.resolve(location);
}

function isDebug():boolean {
    return config.DEBUG && !!argv.debug;
}

function getMemory():string {
    if (!isDefined(cache.memory)) {
        cache.memory = config.getMemorySocket();
        if (argv.memory) {
            cache.memory = String(argv.memory);
        }
        if (!path.isAbsolute(cache.memory)) {
            cache.memory = path.join(process.cwd(), cache.memory);
        }
        cache.memory = path.resolve(cache.memory);
    }
    return <string>cache.memory;
}

function getMetadataMemory():string {
    if (!isDefined(cache.metadataMemory)) {
        cache.metadataMemory = getMemory();
        if (argv.metadataMemory) {
            cache.metadataMemory = String(argv.metadataMemory);
        }
        if (!path.isAbsolute(cache.metadataMemory)) {
            cache.metadataMemory = path.join(process.cwd(), cache.metadataMemory);
        }
        cache.metadataMemory = path.resolve(cache.metadataMemory);
    }
    return <string>cache.metadataMemory;
}

function getBinaryMemory():string {
    if (!isDefined(cache.binaryMemory)) {
        cache.binaryMemory = getMemory();
        if (argv.binaryMemory) {
            cache.binaryMemory = String(argv.binaryMemory);
        }
        if (!path.isAbsolute(cache.binaryMemory)) {
            cache.binaryMemory = path.join(process.cwd(), cache.binaryMemory);
        }
        cache.binaryMemory = path.resolve(cache.binaryMemory);
    }
    return <string>cache.metadataMemory;
}

function getGzipMemory():string {
    if (!isDefined(cache.gzipMemory)) {
        cache.gzipMemory = getMemory();
        if (argv.gzipMemory) {
            cache.gzipMemory = String(argv.gzipMemory);
        }
        if (!path.isAbsolute(cache.gzipMemory)) {
            cache.gzipMemory = path.join(process.cwd(), cache.gzipMemory);
        }
        cache.gzipMemory = path.resolve(cache.gzipMemory);
    }
    return <string>cache.gzipMemory;
}

function getLockMemory():string {
    if (!isDefined(cache.lockMemory)) {
        cache.lockMemory = getMemory();
        if (argv.lockMemory) {
            cache.lockMemory = String(argv.lockMemory);
        }
        if (!path.isAbsolute(cache.lockMemory)) {
            cache.lockMemory = path.join(process.cwd(), cache.lockMemory);
        }
        cache.lockMemory = path.resolve(cache.lockMemory);
    }
    return <string>cache.lockMemory;
}

function getNamespace():string {
    return null;
}

function getMetadataNamespace():string {
    return null;
}

function getBinaryNamespace():string {
    return null;
}

function getGzipNamespace():string {
    return null;
}

function getLockNamespace():string {
    return null;
}

function getTimeout():number {
    return null;
}

function getMetadataTimeout():number {
    return null;
}

function getBinaryTimeout():number {
    return null;
}

function getGzipTimeout():number {
    return null;
}

function getLockTimeout():number {
    return null;
}

function getSourceDirectory():string {
    return null;
}

function getIncludeDirectories():string[] {
    return null;
}

function isUseIndex():boolean {
    return null;
}

function getIndexExtensions():string[] {
    return null;
}

function isUseGzip():boolean {
    return null;
}

function getGzipExtensions():string[] {
    return null;
}

function getGzipCompressionLevel():number {
    return null;
}
