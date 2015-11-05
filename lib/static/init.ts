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

var logger:log4js.Logger = log4js.getLogger("client");

interface IOptions {
    location:string;
    binary:string;
    debug:boolean;
    cwd:string;
}

function init(options:IOptions, callback:(errors?:IException[]) => void):void {
    var location:string = options.location,
        filename:string = path.join(options.binary, "static"),
        command:cp.ChildProcess = cp.spawn(process.execPath, [filename, "--json", location], {cwd : options.cwd}),
        debug:boolean = !!options.debug,
        content:Buffer = new Buffer(0);

    if (debug) {
        display.input("cp.spawn(" + [process.execPath,
                JSON.stringify([filename, options.location]),
                JSON.stringify({cwd : options.cwd})].join(", ") + ");");
    }

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
        if (debug) {
            display.output(data.toString("utf8"));
        }
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