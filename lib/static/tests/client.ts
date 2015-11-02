
import deferred = require("../../deferred");
import Client = require("../client/Client");
import IClient = require("../client/IClient");
import Daemon = require("../daemon/Daemon");
import IDaemon = require("../daemon/IDaemon");
import IOptions = require("../daemon/IOptions");
import assert = require("assert");
import path = require("path");
import fs = require("fs");
import typeOf = require("../../typeOf");
import IMemory = require("../../memory/daemon/IDaemon");
import Memory = require("../../memory/daemon/Daemon");

var client:IClient = new Client();

function run(debug:boolean, callback:() => void):void {

    var memory:IMemory,
        daemon:IDaemon;

    function setup(callback:() => void):void {
        memory = new Memory({
            location: path.join(__dirname, "memory.sock")
        });
        daemon = new Daemon({
            location: path.join(__dirname, "static.sock"),
            memoryLocation: memory.getLocation()
        });
        deferred([
            // init memory daemon
            (next:() => void):void => {
                fs.unlink(memory.getLocation(), next);
            },
            (next:() => void):void => {
                memory.start((errors:IException[]):void => {
                    assert.strictEqual(errors, null);
                    next();
                });
            },
            (next:() => void):void => {
                fs.stat(memory.getLocation(), (error:NodeJS.ErrnoException, stats:net.Stats):void => {
                    assert.strictEqual(error, null);
                    assert.strictEqual(stats.isSocket(), true);
                    next();
                });
            },
            // init static daemon
            (next:() => void):void => {
                fs.unlink(daemon.getLocation(), next);
            },
            (next:() => void):void => {
                daemon.start((errors:IException[]):void => {
                    assert.strictEqual(errors, null);
                    next();
                });
            },
            (next:() => void):void => {
                fs.stat(daemon.getLocation(), (error:NodeJS.ErrnoException, stats:net.Stats):void => {
                    assert.strictEqual(error, null);
                    assert.strictEqual(stats.isSocket(), true);
                    next();
                });
            },
            // done
            ():void => {
                callback();
            }
        ]);
    }

    function shutdown(callback:() => void):void {

    }

    deferred([

        setup,

        (next:() => void):void => {

            function checkDaemonConstructor(target:IOptions, destination:IOptions) {
                var instance:IDaemon;
                assert.strictEqual("object", typeOf(target));
                assert.strictEqual("object", typeOf(destination));
                instance = new Daemon(target);
                assert.strictEqual(destination.debug, instance.isDebug());
                assert.strictEqual(destination.debug, instance.getIsDebug());
                assert.strictEqual(destination.debug, instance.debug);
                assert.strictEqual(destination.location, instance.getLocation());
                assert.strictEqual(destination.location, instance.location);
                assert.strictEqual(destination.memoryNamespace, instance.getMemoryNamespace());
                assert.strictEqual(destination.memoryNamespace, instance.memoryNamespace);
                assert.strictEqual(destination.metadataNamespace, instance.getMetadataNamespace());
                assert.strictEqual(destination.metadataNamespace, instance.metadataNamespace);
                assert.strictEqual(destination.binaryNamespace, instance.getBinaryNamespace());
                assert.strictEqual(destination.binaryNamespace, instance.binaryNamespace);
                assert.strictEqual(destination.gzipNamespace, instance.getGzipNamespace());
                assert.strictEqual(destination.gzipNamespace, instance.gzipNamespace);
                assert.strictEqual(destination.lockNamespace, instance.getLockNamespace());
                assert.strictEqual(destination.lockNamespace, instance.lockNamespace);
                assert.strictEqual("array", typeOf(destination.includeDirectories));
                assert.strictEqual("array", typeOf(instance.getIncludeDirectories()));
                assert.strictEqual("array", typeOf(instance.includeDirectories));
                assert.strictEqual(destination.includeDirectories.join(","), instance.getIncludeDirectories().join(","));
                assert.strictEqual(destination.includeDirectories.join(","), instance.includeDirectories.join(","));
                assert.strictEqual(destination.useIndex, instance.getIsUseIndex());
                assert.strictEqual(destination.useIndex, instance.isUseIndex());
                assert.strictEqual(destination.useIndex, instance.useIndex);
                assert.strictEqual("array", typeOf(destination.indexExtensions));
                assert.strictEqual("array", typeOf(instance.getIndexExtensions()));
                assert.strictEqual("array", typeOf(instance.indexExtensions));
                assert.strictEqual(destination.indexExtensions.length, instance.getIndexExtensions().length);
                assert.strictEqual(destination.indexExtensions.length, instance.indexExtensions.length);
                destination.indexExtensions.forEach((extension:string):void => {
                    assert.notStrictEqual(-1, instance.getIndexExtensions().indexOf(extension));
                    assert.notStrictEqual(-1, instance.indexExtensions.indexOf(extension));
                });
                assert.strictEqual(destination.useGzip, instance.getIsUseGzip());
                assert.strictEqual(destination.useGzip, instance.isUseGzip());
                assert.strictEqual(destination.useGzip, instance.useGzip);
                assert.strictEqual(destination.gzipMinLength, instance.getGzipMinLength());
                assert.strictEqual(destination.gzipMinLength, instance.gzipMinLength);
                assert.strictEqual("array", typeOf(destination.gzipExtensions));
                assert.strictEqual("array", typeOf(instance.getGzipExtensions()));
                assert.strictEqual("array", typeOf(instance.gzipExtensions));
                assert.strictEqual(destination.gzipExtensions.length, instance.getGzipExtensions().length);
                assert.strictEqual(destination.gzipExtensions.length, instance.gzipExtensions.length);
                destination.gzipExtensions.forEach((extension:string):void => {
                    assert.notStrictEqual(-1, instance.getGzipExtensions().indexOf(extension));
                    assert.notStrictEqual(-1, instance.gzipExtensions.indexOf(extension));
                });
                assert.strictEqual(destination.gzipCompressionLevel, instance.getGzipCompressionLevel());
                assert.strictEqual(destination.gzipCompressionLevel, instance.gzipCompressionLevel);
                assert.strictEqual(destination.memoryLocation, instance.getMemoryLocation());
                assert.strictEqual(destination.memoryLocation, instance.memoryLocation);
                assert.strictEqual(destination.metadataLocation, instance.getMetadataLocation());
                assert.strictEqual(destination.metadataLocation, instance.metadataLocation);
                assert.strictEqual(destination.binaryLocation, instance.getBinaryLocation());
                assert.strictEqual(destination.binaryLocation, instance.binaryLocation);
                assert.strictEqual(destination.gzipLocation, instance.getGzipLocation());
                assert.strictEqual(destination.gzipLocation, instance.gzipLocation);
                assert.strictEqual(destination.lockLocation, instance.getLockLocation());
                assert.strictEqual(destination.lockLocation, instance.lockLocation);
                assert.strictEqual(destination.memoryTimeout, instance.getMemoryTimeout());
                assert.strictEqual(destination.memoryTimeout, instance.memoryTimeout);
                assert.strictEqual(destination.metadataTimeout, instance.getMetadataTimeout());
                assert.strictEqual(destination.metadataTimeout, instance.metadataTimeout);
                assert.strictEqual(destination.binaryTimeout, instance.getBinaryTimeout());
                assert.strictEqual(destination.binaryTimeout, instance.binaryTimeout);
                assert.strictEqual(destination.gzipTimeout, instance.getGzipTimeout());
                assert.strictEqual(destination.gzipTimeout, instance.gzipTimeout);
                assert.strictEqual(destination.lockTimeout, instance.getLockTimeout());
                assert.strictEqual(destination.lockTimeout, instance.lockTimeout);
            }

            checkDaemonConstructor({
            }, {
                debug                : false,
                location             : null,
                memoryNamespace      : "static",
                metadataNamespace    : "static.metadata",
                binaryNamespace      : "static.binary",
                gzipNamespace        : "static.gzip",
                lockNamespace        : "static.lock",
                includeDirectories   : [],
                useIndex             : false,
                indexExtensions      : ["htm", "html"],
                useGzip              : false,
                gzipMinLength        : 20,
                gzipExtensions       : [],
                gzipCompressionLevel : 1,
                memoryLocation       : null,
                metadataLocation     : null,
                binaryLocation       : null,
                gzipLocation         : null,
                lockLocation         : null,
                memoryTimeout        : 300,
                metadataTimeout      : 300,
                binaryTimeout        : 300,
                gzipTimeout          : 300,
                lockTimeout          : 300
            });

            checkDaemonConstructor({
                debug                : true,
                location             : "/test/path.sock",
                memoryNamespace      : "other",
                includeDirectories   : ["/index/dir1", "/index/dir2"],
                useIndex             : true,
                indexExtensions      : ["xhtm", "xhtml"],
                useGzip              : true,
                gzipMinLength        : 40,
                gzipExtensions       : ["jpeg", "jpg", "png"],
                gzipCompressionLevel : 6,
                memoryLocation       : "/path/to/memory.sock",
                memoryTimeout        : 400,
            }, {
                debug                : true,
                location             : "/test/path.sock",
                memoryNamespace      : "other",
                metadataNamespace    : "other.metadata",
                binaryNamespace      : "other.binary",
                gzipNamespace        : "other.gzip",
                lockNamespace        : "other.lock",
                includeDirectories   : ["/index/dir1", "/index/dir2"],
                useIndex             : true,
                indexExtensions      : ["xhtm", "xhtml"],
                useGzip              : true,
                gzipMinLength        : 40,
                gzipExtensions       : ["jpeg", "jpg", "png"],
                gzipCompressionLevel : 6,
                memoryLocation       : "/path/to/memory.sock",
                metadataLocation     : "/path/to/memory.sock",
                binaryLocation       : "/path/to/memory.sock",
                gzipLocation         : "/path/to/memory.sock",
                lockLocation         : "/path/to/memory.sock",
                memoryTimeout        : 400,
                metadataTimeout      : 400,
                binaryTimeout        : 400,
                gzipTimeout          : 400,
                lockTimeout          : 400
            });

        },

        shutdown

    ]);

}

export = run;