/// <reference path="../types/node/node.d.ts" />

import http = require("http");

export interface IParams {
    controller:string;
    method:string;
}

export interface IRequest {
}

export interface IMatch {
    getName():string;
    getParam(key:string, defaults?:any):any;
    getParams():any;
}

export interface IRouter {
    match(request:IRequest):IMatch;
    assemble(params:IParams, options:any):IRequest;
}

export abstract class Router implements IRouter {
    abstract match(request:IRequest):IMatch;
    abstract assemble(params:IParams, options:any):IRequest;
}

export interface IHostname extends IRouter {
}

export class Hostname extends Router implements IHostname {
    public match(request:IRequest):IMatch {

    }
}

export interface ILiteral extends IRouter {
}

export class Literal extends Router implements ILiteral {
}

export interface IMethod extends IRouter {
}

export class Method extends Router implements IMethod {
}

export interface IPart extends IRouter {
}

export class Part extends Router implements IPart {
}

export interface IRegex extends IRouter {
}

export class Regex extends Router implements IRegex {
}

export interface IScheme extends IRouter {
}

export class Scheme extends Router implements IScheme {}

export interface ISegment extends IRouter {
}

export class Segment extends Router implements IRouter {
}