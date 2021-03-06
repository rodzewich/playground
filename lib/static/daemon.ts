import fs   = require("fs");
import zlib = require("zlib");
import path = require("path");
import log4js = require("log4js");
import {IOptions as IOptionsBase, IDaemon as IDaemonBase, Daemon as DaemonBase} from "../daemon";
import {IClient as IMemory, Client as Memory} from "../memory/client";
import {isDefined, isFunction, isTrue, deferred, parallel} from "../utils/common";
import {IObject, IException, Exception} from "./exception";
import {IException as IExceptionMemory} from "../memory/exception";
import {IException as IExceptionBase} from "../exception";
import {Exception as ExceptionBase} from "../exception";
import UseIndexHelper   = require("./helpers/UseIndexHelper");
import IUseIndexHelper  = require("./helpers/IUseIndexHelper");
import UseGzipHelper    = require("./helpers/UseGzipHelper");
import IUseGzipHelper   = require("./helpers/IUseGzipHelper");
import {INamespaceHelper, NamespaceHelper, SeparatorHelper} from "../helpers/namespaceHelper";
import GzipCompressionLevelHelper  = require("./helpers/GzipCompressionLevelHelper");
import IGzipCompressionLevelHelper = require("./helpers/IGzipCompressionLevelHelper");
import IIncludeDirectoriesHelper   = require("../helpers/IIncludeDirectoriesHelper");
import IncludeDirectoriesHelper    = require("./../helpers/IncludeDirectoriesHelper");
import {ISourcesDirectoryHelper, SourcesDirectoryHelper} from "../helpers/sourcesDirectoryHelper";
import IndexExtensionsHelper       = require("./helpers/IndexExtensionsHelper");
import IIndexExtensionsHelper      = require("./helpers/IIndexExtensionsHelper");
import GzipExtensionsHelper        = require("./helpers/GzipExtensionsHelper");
import IGzipExtensionsHelper       = require("./helpers/IGzipExtensionsHelper");
import GzipMinLengthHelper         = require("./helpers/GzipMinLengthHelper");
import IGzipMinLengthHelper        = require("./helpers/IGzipMinLengthHelper");
import CharsetHelper               = require("../helpers/CharsetHelper");
import ICharsetHelper              = require("../helpers/ICharsetHelper");
import ContentType                 = require("../helpers/ContentType");

var logger:log4js.Logger = log4js.getLogger("static");

// todo: Accept-Encoding: <compress | gzip | deflate | sdch | identity>
// todo: gzipExludedExtensions

export interface IOptions extends IOptionsBase {
    charset?:string;
    memoryNamespace?:string;
    metadataNamespace?:string;
    binaryNamespace?:string;
    gzipNamespace?:string;
    lockNamespace?:string;
    sourcesDirectory?:string;
    includeDirectories?:string[];
    useIndex?:boolean;
    indexExtensions?:string[];
    useGzip?:boolean;
    gzipMinLength?:number;
    gzipExtensions?:string[];
    gzipCompressionLevel?:number;
    memoryLocation?:string;
    metadataLocation?:string;
    binaryLocation?:string;
    gzipLocation?:string;
    lockLocation?:string;
    memoryTimeout?:number;
    metadataTimeout?:number;
    binaryTimeout?:number;
    gzipTimeout?:number;
    lockTimeout?:number;
}

export interface IResponse {
    filename:string;
    original:string;
    content:string;
    type:string;
    length:number;
    zipContent:string;
    zipLength:number;
    date:number;
}

