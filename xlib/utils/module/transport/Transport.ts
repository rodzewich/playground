/// <reference path="./ITransport.ts" />
/// <reference path="./IOptions.ts" />

import ITransport = require("./ITransport");
import IOptions = require("./IOptions");

class Transport implements ITransport {

    constructor(options:IOptions) {
    }

    load(filename:string, callback:(error?:Error) => void):void {
    }

}

export = Transport;
