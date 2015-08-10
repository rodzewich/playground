/// <reference path="./IOptions.ts" />
/// <reference path="./ITransport.ts" />
/// <reference path="../Transport.ts" />

import fs = require("fs");
import IOptions = require("./IOptions");
import ITransport = require("./ITransport");
import AbstractTransport = require("../Transport");

class Transport extends AbstractTransport implements ITransport {

    constructor(options:IOptions) {
        super(options);
    }

    load(filename:string, callback:(error?:Error) => void):void {
        fs.readFile();
    }

}

export = Transport;
