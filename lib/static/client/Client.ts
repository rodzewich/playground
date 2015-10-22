import IClient    = require("./IClient");
import ClientBase = require("../../client/Client");
import log4js     = require("../../../logger");
import Separator  = require("../../helpers/Separator");
import IResponse  = require("../IResponse");
import IOptions   = require("./IOptions");
import UseIndexHelper   = require("../../helpers/UseIndexHelper");
import IUseIndexHelper  = require("../../helpers/IUseIndexHelper");
import UseGzipHelper    = require("../../helpers/UseGzipHelper");
import IUseGzipHelper   = require("../../helpers/IUseGzipHelper");
import NamespaceHelper  = require("../../helpers/NamespaceHelper");
import INamespaceHelper = require("../../helpers/INamespaceHelper");
import GzipCompressionLevelHelper  = require("../../helpers/GzipCompressionLevelHelper");
import IGzipCompressionLevelHelper = require("../../helpers/IGzipCompressionLevelHelper");
import IIncludeDirectoriesHelper   = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper    = require("../../helpers/IncludeDirectoriesHelper");
import SourcesDirectoryHelper      = require("../../helpers/SourcesDirectoryHelper");
import ISourcesDirectoryHelper     = require("../../helpers/ISourcesDirectoryHelper");
import IndexExtensionsHelper       = require("../../helpers/IndexExtensionsHelper");
import IIndexExtensionsHelper      = require("../../helpers/IIndexExtensionsHelper");
import GzipExtensionsHelper        = require("../../helpers/GzipExtensionsHelper");
import IGzipExtensionsHelper       = require("../../helpers/IGzipExtensionsHelper");

var logger:log4js.Logger = log4js.getLogger("memory");

class Client extends ClientBase implements IClient {

    private _namespaceHelper:INamespaceHelper;

    private _metadataNamespaceHelper:INamespaceHelper;

    private _binaryNamespaceHelper:INamespaceHelper;

    private _gzipNamespaceHelper:INamespaceHelper;

    private _includeDirectoriesHelper:IIncludeDirectoriesHelper;

    private _sourcesDirectoryHelper:ISourcesDirectoryHelper;

    private _useIndexHelper:IUseIndexHelper;

    private _indexExtensionsHelper:IIndexExtensionsHelper;

    private _useGzipHelper:IUseGzipHelper;

    private _gzipCompressionLevelHelper:IGzipCompressionLevelHelper;

    private _gzipExtensionsHelper:IGzipExtensionsHelper;

    protected createGzipExtensionsHelper():IGzipExtensionsHelper {
        return new GzipExtensionsHelper();
    }

    protected getGzipExtensionsHelper():IGzipExtensionsHelper {
        if (!this._gzipExtensionsHelper) {
            this._gzipExtensionsHelper = this.createGzipExtensionsHelper();
        }
        return this._gzipExtensionsHelper;
    }

    public getGzipExtensions():string[] {
        return this.getGzipExtensionsHelper().getExtensions();
    }

    protected createGzipCompressionLevelHelper():IGzipCompressionLevelHelper {
        return new GzipCompressionLevelHelper();
    }

    protected getGzipCompressionLevelHelper():IGzipCompressionLevelHelper {
        if (!this._gzipCompressionLevelHelper) {
            this._gzipCompressionLevelHelper = this.createGzipCompressionLevelHelper();
        }
        return this._gzipCompressionLevelHelper;
    }

    protected createUseGzipHelper():IUseGzipHelper {
        return new UseGzipHelper();
    }

    protected getUseGzipHelper():IUseGzipHelper {
        if (!this._useGzipHelper) {
            this._useGzipHelper = this.createUseGzipHelper();
        }
        return this._useGzipHelper;
    }

    protected createIndexExtensionsHelper():IIndexExtensionsHelper {
        return new IndexExtensionsHelper();
    }

    protected getIndexExtensionsHelper():IIndexExtensionsHelper {
        if (!this._indexExtensionsHelper) {
            this._indexExtensionsHelper = this.createIndexExtensionsHelper();
        }
        return this._indexExtensionsHelper;
    }

