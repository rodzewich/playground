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

    private _namespaceHelper:INamespaceHelper;

    private _metadataNamespaceHelper:INamespaceHelper;

    private _binaryNamespaceHelper:INamespaceHelper;

    private _gzipNamespaceHelper:INamespaceHelper;

    private _lockNamespaceHelper:INamespaceHelper;

    private _includeDirectoriesHelper:IIncludeDirectoriesHelper;

    private _sourcesDirectoryHelper:ISourcesDirectoryHelper;

    private _useIndexHelper:IUseIndexHelper;

    private _indexExtensionsHelper:IIndexExtensionsHelper;

    private _useGzipHelper:IUseGzipHelper;

    private _gzipCompressionLevelHelper:IGzipCompressionLevelHelper;

    private _gzipExtensionsHelper:IGzipExtensionsHelper;

    private _gzipMinLengthHelper:IGzipMinLengthHelper;

    private _memory:{[index:string]:IMemory};

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

    protected createLockNamespaceHelper():INamespaceHelper {
        return new NamespaceHelper(["default", "lock"]);
    }

    protected getLockNamespaceHelper():INamespaceHelper {
        if (!this._lockNamespaceHelper) {
            this._lockNamespaceHelper = this.createLockNamespaceHelper();
        }
        return this._lockNamespaceHelper;
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

    public get metadataLocation():string {
        return this.getMetadataLocation();
    }

    public set metadataLocation(location:string) {
        this.setMetadataLocation(location);
    }

    public setMetadataLocation(location:string):void {
        // todo: implement it
    }

    public getMetadataLocation():string {
        // todo: implement it
        return null;
    }

    public get binaryLocation():string {
        return this.getBinaryLocation();
    }

    public set binaryLocation(location:string) {
        this.setBinaryLocation(location);
    }

    public setBinaryLocation(location:string):void {
        // todo: implement it
    }

    public getBinaryLocation():string {
        // todo: implement it
        return null;
    }

    public get gzipLocation():string {
        return this.getGzipLocation();
    }

    public set gzipLocation(location:string) {
        this.setGzipLocation(location);
    }

    public setGzipLocation(location:string):void {
        // todo: implement it
    }

    public getGzipLocation():string {
        // todo: implement it
        return null;
    }

    public get lockLocation():string {
        return this.getLockLocation();
    }

    public set lockLocation(location:string) {
        this.setLockLocation(location);
    }

    public setLockLocation(location:string):void {
        // todo: implement it
    }

    public getLockLocation():string {
        // todo: implement it
        return null;
    }


    public get memoryLocation():string {
        return this.getMemoryLocation();
    }

    public set memoryLocation(location:string) {
        this.setMemoryLocation(location);
    }

    public getMemoryLocation():string {
        // todo: implement it
        return null;
    }

    public setMemoryLocation(location:string):void {
        // todo: implement it
    }

    public get memoryTimeout():number {
        return this.getMemoryTimeout();
    }

    public set memoryTimeout(timeout:number) {
        this.setMemoryTimeout(timeout);
    }

    public getMemoryTimeout():number {
        // todo: implement it
        return null;
    }

    public setMemoryTimeout(timeout:number):void {
        // todo: implement it
    }

    public get metadataTimeout():number {
        return this.getMetadataTimeout();
    }

    public set metadataTimeout(timeout:number) {
        this.setMetadataTimeout(timeout);
    }

    public getMetadataTimeout():number {
        // todo: implement it
        return null;
    }

    public setMetadataTimeout(timeout:number):void {
        // todo: implement it
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
        // todo: implement it
        return null;
    }

    public setBinaryTimeout(timeout:number) {
        // todo: implement it
    }

    public get gzipTimeout():number {
        return this.getGzipTimeout();
    }

    public set gzipTimeout(timeout:number) {
        this.setGzipTimeout(timeout);
    }

    public getGzipTimeout():number {
        // todo: implement it
        return null;
    }

    public setGzipTimeout(timeout:number):void {
        // todo: implement it
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
        // todo: implement it
        return null;
    }

    public setLockTimeout(timeout:number):void {
        // todo: implement it
    }

    public setMemoryNamespace(namespace:string):void {
        this.getNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).getNamespace());
        this.getMetadataNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["metadata"]).getNamespace());
        this.getBinaryNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["binary"]).getNamespace());
        this.getGzipNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["gzip"]).getNamespace());
        this.getLockNamespaceHelper().setNamespace(NamespaceHelper.parse(namespace, Separator.DOT).addToNamespace(["lock"]).getNamespace());
    }

    public getMemoryNamespace():string {
        return this.getNamespaceHelper().getValue();
    }

    public get metadataNamespace():string {
        return this.getMetadataNamespace();
    }

    public set metadataNamespace(namespace:string) {
        this.setMetadataNamespace(namespace);
    }

    public setMetadataNamespace(namespace:string):void {
        // todo: implement it
        return null;
    }

    public getMetadataNamespace():string {
        return this.getMetadataNamespaceHelper().getValue();
    }

    public get binaryNamespace():string {
        return this.getBinaryNamespace();
    }

    public set binaryNamespace(namespace:string) {
        this.setBinaryNamespace(namespace);
    }

    public setBinaryNamespace(namespace:string):void {
        // todo: implement it
        return null;
    }

    public getBinaryNamespace():string {
        return this.getBinaryNamespaceHelper().getValue();
    }

    public get gzipNamespace():string {
        return this.getGzipNamespace();
    }

    public set gzipNamespace(namespace:string) {
        this.setGzipNamespace(namespace);
    }

    public setGzipNamespace(namespace:string):void {
        // todo: implement it
        return null;
    }

    public getGzipNamespace():string {
        return this.getGzipNamespaceHelper().getValue();
    }

    public get lockNamespace():string {
        return this.getGzipNamespace();
    }

    public set lockNamespace(namespace:string) {
        this.setLockNamespace(namespace);
    }

    public setLockNamespace(namespace:string):void {
        // todo: implement it
        return null;
    }

    public getLockNamespace():string {
        return this.getLockNamespaceHelper().getValue();
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
            namespace : this.getMemoryNamespace(),
            location  : this.getMemoryLocation(),
            timeout   : this.getMemoryTimeout(),
            debug     : this.isDebug()
        });
    }

    public get memory():IMemory {
        return this.getMemory();
    }

    public set memory(memory:IMemory) {
        throw new Exception({message: "property \"memory\" is readonly"});
    }

    public getMemory():IMemory {
        var memoryLocation:string = this.getMemoryLocation();
        if (!this._memory[memoryLocation]) {
            this._memory[memoryLocation] = this.createMemory();
        }
        return this._memory[memoryLocation];
    }

    protected createMetadataMemory():IMemory {
        return new Memory({
            namespace : this.getMetadataNamespace(),
            location  : this.getMetadataLocation(),
            timeout   : this.getMetadataTimeout(),
            debug     : this.isDebug()
        });
    }

    public get metadataMemory():IMemory {
        return this.getMetadataMemory();
    }

    public set metadataMemory(memory:IMemory) {
        throw new Exception({message: "property \"metadataMemory\" is readonly"});
    }

    public getMetadataMemory():IMemory {
        var metadataLocation:string = this.getMetadataLocation();
        if (!this._memory[metadataLocation]) {
            this._memory[metadataLocation] = this.createMetadataMemory();
        }
        return this._memory[metadataLocation];
    }

    protected createBinaryMemory():IMemory {
        return new Memory({
            namespace : this.getBinaryNamespace(),
            location  : this.getBinaryLocation(),
            timeout   : this.getBinaryTimeout(),
            debug     : this.isDebug()
        });
    }

    public get binaryMemory():IMemory {
        return this.getBinaryMemory();
    }

    public set binaryMemory(memory:IMemory) {
        throw new Exception({message: "property \"binaryMemory\" is readonly"});
    }

    public getBinaryMemory():IMemory {
        var binaryLocation:string = this.getBinaryLocation();
        if (!this._memory[binaryLocation]) {
            this._memory[binaryLocation] = this.createBinaryMemory();
        }
        return this._memory[binaryLocation];
    }

    protected createGzipMemory():IMemory {
        return new Memory({
            namespace : this.getGzipNamespace(),
            location  : this.getGzipLocation(),
            timeout   : this.getGzipTimeout(),
            debug     : this.isDebug()
        });
    }

    public get gzipMemory():IMemory {
        return this.getBinaryMemory();
    }

    public set gzipMemory(memory:IMemory) {
        throw new Exception({message: "property \"gzipMemory\" is readonly"});
    }

    public getGzipMemory():IMemory {
        var gzipLocation:string = this.getGzipLocation();
        if (!this._memory[gzipLocation]) {
            this._memory[gzipLocation] = this.createGzipMemory();
        }
        return this._memory[gzipLocation];
    }

    protected createLockMemory():IMemory {
        return new Memory({
            namespace : this.getLockNamespace(),
            location  : this.getLockLocation(),
            timeout   : this.getLockTimeout(),
            debug     : this.isDebug()
        });
    }

    public get lockMemory():IMemory {
        return this.getBinaryMemory();
    }

    public set lockMemory(memory:IMemory) {
        throw new Exception({message: "property \"lockMemory\" is readonly"});
    }

    public getLockMemory():IMemory {
        var lockLocation:string = this.getLockLocation();
        if (!this._memory[lockLocation]) {
            this._memory[lockLocation] = this.createLockMemory();
        }
        return this._memory[lockLocation];
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

}

export = Daemon;