export interface IDaemon extends IDaemonBase {
    memoryNamespace:string;
    metadataNamespace:string;
    binaryNamespace:string;
    gzipNamespace:string;
    lockNamespace:string;
    sourcesDirectory:string;
    includeDirectories:string[];
    useIndex:boolean;
    indexExtensions:string[];
    useGzip:boolean;
    gzipMinLength:number;
    gzipExtensions:string[];
    gzipCompressionLevel:number;
    memoryLocation:string;
    metadataLocation:string;
    binaryLocation:string;
    gzipLocation:string;
    lockLocation:string;
    metadataTimeout:number;
    binaryTimeout:number;
    gzipTimeout:number;
    lockTimeout:number;
    memoryTimeout:number;
    getMemoryTimeout():number;
    setMemoryTimeout(timeout:number):void;
    setMetadataTimeout(timeout:number):void;
    getMetadataTimeout():number;
    setBinaryTimeout(timeout:number):void;
    getBinaryTimeout():number;
    setGzipTimeout(timeout:number):void;
    getGzipTimeout():number;
    setLockTimeout(timeout:number):void;
    getLockTimeout():number;
    setMemoryLocation(location:string):void;
    getMemoryLocation():string;
    setMetadataLocation(location:string):void;
    getMetadataLocation():string;
    setBinaryLocation(location:string):void;
    getBinaryLocation():string;
    setGzipLocation(location:string):void;
    getGzipLocation():string;
    setLockLocation(location:string):void;
    getLockLocation():string;
    getMemoryNamespace():string;
    setMemoryNamespace(namespace:string):void;
    getMetadataNamespace():string;
    setMetadataNamespace(namespace:string):void;
    getBinaryNamespace():string;
    setBinaryNamespace(namespace:string):void;
    getGzipNamespace():string;
    setGzipNamespace(namespace:string):void;
    getLockNamespace():string;
    setLockNamespace(namespace:string):void;
    getIncludeDirectories():string[];
    setIncludeDirectories(directories:string[]):void;
    getSourcesDirectory():string;
    setSourcesDirectory(directory:string):void;
    isUseIndex():boolean;
    getIsUseIndex():boolean;
    setIsUseIndex(value:boolean):void;
    getIndexExtensions():string[];
    setIndexExtensions(extensions:string[]):void;
    isUseGzip():boolean;
    getIsUseGzip():boolean;
    setIsUseGzip(value:boolean):void;
    getGzipMinLength():number;
    setGzipMinLength(length:number):void;
    getGzipExtensions():string[];
    setGzipExtensions(extensions:string[]):void;
    getGzipCompressionLevel():number;
    setGzipCompressionLevel(level:number):void;
    getContent(filename:string, cacheOnly:boolean, callback?:(errors:IException[], result:IResponse) => void):void;
}

export class Daemon extends DaemonBase implements IDaemon {

    private _queue:{[index:string]:((errors:IException[], result:IResponse) => void)[]} = {};

    private _includeDirectoriesHelper:IIncludeDirectoriesHelper;

    private _sourcesDirectoryHelper:ISourcesDirectoryHelper;

    private _useIndexHelper:IUseIndexHelper;

    private _indexExtensionsHelper:IIndexExtensionsHelper;

    private _useGzipHelper:IUseGzipHelper;

    private _gzipCompressionLevelHelper:IGzipCompressionLevelHelper;

    private _gzipExtensionsHelper:IGzipExtensionsHelper;

    private _gzipMinLengthHelper:IGzipMinLengthHelper;

    private _charsetHelper:ICharsetHelper;

    private _memory:IMemory;

    private _metadataMemory:IMemory;

    private _binaryMemory:IMemory;

    private _gzipMemory:IMemory;

    private _lockMemory:IMemory;

    protected createCharsetHelper():ICharsetHelper {
        return new CharsetHelper();
    }

