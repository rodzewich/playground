import IObject = require("./IObject");

interface IException {
    name:string;
    code:number;
    message:string;
    stack:string;
    toObject():IObject;
    toString():string;
    getName():string;
    getStack():string;
    getMessage():string;
    getCode():number;
}

export = IException;
