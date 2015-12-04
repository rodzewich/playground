/// <reference path="../../types/node/node.d.ts" />

import {isDefined} from "../utils/common";
import {IException as IExceptionBase} from "../exception";
import {IException} from "./exception";
import {ICssErrorsHelper, CssErrorsHelper} from "./helpers/cssErrorsHelper";
import {IWebRootDirectoryHelper, WebRootDirectoryHelper} from "./helpers/webRootDirectoryHelper";
import {ICacheHelper, CacheHelper} from "./helpers/cacheHelper";
import {ISourcesDirectoryHelper, SourcesDirectoryHelper} from "../helpers/sourcesDirectoryHelper";
import {IFilenameHelper, FilenameHelper} from "./helpers/filenameHelper"

export interface IOptions {
    filename:string;
    sourcesDirectory:string;
    errorBackgroundColor?:string;
    errorTextColor?:string;
    errorBlockPadding?:string;
    errorFontSize?:string;
    webRootDirectory?:string;
    useCache?:boolean;
}

export interface ICompiler {
    compile(callback:(errors:IException[], result:any) => void):void;
}

export abstract class Compiler implements ICompiler {

    private _filenameHelper:IFilenameHelper;

    private _cacheHelper:ICacheHelper;

    private _webRootDirectoryHelper:IWebRootDirectoryHelper;

    private _cssErrorsHelper:ICssErrorsHelper;

    private _sourcesDirectoryHelper:ISourcesDirectoryHelper;

    protected createCacheHelper():ICacheHelper {
        return new CacheHelper();
    }

    protected getCacheHelper():ICacheHelper {
        if (!this._cacheHelper) {
            this._cacheHelper = this.createCacheHelper();
        }
        return this._cacheHelper;
    }

    protected createWebRootDirectoryHelper():IWebRootDirectoryHelper {
        return new WebRootDirectoryHelper();
    }

    protected getWebRootDirectoryHelper():IWebRootDirectoryHelper {
        if (!this._webRootDirectoryHelper) {
            this._webRootDirectoryHelper = this.createWebRootDirectoryHelper();
        }
        return this._webRootDirectoryHelper;
    }

    protected createCssErrorsHelper():ICssErrorsHelper {
        return new CssErrorsHelper();
    }

    protected getCssErrorsHelper():ICssErrorsHelper {
        if (!this._cssErrorsHelper) {
            this._cssErrorsHelper = this.createCssErrorsHelper();
        }
        return this._cssErrorsHelper;
    }

    protected createSourcesDirectoryHelper():ISourcesDirectoryHelper {
        return new SourcesDirectoryHelper();
    }

    protected getSourcesDirectoryHelper():ISourcesDirectoryHelper {
        if (!this._sourcesDirectoryHelper) {
            this._sourcesDirectoryHelper = this.createSourcesDirectoryHelper();
        }
        return this._sourcesDirectoryHelper;
    }

    protected createFilenameHelper():IFilenameHelper {
        return new FilenameHelper();
    }

    protected getFilenameHelper():IFilenameHelper {
        if (!this._filenameHelper) {
            this._filenameHelper = this.createFilenameHelper();
        }
        return this._filenameHelper;
    }

    constructor(options?:IOptions) {
        if (options && isDefined(options.filename)) {
            this.setFilename(options.filename);
        }
        if (options && isDefined(options.sourcesDirectory)) {
            this.setSourcesDirectory(options.sourcesDirectory);
        }
        if (options && isDefined(options.errorBackgroundColor)) {
            this.setCssErrorsBackgroundColor(options.errorBackgroundColor);
        }
        if (options && isDefined(options.errorTextColor)) {
            this.setCssErrorsTextColor(options.errorTextColor);
        }
        if (options && isDefined(options.errorBlockPadding)) {
            this.setCssErrorsBlockPadding(options.errorBlockPadding);
        }
        if (options && isDefined(options.errorFontSize)) {
            this.setCssErrorsFontSize(options.errorFontSize);
        }
        if (options && isDefined(options.useCache)) {
            this.setIsCacheUsed(options.useCache);
        }
        if (options && isDefined(options.webRootDirectory)) {
            this.setWebRootDirectory(options.webRootDirectory);
        }
    }

    protected isCacheUsed():boolean {
        return this.getCacheHelper().isUsed();
    }

    protected getIsCacheUsed():boolean {
        return this.getCacheHelper().getIsUsed();
    }

    protected setIsCacheUsed(value:boolean):void {
        return this.getCacheHelper().setIsUsed(value);
    }

    protected getSourcesDirectory():string {
        return this.getSourcesDirectoryHelper().getLocation();
    }

    protected setSourcesDirectory(value:string):void {
        this.getSourcesDirectoryHelper().setLocation(value);
    }

    protected getWebRootDirectory():string {
        return this.getWebRootDirectoryHelper().getLocation();
    }

    protected setWebRootDirectory(value:string):void {
        this.getWebRootDirectoryHelper().setLocation(value);
    }

    protected getCssErrorsBackgroundColor():string {
        return this.getCssErrorsHelper().getBackgroundColor();
    }

    protected setCssErrorsBackgroundColor(value:string):void {
        this.getCssErrorsHelper().setBackgroundColor(value);
    }

    protected getCssErrorsTextColor():string {
        return this.getCssErrorsHelper().getTextColor();
    }

    protected setCssErrorsTextColor(value:string):void {
        this.getCssErrorsHelper().setTextColor(value);
    }

    protected getCssErrorsBlockPadding():string {
        return this.getCssErrorsHelper().getBlockPadding();
    }

    protected setCssErrorsBlockPadding(value:string):void {
        this.getCssErrorsHelper().setBlockPadding(value);
    }

    protected getCssErrorsFontSize():string {
        return this.getCssErrorsHelper().getFontSize();
    }

    protected setCssErrorsFontSize(value:string):void {
        return this.getCssErrorsHelper().setFontSize(value);
    }

    protected createCssErrors(errors:IExceptionBase[]):string {
        return this.getCssErrorsHelper().create(errors)
    }

    protected getFilename():string {
        return this.getFilenameHelper().getFilename();
    }

    protected setFilename(filename:string):void {
        this.getFilenameHelper().setFilename(filename);
    }

    abstract compile(callback:(errors:IException[], result:any) => void):void;

}
