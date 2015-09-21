import Type = require("Type");

class Name {

    private _name:string;

    private _type:Type;

    constructor(name:string, type:Type) {
        this._name = name;
        this._type = type;
    }

    public getName():string {
        return this._name;
    }

    public getType():Type {
        return this._type;
    }

    public static ADVANCED_COLOR_FUNCTIONS:Name = new Name("advanced-color-functions", Type.FUNCTIONS);

}

export = Name;
