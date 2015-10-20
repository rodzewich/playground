class Separator {

    private _name:string;

    private _value:string;

    constructor(name:string, value:string) {
        this._name = name;
        this._value = value;
    }

    public getName():string {
        return this._name;
    }

    public getValue():string {
        return this._value;
    }

    public toString():string {
        return this.getValue();
    }

    public static DOT:Separator = new Separator("DOT", ".");

    public static COLON:Separator = new Separator("COLON", "::");

    public static ARROW:Separator = new Separator("ARROW", "->");

}

export = Separator;
