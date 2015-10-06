interface IException {
    name:string;
    code:number;
    message:string;
    stack:string;
    toString():string;
    getName():string;
    getStack():string;
    getMessage():string;
    getCode():number;
}

export = IException;
