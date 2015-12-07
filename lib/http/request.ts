
import * as url from "url";
import {isDefined, isString, isObject, clone, get} from "../utils/common";
import {Exception} from "../exception";
import {IProtocolHelper, ProtocolHelper} from "../helpers/protocolHelper";
import {IPortHelper, PortHelper} from "../helpers/portHelper";
import {IQueryHelper, QueryHelper} from "./helpers/queryHelper";
import {IPostHelper, PostHelper} from "./helpers/postHelper";
import {ICookieHelper, CookieHelper} from "./helpers/cookieHelper";
import {IUrlHelper, UrlHelper} from "./helpers/urlHelper";
import {IMethodHelper, methods, find as findMethod} from "./helpers/methodHelper";

export interface IOptions {
    cookie?:string;
    protocol?:string;
    method?:string;
    port?:number;
    url?:string;
    post?:string;
    hostname?:string;
}

export interface IRequest {
    protocol:string;
    getProtocol():string;
    setProtocol(protocol:string):void;
    method:IMethodHelper;
    getMethod():IMethodHelper;
    port:number;
    getPort():number;
    setPort(port:number):void;
    url:string;
    getUrl():string;
    setUrl(url:string):void;
    query:IQueryHelper;
    getQuery():IQueryHelper;
    post:IPostHelper;
    getPost():IPostHelper;
    cookie:ICookieHelper;
    getCookie():ICookieHelper;
}

export class Request implements IRequest {
    private _options:url.Url;
    private _postData:string;
    private _cookieData:string;
    private _protocolHelper:IProtocolHelper;
    private _methodHelper:IMethodHelper;
    private _portHelper:IPortHelper;
    private _urlHelper:IUrlHelper;
    private _queryHelper:IQueryHelper;
    private _postHelper:IPostHelper;
    protected createProtocolHelper():IProtocolHelper {
        return new ProtocolHelper();
    }
    protected getProtocolHelper():IProtocolHelper {
        if (!this._protocolHelper) {
            this._protocolHelper = this.createProtocolHelper();
        }
        return this._protocolHelper;
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
    protected createQueryHelper():IQueryHelper {
        var query:string = "";
        if (this._options && isString(this._options.query)) {
            query = this._options.query;
        }
        return new QueryHelper(query);
    }
    protected getQueryHelper():IQueryHelper {
        if (!this._queryHelper) {
            this._queryHelper = this.createQueryHelper();
        }
        return this._queryHelper;
    }
    protected createPostHelper():IPostHelper {
        return new PostHelper(this._postData || "");
    }
    protected getPostHelper():IPostHelper {
        if (!this._postHelper) {
            this._postHelper = this.createPostHelper();
        }
        return this._postHelper;
    }
    private _cookieHelper:ICookieHelper;
    protected createCookieHelper():ICookieHelper {
        return new PostHelper(this._cookieData || "");
    }
    protected getCookieHelper():ICookieHelper {
        if (!this._postHelper) {
            this._postHelper = this.createCookieHelper();
        }
        return this._postHelper;
    }
    constructor(options?:IOptions) {
        if (options && isDefined(options.protocol)) {
            this.setProtocol(options.protocol);
        }
        if (options && isDefined(options.method)) {
            this._methodHelper = findMethod(options.method);
        }
        if (options && isDefined(options.port)) {
            this.setPort(options.port);
        }
        if (options && isDefined(options.url)) {
            this.setUrl(options.url);
            this._options = url.parse(this.getUrl(), false, false);
        }
        if (options && isDefined(options.post)) {
            this._postData = String(options.post || "");
        }
        if (options && isDefined(options.post)) {
            this._cookieData = String(options.cookie || "");
        }
        if (options && isDefined(options.hostname)) {

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
    
    public get method():IMethodHelper {
        return this.getMethod();
    }
    public set method(value:IMethodHelper) {
        throw new Exception({message: "\"method\" property cannot be set"});
    }
    public getMethod():IMethodHelper {
        return this._methodHelper || null;
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
    
    public get query():IQueryHelper {
        return this.getQuery();
    }
    public set query(value:IQueryHelper) {
        throw new Exception({message: "\"query\" property cannot be set"});
    }
    public getQuery():IQueryHelper {
        return this.getQueryHelper();
    }
    
    public get post():IPostHelper {
        return this.getPost();
    }
    public set post(value:IPostHelper) {
        throw new Exception({message: "\"post\" property cannot be set"});
    }
    public getPost():IPostHelper {
        return this.getPostHelper();
    }

    public get cookie():ICookieHelper {
        return this.getCookie();
    }
    public set cookie(value:ICookieHelper) {
        throw new Exception({message: "\"cookie\" property cannot be set"});
    }
    public getCookie():ICookieHelper {
        return this.getCookieHelper();
    }

}




// Upload
// http://www.componentix.com/blog/9/file-uploads-using-nodejs-now-for-real
// http://debuggable.com/posts/streaming-file-uploads-with-node-js:4ac094b2-b6c8-4a7f-bd07-28accbdd56cb


/// <reference path="../../types/node/node.d.ts" />
import http = require("http");
var request:http.IncomingMessage;

var data:string;

new Request({
    protocol: "http",
    method: request.method,
    hostname: String(request.headers["host"] || "").split(":")[0] || "localhost",
    port: parseInt(String(request.headers["host"] || "").split(":")[1], 10) || 80,
    url: String(request.url || "/"),
    post: ""
});



