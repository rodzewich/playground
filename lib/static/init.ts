/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />

import cp         = require("child_process");
import path       = require("path");
import log4js     = require("../../logger");
import Exception  = require("../exception/Exception");
import IException = require("../exception/IException");
import isFunction = require("../isFunction");
import isArray    = require("../isArray");
import display    = require("../helpers/display");
import IObject    = require("../exception/IObject");
import config     = require("../../config");

var logger:log4js.Logger = log4js.getLogger("client");

function init(callback:(errors?:IException[]) => void):void {
    var content:Buffer,
        command:cp.ChildProcess,
        params:string[] = [
        path.join(config.SERVER_BINARY, "static"),
        "--json",
        "--charset",          config.PROJECT_SERVER_CHARSET,
        "--sourcesDirectory", config.PROJECT_PUBLIC_DIRECTORY,
        "--memory",           config.PROJECT_MEMORY_SOCKET,
        "--metadataMemory",   config.PROJECT_MEMORY_SOCKET,
        "--binaryMemory",     config.PROJECT_MEMORY_SOCKET,
        "--gzipMemory",       config.PROJECT_MEMORY_SOCKET,
        "--lockMemory",       config.PROJECT_MEMORY_SOCKET,
        // todo: implement it
        /*"--namespace", "",
         "--metadataNamespace", "",
         "--binaryNamespace", "",
         "--gzipNamespace", "",
         "--lockNamespace", "",*/
        /*"--timeout", "",
         "--metadataTimeout", "",
         "--binaryTimeout", "",
         "--gzipTimeout", "",
         "--lockTimeout", "",*/
    ];

    // todo: add include directories

    if (config.PROJECT_STATIC_USE_INDEX) {
        params.push("--useIndex");
        if (config.PROJECT_STATIC_INDEX_EXTENSIONS) {
            config.PROJECT_STATIC_INDEX_EXTENSIONS.forEach((extension:string):void => {
                params.push("--indexExtensions", extension);
            });
        }
    }

    if (config.PROJECT_STATIC_USE_GZIP) {
        params.push("--useGzip");
        params.push("--gzipCompressionLevel", String(config.PROJECT_STATIC_GZIP_LEVEL));
        if (config.PROJECT_STATIC_GZIP_EXTENSIONS) {
            config.PROJECT_STATIC_GZIP_EXTENSIONS.forEach((extension:string):void => {
                params.push("--gzipExtensions", extension);
            });
        }
    }

    params.push(config.PROJECT_STATIC_SOCKET);

    command = cp.spawn(process.execPath, params, {cwd : config.PROJECT_DIRECTORY});
    content = new Buffer(0);

    function done(response:any):void {
        if (isFunction(callback) && isArray(response.errors)) {
            callback((<IObject[]>response.errors).map((error:IObject):IException => {
                return new Exception(error);
            }));
        } else if (isFunction(callback) && response.started) {
            callback(null);
        }
    }

    function parse(buffer:Buffer):any {
        try {
            return JSON.parse(buffer.toString("utf8"));
        } catch (error) {
            return null;
        }
    }

    function handler(data:Buffer):void {
        var index:number,
            response:any;
        content = Buffer.concat([content, data]);
        index = content.indexOf(0x0a);
        while (index !== -1) {
            response = parse(content.slice(0, index));
            content  = content.slice(index + 1);
            index    = content.indexOf(0x0a);
            if (response) {
                done(response);
            }
        }
    }

    command.stdout.addListener("data", handler);
    command.stderr.addListener("data", handler);

}

export = init;