    protected createUseIndexHelper():IUseIndexHelper {
        return new UseIndexHelper();
    }

    protected getUseIndexHelper():IUseIndexHelper {
        if (!this._useIndexHelper) {
            this._useIndexHelper = this.createUseIndexHelper();
        }
        return this._useIndexHelper;
    }

    protected createNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper(["default"]);
    }

    protected getNamespaceHelper():INamespaceHelper {
        if (!this._namespaceHelper) {
            this._namespaceHelper = this.createNamespaceHelper();
        }
        return this._namespaceHelper;
    }

    protected createMetadataNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper(["default", "metadata"]);
    }

    protected getMetadataNamespaceHelper():INamespaceHelper {
        if (!this._metadataNamespaceHelper) {
            this._metadataNamespaceHelper = this.createMetadataNamespaceHelper();
        }
        return this._metadataNamespaceHelper;
    }

    protected createBinaryNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper(["default", "metadata"]);
    }

    protected getBinaryNamespaceHelper():INamespaceHelper {
        if (!this._binaryNamespaceHelper) {
            this._binaryNamespaceHelper = this.createBinaryNamespaceHelper();
        }
        return this._binaryNamespaceHelper;
    }

    protected createGzipNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper(["default", "gzip"]);
    }

    protected getGzipNamespaceHelper():INamespaceHelper {
        if (!this._gzipNamespaceHelper) {
            this._gzipNamespaceHelper = this.createGzipNamespaceHelper();
        }
        return this._gzipNamespaceHelper;
    }

    protected createIncludeDirectoriesHelper():IIncludeDirectoriesHelper {
        return new IncludeDirectoriesHelper();
    }

    protected getIncludeDirectoriesHelper():IIncludeDirectoriesHelper {
        if (!this._includeDirectoriesHelper) {
            this._includeDirectoriesHelper = this.createIncludeDirectoriesHelper();
        }
        return this._includeDirectoriesHelper;
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

    constructor(options?:IOptions) {
        super(options);
        if (options && isDefined(options.namespace)) {
            this.setNamespace(options.namespace);
        }
        if (options && isDefined(options.sourceDirectory)) {
            this.setSourcesDirectory(options.sourceDirectory);
        }
        if (options && isDefined(options.includeDirectories)) {
            this.setIncludeDirectories(options.includeDirectories);
        }
        if (options && isDefined(options.useIndex)) {
            this.setIsUseIndex(options.useIndex);
        }
        if (options && isDefined(options.indexExtensions)) {
            this.setIndexExtensions(options.indexExtensions);
        }
        if (options && isDefined(options.useGzip)) {
            this.setIsUseGzip(options.useGzip);
        }
        if (options && isDefined(options.gzipMinLength)) {
            this.setGzipMinLength(options.gzipMinLength);
        }
        if (options && isDefined(options.gzipExtensions)) {
            this.setGzipExtensions(options.gzipExtensions);
        }
        if (options && isDefined(options.gzipCompressionLevel)) {
            this.setGzipCompressionLevel(options.gzipCompressionLevel);
        }
    }

    public get namespace():string {
        return this.getNamespace();
    }

    public set namespace(namespace:string) {
        this.setNamespace(namespace);
    }

    public setNamespace(namespace:string):void {
        this.getNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT));
        this.getMetadataNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["metadata"]));
        this.getBinaryNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["binary"]));
        this.getGzipNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["gzip"]));
    }

    public getNamespace():string {
        return this.getNamespaceHelper().getValue();
    }

    public get metadataNamespace():string {
        return this.getMetadataNamespace();
    }

    public set metadataNamespace(namespace:string) {
    }

    public getMetadataNamespace():string {
        this.getMetadataNamespaceHelper().getValue();
    }

    public get binaryNamespace():string {
        return this.getBinaryNamespace();
    }

    public set binaryNamespace(namespace:string) {
    }

    public getBinaryNamespace():string {
        this.getBinaryNamespaceHelper().getValue();
    }

    public get gzipNamespace():string {
        return this.getGzipNamespace();
    }

    public set gzipNamespace(namespace:string) {
    }

    public getGzipNamespace():string {
        this.getGzipNamespaceHelper().getValue();
    }

    public get includeDirectories():string[] {
        return this.getIncludeDirectories();
    }

    public set includeDirectories(directories:string[]) {
        this.setIncludeDirectories(directories);
    }

    public getIncludeDirectories():string[] {
        return this.getIncludeDirectoriesHelper().getDirectories();
    }

    public setIncludeDirectories(directories:string[]):void {
        this.getIncludeDirectoriesHelper().setDirectories(directories);
    }

    public get sourceDirectory():string {
        return this.getSourcesDirectory();
    }

    public set sourceDirectory(directory) {
        this.setSourcesDirectory(directory);
    }

    public getSourcesDirectory():string {
        return this.getSourcesDirectoryHelper().getLocation();
    }

    public setSourcesDirectory(directory:string):void {
        this.getSourcesDirectoryHelper().setLocation(directory);
    }

    public isUseIndex():boolean {
        return this.getUseIndexHelper().isUsed();
    }

    public getIsUseIndex():boolean {
        return this.getUseIndexHelper().getIsUsed();
    }

    public setIsUseIndex(value:boolean):void {
        this.getUseIndexHelper().setIsUsed(value);
    }

    public getIndexExtensions():string[] {
        this.getIndexExtensionsHelper().getExtensions();
    }

    public setIndexExtensions(extensions:string[]):void {
        this.getIndexExtensionsHelper().setExtensions(extensions);
    }

    public isUseGzip():boolean {
        this.getUseGzipHelper().isUsed();
    }

    public getIsUseGzip():boolean {
        this.getUseGzipHelper().getIsUsed();
    }

    public setIsUseGzip(value:boolean):void {
        this.getUseGzipHelper().setIsUsed(value);
    }

    /**
     * Получить минимальную длину ответа, который будет сжиматься методом gzip.
     */
    public getGzipMinLength():number {

    }

    /**
     * Устанавить минимальную длину ответа, который будет сжиматься методом gzip.
     */
    public setGzipMinLength(length:number):void {

    }

    public setGzipExtensions(extensions:string[]):void {
        this.getGzipExtensionsHelper().setExtensions(extensions);
    }

    /**
     * Получить степень сжатия ответа методом gzip. Допустимые значения находятся в диапазоне от 1 до 9.
     */
    public getGzipCompressionLevel():number {
        return this.getGzipCompressionLevelHelper().getLevel();
    }

    /**
     * Устанавить степень сжатия ответа методом gzip. Допустимые значения находятся в диапазоне от 1 до 9.
     */
    public setGzipCompressionLevel(level:number):void {
        this.getGzipCompressionLevelHelper().setLevel(level);
    }

    public getContent(filename:string, callback?:(errors:IException[], response:string) => void):void {

        function handler(errors:IException[], response:boolean):void {
            if (isFunction(callback)) {
                setTimeout(():void => {
                    callback(errors, response);
                }, 0).ref();
            }
            if (errors) {
                errors.forEach((error:IException):void => {
                    logger.error(error.getStack());
                });
            }
        }

        if (!isString(filename) || !filename) {
            handler([new Exception({message : "filename should be a non empty string"})], null);
        } else {
            this.call((errors:IException[], response:IResponse):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? response : null);
            }, null, filename, {
                namespace            : this.getNamespace(),
                metadataNamespace    : this.getMetadataNamespace(),
                binaryNamespace      : this.getBinaryNamespace(),
                gzipNamespace        : this.getGzipNamespace(),
                sourceDirectory      : this.getSourcesDirectory(),
                includeDirectories   : this.getIncludeDirectories(),
                useIndex             : this.isUseIndex(),
                indexExtensions      : this.getIndexExtensions(),
                useGzip              : this.isUseGzip(),
                gzipMinLength        : this.getGzipMinLength(),
                gzipExtensions       : this.getGzipExtensions(),
                gzipCompressionLevel : this.getGzipCompressionLevel()
            });
        }
    }

}

export = Client;
