import colors = require("colors");

class Type {

    private _type:string;

    private _prefix:string;

    constructor(type:string, prefix:string) {
        this._type = type;
        this._prefix = prefix;
    }

    public getType():string {
        return this._type;
    }

    public getPrefix():string {
        return this._prefix;
    }

    public toString():string {
        return this.getType();
    }

    public static INPUT:Type = new Type("INPUT", colors.green(">>"));
    public static OUTPUT:Type = new Type("OUTPUT", colors.blue("<<"));
    public static ERROR:Type = new Type("ERROR", colors.red("EE"));

}

function display(content:string, type:Type):void {
    var columns = process.stdout.columns || 80;
    String(content).split("\n").forEach(function (line:string) {
        var temp:string;
        do {
            temp = line.slice(0, columns - 3);
            line = line.slice(columns - 3);
            if (temp) {
                console.log(type.getPrefix() + " " + temp);
            }
        } while (line);
    });
}

export function input(content:string):void {
    return display(content, Type.INPUT);
}

export function output(content:string):void {
    return display(content, Type.OUTPUT);
}

export function error(content:string):void {
    return display(content, Type.ERROR);
}
