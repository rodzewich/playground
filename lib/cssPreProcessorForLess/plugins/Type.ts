class Type {

    private _type:string;

    constructor(type:string) {
        this._type = type;
    }

    public getType():string {
        return this._type;
    }

    public static FUNCTIONS:Type = new Type("functions");

    public static IMPORTERS:Type = new Type("importers");

    public static POSTPROCESSORS:Type = new Type("postprocessors");

}

export = Type;
