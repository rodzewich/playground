interface ILessVariables {
    getVariable(name:string):any;
    setVariable(name:string, value:any):void;
    getVariables():any;
    setVariables(value:any):void;
}

export = ILessVariables;
