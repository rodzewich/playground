interface IOptions {
    message:string;
    stack?:string;
    data?:{[index:string]:any};
    name?:string;
    code?:number;
    type?:string;
}

export = IOptions;
