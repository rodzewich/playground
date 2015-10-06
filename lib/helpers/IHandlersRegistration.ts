interface IHandlersRegistration {
    register(callback:any):string;
    find(id:string):any;
}

export = IHandlersRegistration;