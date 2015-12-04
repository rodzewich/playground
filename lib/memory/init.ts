/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />

import cp     = require("child_process");
import path   = require("path");
import log4js = require("log4js");
import {IObject, IException, Exception} from "../exception";
import {isFunction, isArray} from "../utils/common";
import {input as displayInput, output as displayOutput} from "../helpers/display";

var logger:log4js.Logger = log4js.getLogger("client");

export interface IOptions {
    binaryDirectory:string;
    socketLocation:string;
    projectDirectory:string;
    debug:boolean;
}

export function init(options:IOptions, callback:(errors?:IException[]) => void):void {
    var filename:string = path.join(options.binaryDirectory, "memory"),
        command:cp.ChildProcess = cp.spawn(process.execPath, [filename, "--json", options.socketLocation], {cwd : options.projectDirectory}),
        content:Buffer = new Buffer(0);

    displayInput(options.debug, "Command: {0} {1}", process.execPath, [filename, "--json", options.socketLocation].map((option:string):string => {
        return JSON.stringify(option);
    }).join(" "));

    function done(response:any):void {
        if (isFunction(callback) && isArray(response.errors)) {
            callback((<IObject[]>response.errors).map((error:IObject):IException => {
                return new Exception(error);
            }));
        } else if (isFunction(callback) && response.started) {
            displayOutput(options.debug, "done");
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
