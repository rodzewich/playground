interface IVariables {
    getVariable(name:string):any;
    setVariable(name:string, value:any):void;
    getVariables():any;
    setVariables(value:any):void;
}

export = IVariables;
