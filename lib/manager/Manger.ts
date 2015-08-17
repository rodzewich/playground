/// <reference path="./IManager.ts" />

import IManager = require("./IManager");

class Manger implements IManager {
    compile(filename:string, callback:(error?:Error, result:any) => void):void {
    }
}

export = Manger;
