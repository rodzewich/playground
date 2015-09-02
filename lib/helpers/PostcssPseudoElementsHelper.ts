/// <reference path="./IPostcssPseudoElementsHelper.ts" />
/// <reference path="./PostcssHelper.ts" />

import PostcssHelper = require("./PostcssHelper");
import IPostcssPseudoElementsHelper = require("./IPostcssPseudoElementsHelper");
import postcssPseudoElements = require("postcss-pseudoelements");

class PostcssPseudoElementsHelper extends PostcssHelper implements IPostcssPseudoElementsHelper {

    private _selectors:string[] = ["before", "after", "first-letter", "first-line"];

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

export = PostcssPseudoElementsHelper;
