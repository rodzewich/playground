import IPostcssHelper = require("./IPostcssHelper");

abstract class PostcssHelper implements IPostcssHelper {

    private _use:boolean = true;

    public isUsed():boolean {
        return this.getIsUsed();
    }

    public getIsUsed():boolean {
        return this._use;
    }

    public setIsUsed(value:boolean):void {
        this._use = value;
    }

    abstract

    getInstance():any;

}

export = PostcssHelper;
