import IVariables = require("./IVariables");

class Variables implements IVariables {

    private _variables:{[key:string]:any} = {};

    public getVariable(name:string):any {
        return this._variables[name] || null;
    }

    public setVariable(name:string, value:any):void {
        // todo: check name
        // todo: check value
        this._variables[name] = value;
    }

    public getVariables():any {
        return this._variables;// todo: clone result
    }

    public setVariables(value:any):void {
        this._variables = value; // todo: check values
    }
}

export = Variables;
