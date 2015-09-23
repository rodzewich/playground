import PluginBase = require("../Plugin");
import IPlugin = require("../IPlugin");
import Name = require("../../Name");
import LessPlugin = require("less-plugin-csswring");
import browserslist = require("browserslist");

class Plugin extends PluginBase implements IPlugin {

    public getName():Name {
        return Name.CSSWRING;
    }

    private _preserveHacks:boolean = true;

    public isPreserveHacks():boolean {
        return this.getIsPreserveHacks();
    }
    public getIsPreserveHacks():boolean {
        return this._preserveHacks;
    }
    public setIsPreserveHacks(value:boolean):void {
        this._preserveHacks = value;
    }
    private _removeAllComments:boolean = true;
    public isRemoveAllComments():boolean {
        return this.getIsRemoveAllComments();
    }
    public getIsRemoveAllComments():boolean {
        return this._removeAllComments;
    }
    public setIsRemoveAllComments(value:boolean):void {
        this._removeAllComments = value;
    }

    public getInstance():any {
        return new LessPlugin({
            sourcemap : true, // todo: check this option
            preserveHacks : this.isPreserveHacks(),
            removeAllComments : this.isRemoveAllComments()
        });
    }

}

export = Plugin;
