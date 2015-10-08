interface IHandlersRegistrationHelper {
    register(callback:any):string;
    clear():void;
    find(id:string):any;
}

export = IHandlersRegistrationHelper;