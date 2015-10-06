interface IException {
    stack:string;
    toString():string;
    getName():string;
    getStack():string;
    getMessage():string;
    getCode():number;
}

export = IException;
