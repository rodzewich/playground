import typeOf = require("../../../../typeOf");
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import postcssPseudoElements = require("postcss-pseudoelements");

class Plugin extends PluginBase implements IPlugin {

    private _selectors:string[] = ["before", "after", "first-letter", "first-line"];

    constructor(options?:IOptions) {
        super(options);
        if (options && typeOf(options.selectors) !== "undefined") {
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