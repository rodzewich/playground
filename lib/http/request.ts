
import * as querystring from "querystring";
import {IProtocolHelper, ProtocolHelper} from "../helpers/protocolHelper";
import {IMethodHelper, MethodHelper} from "../helpers/methodHelper";
import {IPortHelper, PortHelper} from "../helpers/portHelper";
import {isDefined, isObject, clone, get} from "../utils/common";

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

export interface IParams {
    getParams():{[index:string]:any};
    getParam(name:string):any;
    hasParam(name:string):boolean;
}

export class Params implements IParams {
    private _params:{[index:string]:any};
    constructor(params:any) {
        if (isObject(params)) {
            this._params = clone(params, true);
        } else {
            this._params = {};
        }
    }
    public getParams():{[index:string]:any} {
        return clone(this._params);
    }
    public getParam(name:string):any {
        if (this.hasParam(name)) {
            return clone(get(this._params, String(name))) || null;
        }
        return null;
    }
    public hasParam(name:string):boolean {
        return isDefined(get(this._params, String(name)));
    }
}

export interface IQuery extends IParams {
}

export class Query extends Params implements IQuery {
    
    constructor(query:string) {
        super(querystring.parse(query));
    }

}

export interface IPost extends IParams {
}

export class Post extends Params implements IPost {
}

export interface ICookie extends IParams {
}

export class Cookie extends Params implements ICookie {
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
    query:IQuery;
    getQuery():IQuery;
    post:IPost;
    getPost():IPost;
    cookie:ICookie;
    getCookie():ICookie;
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
    public get query():IQuery {
        return this.getQuery();
    }
    public set query(params:IQuery) {
        // todo: throw error!!!
    }
    private _query:IQuery;
    protected createQuery():IQuery {
        return new Query();
    }
    public getQuery():IQuery {
        if (!this._query) {
            this._query = this.createQuery();
        }
        return this._query;
    }
    public get post():IPost {
        return this.getPost();
    }
    public set post(params:IPost) {
        // todo: throw error!!!
    }
    private _post:IPost;
    protected createPost():IPost {
        return new Post();
    }
    public getPost():IPost {
        if (!this._post) {
            this._post = this.createPost();
        }
        return this._post;
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



