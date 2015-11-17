/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/colors/colors.d.ts" />

import colors     = require("colors");
import {IException} from "./exception";

function displayException(error:IException) {
    var columns = process.stdout.columns || 80;
    function spaces(num:number) {
        return new Array(num + 1).join(" ");
    }
    console.log("");
    console.log("  " + colors.bgRed.white(spaces(columns - 4)));
    error.getStack().split("\n").forEach(function (line:string) {
        var temp:string;
        do {
            temp = line.slice(0, columns - 10);
            temp = temp + spaces(columns - temp.length - 10);
            line = line.slice(columns - 10);
            console.log("  " + colors.bgRed.white("   " + temp + "   "));
        } while (line);
    });
    console.log("  " + colors.bgRed.white(spaces(columns - 4)));
    console.log("");
}

export = displayException;
