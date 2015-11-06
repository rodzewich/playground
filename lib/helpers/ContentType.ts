import isString  = require("../isString");
import isDefined = require("../isDefined");
import Exception = require("../exception/Exception");

var types:{[index:string]:ContentType} = {};

class ContentType {

    private _extension:string = null;

    private _type:string = null;

    constructor(extension:string, type:string) {
        if (!isString(extension)) {
            throw new Exception({message: "extension should be a string"});
        }
        if (!/^[a-z][a-z0-9]*$/i.test(extension)) {
            throw new Exception({message: "extension is incorrect"});
        }
        if (isDefined(types[extension])) {
            throw new Exception({message: "content type already defined"});
        }
        if (!isString(type)) {
            throw new Exception({message: "type should be a string"});
        }
        types[extension] = this;
        this._extension = extension.toLowerCase();
        this._type = type;
    }

    public toString(charset?:string):string {
        return String(this._extension).replace(/\{charset\}/g, charset || "utf-8")
    }

    public static find(extension:string):ContentType {
        var temp:string = String(extension).toLowerCase();
        if (isDefined(types[temp])) {
            return types[temp];
        }
        return ContentType.BIN;
    }

    public static TEXT:ContentType = new ContentType("txt", "text/plain; charset={charset}");
    public static HTML:ContentType = new ContentType("html", "text/html; charset={charset}");
    public static HTM:ContentType = new ContentType("htm", "text/html; charset={charset}");
    public static BIN:ContentType = new ContentType("bin", "application/octet-stream");

}

export = ContentType;
