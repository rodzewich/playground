/// <reference path="../compiler/Exception.ts" />

import AbstractException = require("../compiler/Exception");

class Exception extends AbstractException {

    public filename:string;

    public line:number;

    public column:number;

    constructor(error:any) {
        super();
        if (error && error.name) {
            this.name = String(<string>error.name) + "Exception";
        }
        if (error && error.filename) {
            this.filename = String(<string>error.filename);
        }
        if (error && error.line) {
            this.line = Math.max(0, parseInt(String(<number>error.line), 10) || 0);
        }
        if (error && error.column) {
            this.column = Math.max(0, parseInt(String(<number>error.column), 10) || 0);
        }
        if (error && error.message) {
            this.message = String(<string>error.message) +
                " in " + String(this.getFilename()) +
                " on line " + String(this.getLine()) +
                ", column " + String(this.getColumn()) + ".";
        } else {
            this.message = "";
        }
    }

    public getFilename():string {
        return this.filename;
    }

    public getLine():number {
        return this.line;
    }

    public getColumn():number {
        return this.column;
    }

}

export = Exception;
