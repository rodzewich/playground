/// <reference path="../../compiler/compiler/Compiler.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="./ICompiler.ts" />
/// <reference path="../../typeOf.ts" />
/// <reference path="../../deferred.ts" />
/// <reference path="../../memory/client/IClient.ts" />

import BaseCompiler = require("../../compiler/compiler/Compiler");
import IOptions = require("./IOptions");
import ICompiler = require("./ICompiler");
import typeOf = require("../../typeOf");
import deferred = require("../../deferred");
import IMemory = require("../../memory/client/IClient");

class Compiler extends BaseCompiler implements ICompiler {

    private _includeDirectories:string[] = [];

    constructor(options:IOptions) {
        super(options);
        if (options && options.includeDirectories) {
            this.setIncludeDirectories(options.includeDirectories);
        }
    }

    protected getIncludeDirectories():string[] {
        return this._includeDirectories;
    }

    protected setIncludeDirectories(value:string[]):void {
        this._includeDirectories = value;
    }

    public compile(callback:(errors?:Error[], result?:any) => void):void {
        var memory:IMemory = this.getMemory();
        deferred([

        ]);
    }


}

export = Compiler;