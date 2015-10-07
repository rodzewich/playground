interface IException {
    name:string;
    code:number;
    type:string;
    message:string;
    stack:string;
    data:{[index:string]:any};
    toString():string;
    getName():string;
    getStack():string;
    getMessage():string;
    getCode():number;
    getType():string;
    getData():{[index:string]:any};
}

export = IException;
