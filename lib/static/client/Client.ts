import IClient    = require("./IClient");
import ClientBase = require("../../client/Client");
import log4js     = require("../../../logger");
import Separator  = require("../../helpers/Separator");
import NamespaceHelper  = require("../../helpers/NamespaceHelper");
import INamespaceHelper = require("../../helpers/INamespaceHelper");
import IIncludeDirectoriesHelper = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper = require("../../helpers/IncludeDirectoriesHelper");
import SourcesDirectoryHelper = require("../helpers/SourcesDirectoryHelper");
import ISourcesDirectoryHelper = require("../helpers/ISourcesDirectoryHelper");

var logger:log4js.Logger = log4js.getLogger("memory");

class Client extends ClientBase implements IClient {

    private _namespaceHelper:INamespaceHelper;

    private _metadataNamespaceHelper:INamespaceHelper;

    private _binaryNamespaceHelper:INamespaceHelper;

    private _gzipNamespaceHelper:INamespaceHelper;

    private _includeDirectoriesHelper:IIncludeDirectoriesHelper;

    private _sourcesDirectoryHelper:ISourcesDirectoryHelper;

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

    constructor(options) {
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

    }

    public getIsUseIndex():boolean {

    }

    public setIsUseIndex(value:boolean):void {

    }

    public getIndexExtensions():string[] {

    }

    public setIndexExtensions(extensions:string[]):void {

    }

    public isUseGzip():boolean {

    }

    public getIsUseGzip():boolean {

    }

    public setIsUseGzip(value:boolean):void {

    }

    public getGzipMinLength():number {

    }

    public setGzipMinLength(length:number):void {

    }

    public getGzipExtensions():string[] {

    }

    public setGzipExtensions(extensions:string[]):void {

    }

    public getGzipCompressionLevel():number {

    }

    public setGzipCompressionLevel(level:number):void {

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
            this.call((errors:IException[], response:boolean):void => {
                handler(errors && errors.length ? errors : null,
                    !errors || !errors.length ? !!response : null);
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
