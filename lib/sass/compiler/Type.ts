class Type {

    private _key:string;

    private _type:string;

    constructor(key:string, type:string) {
        this._key = String(key || "");
        this._type = String(type || "");
    }

    public getKey():string {
        return this._key;
    }

    public getType():string {
        return this._type;
    }

    public toString():string {
        return this.getType();
    }

    public static equal(obj1:any, obj2:any):boolean {
        return String(obj1 || "").toLowerCase() === String(obj2 || "").toLowerCase();
    }

    public static NATIVE_SASS:Type = new Type("NATIVE_SASS", "nativeSass");

    public static NODE_SASS:Type = new Type("NODE_SASS", "nodeSass");

    public static COMPASS:Type = new Type("COMPASS", "compass");

}

export = Type;