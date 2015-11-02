import DaemonBase = require("../../daemon/Daemon");
import IDaemon    = require("./IDaemon");
import IOptions   = require("./IOptions");
import IResponse  = require("../client/IResponse");
import log4js     = require("../../../logger");
import deferred   = require("../../deferred");
import IMemory    = require("../../memory/client/IClient");
import Memory     = require("../../memory/client/Client");
import Exception  = require("../exception/Exception");
import IException = require("../exception/IException");
import IObject    = require("../exception/IObject");
import isDefined  = require("../../isDefined");
import isFunction = require("../../isFunction");
import Separator  = require("../../helpers/Separator");
import ExceptionBase = require("../../exception/Exception");
import UseIndexHelper   = require("../helpers/UseIndexHelper");
import IUseIndexHelper  = require("../helpers/IUseIndexHelper");
import UseGzipHelper    = require("../helpers/UseGzipHelper");
import IUseGzipHelper   = require("../helpers/IUseGzipHelper");
import NamespaceHelper  = require("../../helpers/NamespaceHelper");
import INamespaceHelper = require("../../helpers/INamespaceHelper");
import GzipCompressionLevelHelper  = require("../helpers/GzipCompressionLevelHelper");
import IGzipCompressionLevelHelper = require("../helpers/IGzipCompressionLevelHelper");
import IIncludeDirectoriesHelper   = require("../../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper    = require("../../helpers/IncludeDirectoriesHelper");
import SourcesDirectoryHelper      = require("../../helpers/SourcesDirectoryHelper");
import ISourcesDirectoryHelper     = require("../../helpers/ISourcesDirectoryHelper");
import IndexExtensionsHelper       = require("../helpers/IndexExtensionsHelper");
import IIndexExtensionsHelper      = require("../helpers/IIndexExtensionsHelper");
import GzipExtensionsHelper        = require("../helpers/GzipExtensionsHelper");
import IGzipExtensionsHelper       = require("../helpers/IGzipExtensionsHelper");
import GzipMinLengthHelper         = require("../helpers/GzipMinLengthHelper");
import IGzipMinLengthHelper        = require("../helpers/IGzipMinLengthHelper");

var logger:log4js.Logger = log4js.getLogger("static");

class Daemon extends DaemonBase implements IDaemon {

    private _includeDirectoriesHelper:IIncludeDirectoriesHelper;

    private _sourcesDirectoryHelper:ISourcesDirectoryHelper;

    private _useIndexHelper:IUseIndexHelper;

    private _indexExtensionsHelper:IIndexExtensionsHelper;

    private _useGzipHelper:IUseGzipHelper;

    private _gzipCompressionLevelHelper:IGzipCompressionLevelHelper;

    private _gzipExtensionsHelper:IGzipExtensionsHelper;

    private _gzipMinLengthHelper:IGzipMinLengthHelper;

    private _memory:IMemory;

    private _metadataMemory:IMemory;

    private _binaryMemory:IMemory;

    private _gzipMemory:IMemory;

    private _lockMemory:IMemory;

    protected createGzipMinLengthHelper():IGzipMinLengthHelper {
        return new GzipMinLengthHelper();
    }

    protected getGzipMinLengthHelper():IGzipMinLengthHelper {
        if (!this._gzipMinLengthHelper) {
            this._gzipMinLengthHelper = this.createGzipMinLengthHelper();
        }
        return this._gzipMinLengthHelper;
    }

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
        if (options && isDefined(options.memoryNamespace)) {
            this.setMemoryNamespace(options.memoryNamespace);
        }
        if (options && isDefined(options.metadataNamespace)) {
            this.setMetadataNamespace(options.metadataNamespace);
        }
        if (options && isDefined(options.binaryNamespace)) {
            this.setBinaryNamespace(options.binaryNamespace);
        }
        if (options && isDefined(options.gzipNamespace)) {
            this.setGzipNamespace(options.gzipNamespace);
        }
        if (options && isDefined(options.lockNamespace)) {
            this.setLockNamespace(options.lockNamespace);
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
        if (options && isDefined(options.memoryLocation)) {
            this.setMemoryLocation(options.memoryLocation);
        }
        if (options && isDefined(options.metadataLocation)) {
            this.setMetadataLocation(options.metadataLocation);
        }
        if (options && isDefined(options.binaryLocation)) {
            this.setBinaryLocation(options.binaryLocation);
        }
        if (options && isDefined(options.gzipLocation)) {
            this.setGzipLocation(options.gzipLocation);
        }
        if (options && isDefined(options.lockLocation)) {
            this.setLockLocation(options.lockLocation);
        }
        if (options && isDefined(options.memoryTimeout)) {
            this.setMemoryTimeout(options.memoryTimeout);
        }
        if (options && isDefined(options.metadataTimeout)) {
            this.setMetadataTimeout(options.metadataTimeout);
        }
        if (options && isDefined(options.binaryTimeout)) {
            this.setBinaryTimeout(options.binaryTimeout);
        }
        if (options && isDefined(options.gzipTimeout)) {
            this.setGzipTimeout(options.gzipTimeout);
        }
        if (options && isDefined(options.lockTimeout)) {
            this.setLockTimeout(options.lockTimeout);
        }
    }

    public get metadataLocation():string {
        return this.getMetadataLocation();
    }

    public set metadataLocation(location:string) {
        this.setMetadataLocation(location);
    }

    public getMetadataLocation():string {
        return this.getMetadataMemory().getLocation();
    }

    public setMetadataLocation(location:string):void {
        this.getMetadataMemory().setLocation(location);
    }

    public get binaryLocation():string {
        return this.getBinaryLocation();
    }

    public set binaryLocation(location:string) {
        this.setBinaryLocation(location);
    }

    public getBinaryLocation():string {
        return this.getBinaryMemory().getLocation();
    }

    public setBinaryLocation(location:string):void {
        this.getBinaryMemory().setLocation(location);
    }

    public get gzipLocation():string {
        return this.getGzipLocation();
    }

    public set gzipLocation(location:string) {
        this.setGzipLocation(location);
    }

    public getGzipLocation():string {
        return this.getGzipMemory().getLocation();
    }

    public setGzipLocation(location:string):void {
        this.getGzipMemory().setLocation(location);
    }

    public get lockLocation():string {
        return this.getLockLocation();
    }

    public set lockLocation(location:string) {
        this.setLockLocation(location);
    }

    public getLockLocation():string {
        return this.getLockMemory().getLocation();
    }

    public setLockLocation(location:string):void {
        this.getLockMemory().setLocation(location);
    }

    public get memoryLocation():string {
        return this.getMemoryLocation();
    }

    public set memoryLocation(location:string) {
        this.setMemoryLocation(location);
    }

    public getMemoryLocation():string {
        return this.getMemory().getLocation();
    }

    public setMemoryLocation(location:string):void {
        var oldLocation:string = this.getMemory().getLocation()
        this.getMemory().setLocation(location);
        if (oldLocation === this.getMetadataMemory().getLocation()) {
            this.getMetadataMemory().setLocation(location);
        }
        if (oldLocation === this.getBinaryMemory().getLocation()) {
            this.getBinaryMemory().setLocation(location);
        }
        if (oldLocation === this.getGzipMemory().getLocation()) {
            this.getGzipMemory().setLocation(location);
        }
        if (oldLocation === this.getLockMemory().getLocation()) {
            this.getLockMemory().setLocation(location);
        }
    }

    public get memoryTimeout():number {
        return this.getMemoryTimeout();
    }

    public set memoryTimeout(timeout:number) {
        this.setMemoryTimeout(timeout);
    }

    public getMemoryTimeout():number {
        return this.getMemory().getTimeout();
    }

    public setMemoryTimeout(timeout:number):void {
        var oldTimeout:number = this.getMemory().getTimeout();
        this.getMemory().setTimeout(timeout);
        if (oldTimeout === this.getMetadataMemory().getTimeout()) {
            this.getMetadataMemory().setTimeout(timeout);
        }
        if (oldTimeout === this.getBinaryMemory().getTimeout()) {
            this.getBinaryMemory().setTimeout(timeout);
        }
        if (oldTimeout === this.getGzipMemory().getTimeout()) {
            this.getGzipMemory().setTimeout(timeout);
        }
        if (oldTimeout === this.getLockMemory().getTimeout()) {
            this.getLockMemory().setTimeout(timeout);
        }
    }

    public get metadataTimeout():number {
        return this.getMetadataTimeout();
    }

    public set metadataTimeout(timeout:number) {
        this.setMetadataTimeout(timeout);
    }

    public getMetadataTimeout():number {
        return this.getMetadataMemory().getTimeout();
    }

    public setMetadataTimeout(timeout:number):void {
        this.getMetadataMemory().setTimeout(timeout);
    }

    public get memoryNamespace():string {
        return this.getMemoryNamespace();
    }

    public get binaryTimeout():number {
        return this.getBinaryTimeout();
    }

    public set binaryTimeout(timeout:number) {
        this.setBinaryTimeout(timeout);
    }

    public getBinaryTimeout():number {
        return this.getBinaryMemory().getTimeout();
    }

    public setBinaryTimeout(timeout:number) {
        this.getBinaryMemory().setTimeout(timeout);
    }

    public get gzipTimeout():number {
        return this.getGzipTimeout();
    }

    public set gzipTimeout(timeout:number) {
        this.setGzipTimeout(timeout);
    }

    public getGzipTimeout():number {
        return this.getGzipMemory().getTimeout();
    }

    public setGzipTimeout(timeout:number):void {
        this.getGzipMemory().setTimeout(timeout);
    }

    public set memoryNamespace(namespace:string) {
        this.setMemoryNamespace(namespace);
    }

    public get lockTimeout():number {
        return this.getLockTimeout();
    }

    public set lockTimeout(timeout:number) {
        this.setLockTimeout(timeout);
    }

    public getLockTimeout():number {
        return this.getLockMemory().getTimeout();
    }

    public setLockTimeout(timeout:number):void {
        this.getLockMemory().setTimeout(timeout);
    }

    public setMemoryNamespace(namespace:string):void {
        // todo: re-implement it
        var oldMemoryNamespace:string = this.getMemoryNamespace();
        var oldMetadataNamespace:string = this;

        this.getMemory().setNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).getNamespace());
        if (true) {

        }
        this.getMetadataMemory().setNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["metadata"]).getValue());
        this.getBinaryMemory().setNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["binary"]).getValue());
        this.getGzipMemory().setNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["gzip"]).getValue());
        this.getLockMemory().setNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["lock"]).getValue());
    }

    public getMemoryNamespace():string {
        return this.getMemory().getNamespace();
    }

    public get metadataNamespace():string {
        return this.getMetadataNamespace();
    }

    public set metadataNamespace(namespace:string) {
        this.setMetadataNamespace(namespace);
    }

    public setMetadataNamespace(namespace:string):void {
        this.getMetadataMemory().setNamespace(namespace);
    }

    public getMetadataNamespace():string {
        return this.getMetadataMemory().getNamespace();
    }

    public get binaryNamespace():string {
        return this.getBinaryNamespace();
    }

    public set binaryNamespace(namespace:string) {
        this.setBinaryNamespace(namespace);
    }

    public setBinaryNamespace(namespace:string):void {
        this.getBinaryMemory().setNamespace(namespace);
    }

    public getBinaryNamespace():string {
        return this.getBinaryMemory().getNamespace();
    }

    public get gzipNamespace():string {
        return this.getGzipNamespace();
    }

    public set gzipNamespace(namespace:string) {
        this.setGzipNamespace(namespace);
    }

    public setGzipNamespace(namespace:string):void {
        this.getGzipMemory().setNamespace(namespace);
    }

    public getGzipNamespace():string {
        return this.getGzipMemory().getNamespace();
    }

    public get lockNamespace():string {
        return this.getLockNamespace();
    }

    public set lockNamespace(namespace:string) {
        this.setLockNamespace(namespace);
    }

    public setLockNamespace(namespace:string):void {
        this.getLockMemory().setNamespace(namespace);
    }

    public getLockNamespace():string {
        return this.getLockMemory().getNamespace();
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

    public get useIndex():boolean {
        return this.getIsUseIndex();
    }

    public set useIndex(value:boolean) {
        this.setIsUseIndex(value);
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

    public get indexExtensions():string[] {
        return this.getIndexExtensions();
    }

    public set indexExtensions(extensions:string[]) {
        this.setIndexExtensions(extensions);
    }

    public getIndexExtensions():string[] {
        return this.getIndexExtensionsHelper().getExtensions();
    }

    public setIndexExtensions(extensions:string[]):void {
        this.getIndexExtensionsHelper().setExtensions(extensions);
    }

    public get useGzip():boolean {
        return this.getIsUseGzip();
    }

    public set useGzip(value:boolean) {
        this.setIsUseGzip(value);
    }

    public isUseGzip():boolean {
        return this.getUseGzipHelper().isUsed();
    }

    public getIsUseGzip():boolean {
        return this.getUseGzipHelper().getIsUsed();
    }

    public setIsUseGzip(value:boolean):void {
        this.getUseGzipHelper().setIsUsed(value);
    }

    public get gzipMinLength():number {
        return this.getGzipMinLength();
    }

    public set gzipMinLength(length:number) {
        this.setGzipMinLength(length);
    }

    public getGzipMinLength():number {
        return this.getGzipMinLengthHelper().getLength();
    }

    public setGzipMinLength(length:number):void {
        this.getGzipMinLengthHelper().setLength(length);
    }

    public get gzipExtensions():string[] {
        return this.getGzipExtensions();
    }

    public set gzipExtensions(extensions:string[]) {
        this.setGzipExtensions(extensions);
    }

    public setGzipExtensions(extensions:string[]):void {
        this.getGzipExtensionsHelper().setExtensions(extensions);
    }

    public get gzipCompressionLevel():number {
        return this.getGzipCompressionLevel();
    }

    public set gzipCompressionLevel(level:number) {
        this.setGzipCompressionLevel(level);
    }

    public getGzipCompressionLevel():number {
        return this.getGzipCompressionLevelHelper().getLevel();
    }

    public setGzipCompressionLevel(level:number):void {
        this.getGzipCompressionLevelHelper().setLevel(level);
    }

    protected createMemory():IMemory {
        return new Memory({
            namespace : Daemon.DEFAULT_NAMESPACE.getValue()
        });
    }

    protected getMemory():IMemory {
        if (!this._memory) {
            this._memory = this.createMemory();
        }
        return this._memory;
    }

    protected createMetadataMemory():IMemory {
        return new Memory({
            namespace : Daemon.DEFAULT_METADATA_NAMESPACE.getValue()
        });
    }

    protected getMetadataMemory():IMemory {
        if (!this._metadataMemory) {
            this._metadataMemory = this.createMetadataMemory();
        }
        return this._metadataMemory;
    }

    protected createBinaryMemory():IMemory {
        return new Memory({
            namespace : Daemon.DEFAULT_BINARY_NAMESPACE.getValue()
        });
    }

    protected getBinaryMemory():IMemory {
        if (!this._binaryMemory) {
            this._binaryMemory = this.createBinaryMemory();
        }
        return this._binaryMemory;
    }

    protected createGzipMemory():IMemory {
        return new Memory({
            namespace : Daemon.DEFAULT_GZIP_NAMESPACE.getValue()
        });
    }

    protected getGzipMemory():IMemory {
        if (!this._gzipMemory) {
            this._gzipMemory = this.createGzipMemory();
        }
        return this._gzipMemory;
    }

    protected createLockMemory():IMemory {
        return new Memory({
            namespace : Daemon.DEFAULT_LOCK_NAMESPACE.getValue()
        });
    }

    protected getLockMemory():IMemory {
        if (!this._lockMemory) {
            this._lockMemory = this.createLockMemory();
        }
        return this._lockMemory;
    }

    public getContent(filename:string, callback?:(errors:Exception[], result:IResponse) => void):void {

        var temp:string = String(filename);

        function handler(errors:Exception[], result:IResponse):void {
            if (isFunction(callback)) {
                callback(errors, result);
            }
        }



        deferred([

            (next:() => void):void => {
                var memory = new Memory();
                memory.getItem(temp, () => {

                });
            },

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},

            (next:() => void):void => {},


        ]);

    }

    protected handler(request:any, callback:(response:any) => void):void {

        function handler(response:any):void {
            if (isFunction(callback)) {
                setTimeout((): void => {
                    callback(response);
                }, 0).ref();
            }
        }

        super.handler(request, (response:any) => {

            var args:any[]     = request.args || [],
                command:string = <string>args.shift(),
                error:IException;

            try {

                switch (command) {
                    case "ping":
                        response.result = null;
                        handler(response);
                        break;
                    case "stop":
                        response.result = null;
                        handler(response);
                        this.stop();
                        break;
                    case "getContent":
                        this.getContent(<string>args[0], (errors:Exception[], result:IResponse):void => {
                            response.result = result;
                            if (errors && errors.length) {
                                response.errors = errors.map((error:Exception):IObject => {
                                    return error.toObject();
                                });
                            }
                            handler(response);
                        });
                        break;
                    default:
                        error = new Exception({message: "unknown command"});
                        response.errors = [error.toObject()];
                        logger.error(error.getStack());
                        handler(response);
                        break;
                }

            } catch (error) {

                response.errors = ExceptionBase.convertFromError(error).toObject();
                logger.error(ExceptionBase.convertFromError(error).getStack());
                handler(response);

            }

        });
    }

    public static DEFAULT_SEPARATOR:Separator = Separator.DOT;

    public static DEFAULT_NAMESPACE:INamespaceHelper = new NamespaceHelper(["static"], Daemon.DEFAULT_SEPARATOR);

    public static DEFAULT_METADATA_NAMESPACE:INamespaceHelper = NamespaceHelper.parse(Daemon.DEFAULT_NAMESPACE.getValue(), Daemon.DEFAULT_SEPARATOR).addToNamespace(["metadata"]);

    public static DEFAULT_BINARY_NAMESPACE:INamespaceHelper = NamespaceHelper.parse(Daemon.DEFAULT_NAMESPACE.getValue(), Daemon.DEFAULT_SEPARATOR).addToNamespace(["binary"]);

    public static DEFAULT_GZIP_NAMESPACE:INamespaceHelper = NamespaceHelper.parse(Daemon.DEFAULT_NAMESPACE.getValue(), Daemon.DEFAULT_SEPARATOR).addToNamespace(["gzip"]);

    public static DEFAULT_LOCK_NAMESPACE:INamespaceHelper = NamespaceHelper.parse(Daemon.DEFAULT_NAMESPACE.getValue(), Daemon.DEFAULT_SEPARATOR).addToNamespace(["lock"]);

}

export = Daemon;
