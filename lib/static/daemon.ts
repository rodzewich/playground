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

    // memory locations
    .alias("m", "memory")
    .default("m", path.relative(config.PROJECT_DIRECTORY, config.DEFAULT_MEMORY_SOCKET_LOCATION))
    .describe("m", "Memory socket location")
    .default("metadataMemory", path.relative(config.PROJECT_DIRECTORY, config.DEFAULT_STATIC_MEMORY_METADATA_LOCATION))
    .describe("metadataMemory", "Memory socket location for metadata")
    .default("binaryMemory", path.relative(config.PROJECT_DIRECTORY, config.DEFAULT_STATIC_MEMORY_BINARY_LOCATION))
    .describe("binaryMemory", "Memory socket location for binary data")
    .default("gzipMemory", path.relative(config.PROJECT_DIRECTORY, config.DEFAULT_STATIC_MEMORY_GZIP_LOCATION))
    .describe("gzipMemory", "Memory socket location for gzip data")
    .default("lockMemory", path.relative(config.PROJECT_DIRECTORY, config.DEFAULT_STATIC_MEMORY_LOCK_LOCATION))
    .describe("lockMemory", "Memory socket location for locks")

    // source directory
    .alias("s", "sourceDirectory")
    .default("s", path.relative(config.PROJECT_DIRECTORY, config.DEFAULT_PUBLIC_DIRECTORY))
    .describe("s", "Source directory")

    // include directories
    .alias("i", "includeDirectories")
    .describe("i", "Include directories")

    .alias("n", "namespace")
    .default("n", config.DEFAULT_STATIC_MEMORY_NAMESPACE.getValue())
    .describe("n", "Memory namespace")
    .default("metadataNamespace", config.DEFAULT_STATIC_METADATA_MEMORY_NAMESPACE.getValue())
    .describe("metadataNamespace", "Namespace for metadata cache")
    .default("binaryNamespace", config.DEFAULT_STATIC_BINARY_MEMORY_NAMESPACE.getValue())
    .describe("binaryNamespace", "Namespace for binary data")
    .default("gzipNamespace", config.DEFAULT_STATIC_GZIP_MEMORY_NAMESPACE.getValue())
    .describe("gzipNamespace", "Namespace for gzip data")
    .default("lockNamespace", config.DEFAULT_STATIC_LOCK_MEMORY_NAMESPACE.getValue())
    .describe("lockNamespace", "Namespace for locks")
    .boolean("d").alias("d", "debug").describe("d", "Debug mod")
    .boolean("h").alias("h", "help").describe("h", "Show help")
    .argv;

if (isArray(argv._) && (<Array>argv._).length !== 0 || argv.help) {
    optimist.showHelp();
    process.exit(0);
}
