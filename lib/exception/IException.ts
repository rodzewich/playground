interface IException {
    name:string;
    code:number;
    message:string;
    stack:string;
    data:{[index:string]:any};
    toString():string;
    getName():string;
    getStack():string;
    getMessage():string;
    getCode():number;
    getData():{[index:string]:any};
}

export = IException;
