/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/colors/colors.d.ts" />

import {template} from "../utils/common"
import * as colors from "colors";

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

    public static ERROR:Type = new Type("ERROR", colors.red("!!"));

}

function display(debug:boolean, message:string, type:Type, args:any[]):void {
    var columns:number;
    if (debug) {
        columns = process.stdout.columns || 80;
        args.unshift(message);
        String(template.apply(null, args)).split("\n").forEach(function (line:string) {
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
}

export function input(debug:boolean, message:string, ...args:any[]) {
    display(debug, message, Type.INPUT, args);
}

export function output(debug:boolean, message:string, ...args:any[]):void {
    display(debug, message, Type.OUTPUT, args);
}

export function error(debug:boolean, message:string, ...args:any[]):void {
    display(debug, message, Type.ERROR, args);
}
