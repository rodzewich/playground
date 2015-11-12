/// <reference path="./plugin.d.ts" />

import {isDefined} from "../../../../utils";
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
//import postcssPseudoElements = require("postcss-pseudoelements"); todo: fix this

class Plugin extends PluginBase implements IPlugin {

    private _selectors:string[] = ["before", "after", "first-letter", "first-line"];

    public isUsed():boolean {
        // todo fix this
        return false;
    }

    constructor(options?:IOptions) {
        super(options);
        if (options && isDefined(options.selectors)) {
            this.setSelectors(options.selectors);
        }
    }

    public getSelectors():string[] {
        return this._selectors;
    }

    public setSelectors(value:string[]):void {
        this._selectors = value;
    }

    public getInstance():any {
        return postcssPseudoElements({
            selectors: this.getSelectors()
        });
    }

}

export = Plugin;