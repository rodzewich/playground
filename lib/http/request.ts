import {IProtocolHelper, ProtocolHelper} from "../helpers/protocolHelper";
import {IMethodHelper, MethodHelper} from "../helpers/methodHelper";
import {IPortHelper, PortHelper} from "../helpers/portHelper";
import {isDefined} from "../utils";

export interface IOptions {
    protocol?:string;
    method?:string;
    port?:number;
    url?:string;
}

export interface IUrlHelper {
    getUrl():string;
    setUrl(url:string):void;
}

export class UrlHelper implements IUrlHelper {
    private _url:string;
    constructor(url?:string) {
        if (isDefined(url)) {
            this.setUrl(url);
        }
    }
    public getUrl():string {
        return this._url;
    }
    public setUrl(url:string):void {
        this._url = url;
    }
}

export interface IRequest {
    protocol:string;
    getProtocol():string;
    setProtocol(protocol:string):void;
    method:string;
    getMethod():string;
    setMethod(method:string):void;
    port:number;
    getPort():number;
    setPort(port:number):void;
    url:string;
    getUrl():string;
    setUrl(url:string):void;
}

export class Request implements IRequest {
    private _protocolHelper:IProtocolHelper;
    private _methodHelper:IMethodHelper;
    private _portHelper:IPortHelper;
    private _urlHelper:IUrlHelper;
    protected createProtocolHelper():IProtocolHelper {
        return new ProtocolHelper();
    }
    protected getProtocolHelper():IProtocolHelper {
        if (!this._protocolHelper) {
            this._protocolHelper = this.createProtocolHelper();
        }
        return this._protocolHelper;
    }
    protected createMethodHelper():IMethodHelper {
        return new MethodHelper();
    }
    protected getMethodHelper():IMethodHelper {
        if (!this._methodHelper) {
            this._methodHelper = this.createMethodHelper();
        }
        return this._methodHelper;
    }
    protected createPortHelper():IPortHelper {
        return new PortHelper();
    }
    protected getPortHelper():IPortHelper {
        if (!this._portHelper) {
            this._portHelper = this.createPortHelper();
        }
        return this._portHelper;
    }
    protected createUrlHelper():IUrlHelper {
        return new UrlHelper();
    }
    protected getUrlHelper():IUrlHelper {
        if (!this._urlHelper) {
            this._urlHelper = this.createUrlHelper();
        }
        return this._urlHelper;
    }
    constructor(options?:IOptions) {
        if (options && isDefined(options.protocol)) {
            this.setProtocol(options.protocol);
        }
        if (options && isDefined(options.method)) {
            this.setMethod(options.method);
        }
        if (options && isDefined(options.port)) {
            this.setPort(options.port);
        }
        if (options && isDefined(options.url)) {
            this.setUrl(options.url);
        }
    }
    public get protocol():string {
        return this.getProtocol();
    }
    public set protocol(protocol:string) {
        this.setProtocol(protocol);
    }
    public getProtocol():string {
        return this.getProtocolHelper().getProtocol();
    }
    public setProtocol(protocol:string):void {
        this.getProtocolHelper().setProtocol(protocol);
    }
    public get method():string {
        return this.getMethod();
    }
    public set method(method:string) {
        this.setMethod(method);
    }
    public getMethod():string {
        return this.getMethodHelper().getMethod();
    }
    public setMethod(method:string):void {
        this.getMethodHelper().setMethod(method);
    }
    public get port():number {
        return this.getPort();
    }
    public set port(port:number) {
        this.setPort(port);
    }
    public getPort():number {
        return this.getPortHelper().getPort();
    }
    public setPort(port:number):void {
        this.getPortHelper().setPort(port);
    }
    public get url():string {
        return this.getUrl();
    }
    public set url(url:string) {
        this.setUrl(url);
    }
    public getUrl():string {
        return this.getUrlHelper().getUrl();
    }
    public setUrl(url:string):void {
        this.getUrlHelper().setUrl(url);
    }
}

/// <reference path="../../types/node/node.d.ts" />
import http = require("http");
var request:http.IncomingMessage;

new Request({
    protocol: "http",
    method: String(request.headers["host"] || "").split(":")[0] || "localhost",
    port: parseInt(String(request.headers["host"] || "").split(":")[1], 10) || 80,
    url: String(request.url || "/")
});