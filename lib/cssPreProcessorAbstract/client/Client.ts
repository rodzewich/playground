/// <reference path="../../../types/node/node.d.ts" />

import typeOf = require("../../typeOf");
import isDefined = require("../../isDefined");
import IOptions = require("./IOptions");
import BaseClient = require("../../compiler/client/Client");
import IResponse = require("./IResponse");
import IRequest = require("./IRequest");
import IIncludeDirectoriesHelper = require("../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../helpers/IncludeDirectoriesHelper");
import BrandSpecificLogic = require("../helpers/BrandSpecificLogic");
import IBrandSpecificLogic = require("../helpers/IBrandSpecificLogic");
import SupportLanguages = require("../helpers/SupportLanguages");
import ISupportLanguages = require("../helpers/ISupportLanguages");
import ThrowErrors = require("../helpers/ThrowErrors");
import IThrowErrors = require("../helpers/IThrowErrors");
import UsedPostProcessing = require("../helpers/UsedPostProcessing");
import IUsedPostProcessing = require("../helpers/IUsedPostProcessing");

class Client extends BaseClient {

    private _includeDirectoriesInstance:IIncludeDirectoriesHelper;

    private _brandSpecificLogicInstance:IBrandSpecificLogic;

    private _supportLanguagesInstance:ISupportLanguages;

    private _throwErrorsInstance:IThrowErrors;

    private _usedPostProcessingInstance:IUsedPostProcessing;

    protected createIncludeDirectoriesInstance():IIncludeDirectoriesHelper {
        return new IncludeDirectoriesHelper();
    }

    protected getIncludeDirectoriesInstance():IIncludeDirectoriesHelper {
        if (!this._includeDirectoriesInstance) {
            this._includeDirectoriesInstance = this.createIncludeDirectoriesInstance();
        }
        return this._includeDirectoriesInstance;
    }

    protected createBrandSpecificLogicInstance():IBrandSpecificLogic {
        return new BrandSpecificLogic();
    }

    protected getBrandSpecificLogicInstance():IBrandSpecificLogic {
        if (!this._brandSpecificLogicInstance) {
            this._brandSpecificLogicInstance = this.createBrandSpecificLogicInstance();
        }
        return this._brandSpecificLogicInstance;
    }

    protected createSupportLanguagesInstance():ISupportLanguages {
        return new SupportLanguages();
    }

    protected getSupportLanguagesInstance():ISupportLanguages {
        if (!this._supportLanguagesInstance) {
            this._supportLanguagesInstance = this.createSupportLanguagesInstance();
        }
        return this._supportLanguagesInstance;
    }

    protected createThrowErrorsInstance():IThrowErrors {
        return new ThrowErrors();
    }

    protected getThrowErrorsInstance():IThrowErrors {
        if (!this._throwErrorsInstance) {
            this._throwErrorsInstance = this.createThrowErrorsInstance();
        }
        return this._throwErrorsInstance;
    }

    protected createUsedPostProcessingInstance():IUsedPostProcessing {
        return new UsedPostProcessing();
    }

    protected getUsedPostProcessingInstance():IUsedPostProcessing {
        if (!this._usedPostProcessingInstance) {
            this._usedPostProcessingInstance = this.createUsedPostProcessingInstance();
        }
        return this._usedPostProcessingInstance;
    }

    constructor(options:IOptions) {
        super(options);
        if (options && isDefined(options.includeDirectories)) {
            this.setIncludeDirectories(options.includeDirectories);
        }
        if (options && isDefined(options.brandSpecificLogic)) {
            this.setIsBrandSpecificLogic(options.brandSpecificLogic);
        }
        if (options && isDefined(options.supportLanguages)) {
            this.setIsSupportLanguages(options.supportLanguages);
        }
        if (options && isDefined(options.throwErrors)) {
            this.setIsThrowErrors(options.throwErrors);
        }
        if (options && isDefined(options.usedPostProcessing)) {
            this.setIsUsedPostProcessing(options.usedPostProcessing);
        }
    }

    public isBrandSpecificLogic():boolean {
        return this.getBrandSpecificLogicInstance().isUsed();
    }

    public getIsBrandSpecificLogic():boolean {
        return this.getBrandSpecificLogicInstance().getIsUsed();
    }

    public setIsBrandSpecificLogic(value:boolean):void {
        this.getBrandSpecificLogicInstance().setIsUsed(value);
    }

    public getIncludeDirectories():string[] {
        return this.getIncludeDirectoriesInstance().getDirectories();
    }

    public setIncludeDirectories(value:string[]):void {
        this.getIncludeDirectoriesInstance().setDirectories(value);
    }

    public isSupportLanguages():boolean {
        return this.getSupportLanguagesInstance().isSupport();
    }

    public getIsSupportLanguages():boolean {
        return this.getSupportLanguagesInstance().getIsSupport();
    }

    public setIsSupportLanguages(value:boolean):void {
        this.getSupportLanguagesInstance().setIsSupport(value);
    }

    public isThrowErrors():boolean {
        return this.getThrowErrorsInstance().isThrow();
    }

    public getIsThrowErrors():boolean {
        return this.getThrowErrorsInstance().getIsThrow();
    }

    public setIsThrowErrors(value:boolean):void {
        return this.getThrowErrorsInstance().setIsThrow(value);
    }

    public isUsedPostProcessing():boolean {
        return this.getUsedPostProcessingInstance().isUsed();
    }

    public getIsUsedPostProcessing():boolean {
        return this.getUsedPostProcessingInstance().getIsUsed();
    }

    public setIsUsedPostProcessing(value:boolean):void {
        this.getUsedPostProcessingInstance().setIsUsed(value);
    }

    protected getRequest():IRequest {
        return <IRequest>{
            filename             : null,
            sourcesDirectory     : this.getSourcesDirectory(),
            includeDirectories   : this.getIncludeDirectories(),
            brandSpecificLogic   : this.isBrandSpecificLogic(),
            supportLanguages     : this.isSupportLanguages(),
            throwErrors          : this.isThrowErrors(),
            usedPostProcessing   : this.isUsedPostProcessing(),
            errorBackgroundColor : this.getCssErrorsBackgroundColor(),
            errorTextColor       : this.getCssErrorsTextColor(),
            errorBlockPadding    : this.getCssErrorsBlockPadding(),
            errorFontSize        : this.getCssErrorsFontSize(),
            webRootDirectory     : this.getWebRootDirectory(),
            useCache             : this.isCacheUsed()
        };
    }

    public compile(filename:string, callback?:(errors:Error[], result:IResponse) => void):void {
        super.compile(filename, (errors:Error[], result:any):void => {
            if (typeOf(callback) === "function") {
                callback(errors, <IResponse>result);
            }
        });
    }

}

export = Client;