    protected getCharsetHelper():ICharsetHelper {
        if (!this._charsetHelper) {
            this._charsetHelper = this.createCharsetHelper();
        }
        return this._charsetHelper;
    }

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
        if (options && isDefined(options.charset)) {
            this.setCharset(options.charset);
        }
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
        if (options && isDefined(options.sourcesDirectory)) {
            this.setSourcesDirectory(options.sourcesDirectory);
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

    public get charset():string {
        return this.getCharset();
    }

    public set charset(value:string) {
        this.setCharset(value);
    }

    public getCharset():string {
        return this.getCharsetHelper().getCharset();
    }

    public setCharset(charset:string):void {
        this.getCharsetHelper().setCharset(charset);
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
        var oldLocation:string = this.getMemory().getLocation();
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
        var memoryNamespace:string   = this.getMemoryNamespace(),
            metadataNamespace:string = NamespaceHelper.parse(memoryNamespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["metadata"]).getValue(),
            binaryNamespace:string   = NamespaceHelper.parse(memoryNamespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["binary"]).getValue(),
            gzipNamespace:string     = NamespaceHelper.parse(memoryNamespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["gzip"]).getValue(),
            lockNamespace:string     = NamespaceHelper.parse(memoryNamespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["lock"]).getValue();
        this.getMemory().setNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).getValue());
        if (metadataNamespace === this.getMetadataNamespace()) {
            this.setMetadataNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["metadata"]).getValue());
        }
        if (binaryNamespace === this.getBinaryNamespace()) {
            this.setBinaryNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["binary"]).getValue());
        }
        if (gzipNamespace === this.getGzipNamespace()) {
            this.setGzipNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["gzip"]).getValue());
        }
        if (lockNamespace === this.getLockNamespace()) {
            this.setLockNamespace(NamespaceHelper.parse(namespace, Daemon.DEFAULT_SEPARATOR).addToNamespace(["lock"]).getValue());
        }
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

    public get sourcesDirectory():string {
        return this.getSourcesDirectory();
    }

    public set sourcesDirectory(directory) {
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

    public getContent(filename:string, cacheOnly:boolean, callback?:(errors:IException[], result:IResponse) => void):void {

        var resolve:string,
            content:Buffer,
            memoryUnlock:(callback?:(errors:IExceptionMemory[]) => void) => void,
            response:IResponse = {
                filename   : path.relative(path.sep, path.normalize(path.resolve(path.sep, String(filename)))),
                original   : path.relative(path.sep, path.normalize(path.resolve(path.sep, String(filename)))),
                content    : null,
                type       : null,
                length     : null,
                zipContent : null,
                zipLength  : null,
                date       : null
            },
            handler:(errs:IException[], result:IResponse) => void =
                (errs:IException[], result:IResponse):void => {
                    var errors:IException[] = [];
                    var base64:string;
                    if (errs && errs.length) {
                        errors = errs.slice(0);
                    }
                    if (result && result.content) {
                        // todo: ?????
                    }
                    if (isFunction(memoryUnlock)) {
                        memoryUnlock((errs:IExceptionMemory[]):void => {
                            if (errs && errs.length) {
                                errs.forEach((error:IExceptionMemory):void => {
                                    errors.push(error);
                                });
                            }
                            if (isFunction(callback)) {
                                callback(errors && errors.length ? errors : null,
                                    errors && errors.length ? null : result || null);
                            }
                        });
                    } else if (isFunction(callback)) {
                        callback(errors && errors.length ? errors : null,
                            errors && errors.length ? null : result || null);
                    }
                },
            handlerViaQueue:(errs:IException[], result:IResponse) => void =
                (errs:IException[], result:IResponse):void => {
                    var index:number,
                        length:number,
                        queue:((errors:IException[], result:IResponse) => void)[];
                    if (isDefined(this._queue[response.filename])) {
                        queue = this._queue[response.filename];
                        delete this._queue[response.filename];
                        length = queue.length;
                        for (index = 0; index < length; index++) {
                            queue[index](errs, result);
                        }
                    }
                };

        deferred([

            (next:() => void):void => {
                var exists = false;

                if (isTrue(cacheOnly)) {
                    deferred([
                        (next:() => void):void => {
                            this.getMetadataMemory().getItem(response.filename, (errors:IExceptionMemory[], result:any):void => {
                                if (errors.length) {
                                    handler(errors, null);
                                } else if (result) {
                                    response.type = result.type;
                                    response.date = result.date;
                                    exists = true;
                                    next();
                                } else {
                                    handler(null, null);
                                }
                            });
                        },
                        ():void => {
                            var errors:IExceptionBase[] = [];
                            parallel([
                                (done:() => void):void => {
                                    this.getBinaryMemory().getBin(response.filename, (errs:IExceptionMemory[], buffer:Buffer):void => {
                                        if (errs && errs.length) {
                                            errs.forEach((error:IExceptionMemory):void => {
                                                errors.push(error);
                                            });
                                        } else if (buffer) {
                                            response.content = buffer.toString("base64");
                                            response.length = buffer.length;
                                        }
                                        done();
                                    });
                                },
                                (done:() => void):void => {
                                    this.getGzipMemory().getBin(response.filename, (errs:IExceptionMemory[], buffer:Buffer):void => {
                                        if (errs && errs.length) {
                                            errs.forEach((error:IExceptionMemory):void => {
                                                errors.push(error);
                                            });
                                        } else if (buffer) {
                                            response.zipContent = buffer.toString("base64");
                                            response.zipLength = buffer.length;
                                        }
                                        done();
                                    });
                                }
                            ], ():void => {
                                handler(errors.length ? errors : null,
                                    exists && !errors.length ? response : null);
                            });
                        }
                    ]);
                } else {
                    next();
                }
            },
            (next:() => void):void => {
                var exists:boolean = true;
                if (!isDefined(this._queue[response.filename])) {
                    this._queue[response.filename] = [];
                    exists = false;
                }
                this._queue[response.filename].push(handler);
                if (!exists) {
                    next();
                }
            },
            (next:() => void):void => {
                this.getLockMemory().lock(response.filename, (errors:IExceptionMemory[], unlock:(callback?:(errors:IExceptionMemory[]) => void) => void):void => {
                    if (errors && errors.length) {
                        handlerViaQueue(errors, null);
                    } else {
                        memoryUnlock = unlock;
                        next();
                    }
                });
            },
            (done:() => void):void => {
                var actions:((next:() => void) => void)[],
                    directories:string[] = [
                        this.getSourcesDirectory()
                    ];
                this.getIncludeDirectories().forEach((directory:string):void => {
                    if (directories.indexOf(directory) === -1) {
                        directories.push(directory);
                    }
                });
                actions = directories.map((directory:string):((next:() => void) => void) => {
                    // todo: find index files
                    return (next:() => void) => {
                        var actions:((next:() => void) => void)[];
                        resolve = path.join(directory, response.filename);
                        fs.stat(resolve, (error:NodeJS.ErrnoException, stats:fs.Stats):void => {
                            if (error && error.code !== "ENOENT") {
                                handlerViaQueue([ExceptionBase.convertFromError(error, {
                                    code    : error.code,
                                    errno   : error.errno,
                                    path    : error.path,
                                    syscall : error.syscall
                                })], null);
                            } else if (!error && stats.isDirectory() &&
                                this.isUseIndex() && this.getIndexExtensions().length) {
                                actions = this.getIndexExtensions().map((extension:string):((next:() => void) => void) => {
                                    return (next:() => void) => {
                                        resolve = path.join(directory, response.filename, "index." + extension);
                                        fs.stat(resolve, (error:NodeJS.ErrnoException, stats:fs.Stats):void => {
                                            if (error && error.code !== "ENOENT") {
                                                handlerViaQueue([ExceptionBase.convertFromError(error, {
                                                    code    : error.code,
                                                    errno   : error.errno,
                                                    path    : error.path,
                                                    syscall : error.syscall
                                                })], null);
                                            } else if (!error && stats.isFile()) {
                                                response.original = path.join(response.original, "index." + extension);
                                                response.date = parseInt(String(Number(stats.mtime) / 1000).split(".")[0], 10);
                                                done();
                                            } else {
                                                next();
                                            }
                                        });
                                    };
                                });
                                actions.push(() => {
                                    next();
                                });
                                deferred(actions);
                            } else if (!error && stats.isFile()) {
                                response.date = parseInt(String(Number(stats.mtime) / 1000).split(".")[0], 10);
                                done();
                            } else {
                                next();
                            }
                        });
                    };
                });
                actions.push(() => {
                    var errors:IExceptionBase[] = [];

                    function removeItem(memory:IMemory):((done:() => void) => void) {
                        return (done:() => void):void => {
                            memory.removeItem(response.filename, (errs:IExceptionMemory[]):void => {
                                if (errs && errs.length) {
                                    errs.forEach((error:IExceptionMemory):void => {
                                        errors.push(error);
                                    });
                                }
                                done();
                            });
                        };
                    }

                    parallel([
                        removeItem(this.getMetadataMemory()),
                        removeItem(this.getBinaryMemory()),
                        removeItem(this.getGzipMemory())
                    ], ():void => {
                        handlerViaQueue(errors.length ? errors : null, null);
                    });
                });
                deferred(actions);
            },
            (next:() => void):void => {
                var extension:string = path.extname(resolve).slice(1).toLowerCase();
                fs.readFile(resolve, (error:NodeJS.ErrnoException, data:Buffer):void => {
                    if (error) {
                        handlerViaQueue([ExceptionBase.convertFromError(error, {
                            code    : error.code,
                            errno   : error.errno,
                            path    : error.path,
                            syscall : error.syscall
                        })], null);
                    } else {
                        content          = data;
                        response.type    = ContentType.find(extension).toString(this.getCharset());
                        response.content = data.toString("base64");
                        response.length  = data.length;
                        next();
                    }
                });
            },
            (next:() => void):void => {
                var options:zlib.ZlibOptions = {
                    level: this.getGzipCompressionLevel()
                };
                // todo: use other zlib options
                // todo: implement via extensions
                if (this.isUseGzip() && this.getGzipMinLength() <= response.length) {
                    zlib.gzip(content, options, (error: Error, content:Buffer):void => {
                        if (error) {
                            handlerViaQueue([ExceptionBase.convertFromError(error)], null);
                        } else {
                            response.zipContent = content.toString("base64");
                            response.zipLength = content.length;
                            next();
                        }
                    });
                } else {
                    next();
                }
            },
            /*(next:() => void):void => {
             var options:zlib.ZlibOptions = {
             level: this.getGzipCompressionLevel()
             };
             // todo: use other zlib options
             // todo: implement via extensions
             if (this.isUseDeflate() && this.getDeflateMinLength() <= response.length) {
             zlib.deflate(content, options, (error: Error, content:Buffer):void => {
             if (error) {
             handlerViaQueue([ExceptionBase.convertFromError(error)], null);
             } else {
             response.deflateContent = content.toString("base64");
             response.deflateLength = content.length;
             next();
             }
             });
             } else {
             next();
             }
             },*/
            ():void => {
                handlerViaQueue(null, response);
            }
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
                        this.getContent(<string>args[0], <boolean>args[1], (errors:IException[], result:IResponse):void => {
                            response.result = result;
                            if (errors && errors.length) {
                                response.errors = errors.map((error:IException):IObject => {
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

    public static DEFAULT_SEPARATOR:SeparatorHelper = SeparatorHelper.DOT;

    public static DEFAULT_NAMESPACE:INamespaceHelper = new NamespaceHelper(["static"], Daemon.DEFAULT_SEPARATOR);

    public static DEFAULT_METADATA_NAMESPACE:INamespaceHelper = NamespaceHelper.parse(Daemon.DEFAULT_NAMESPACE.getValue(), Daemon.DEFAULT_SEPARATOR).addToNamespace(["metadata"]);

    public static DEFAULT_BINARY_NAMESPACE:INamespaceHelper = NamespaceHelper.parse(Daemon.DEFAULT_NAMESPACE.getValue(), Daemon.DEFAULT_SEPARATOR).addToNamespace(["binary"]);

    public static DEFAULT_GZIP_NAMESPACE:INamespaceHelper = NamespaceHelper.parse(Daemon.DEFAULT_NAMESPACE.getValue(), Daemon.DEFAULT_SEPARATOR).addToNamespace(["gzip"]);

    public static DEFAULT_LOCK_NAMESPACE:INamespaceHelper = NamespaceHelper.parse(Daemon.DEFAULT_NAMESPACE.getValue(), Daemon.DEFAULT_SEPARATOR).addToNamespace(["lock"]);

}

