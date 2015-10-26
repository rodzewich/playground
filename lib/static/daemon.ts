/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/optimist/optimist.d.ts" />

var messageSent = false;
process.title = "Static daemon";
process.addListener('uncaughtException', function (error:Error) {
    if (!messageSent) {
        process.stderr.write(JSON.stringify({
                started : false,
                errors  : [Exception.convertFromError(error).toObject()]
            }) + "\n");
        messageSent = true;
    }
    if (logger) {
        logger.fatal(error);
    }
});

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
var logger:log4js.Logger = log4js.getLogger("memory");
var argv:any = optimist
    .usage("Usage: static [options] [location]")

    // source directory
    .alias("s", "sourceDirectory")
    .default("s", config.DEFAULT_PUBLIC_DIRECTORY)
    .describe("s", "Source directory")

    // memory locations
    .alias("m", "memoryLocation")
    .default("m", config.DEFAULT_MEMORY_SOCKET_LOCATION)
    .describe("m", "Memory socket location")
    .describe("metadataMemoryLocation", "Memory socket location for metadata")
    .describe("binaryMemoryLocation", "Memory socket location for binary data")
    .describe("gzipMemoryLocation", "Memory socket location for gzip data")
    .describe("lockMemoryLocation", "Memory socket location for locks")

    // include directories
    .alias("i", "includeDirectories")
    .describe("i", "Include directories")

    .describe("metadataNamespace", "Namespace for metadata cache")
    .describe("binaryNamespace", "Namespace for binary data")
    .describe("gzipNamespace", "Namespace for gzip data")
    .describe("lockNamespace", "Namespace for locks")
    .boolean("d").alias("d", "debug").describe("d", "Debug mod")
    .boolean("h").alias("h", "help").describe("h", "Show help")
    .argv;

if (isArray(argv._) && (<Array>argv._).length !== 0 || argv.help) {
    optimist.showHelp();
    process.exit(0);
}