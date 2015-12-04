
import {IRequest} from "./request";
import {isDefined, clone, get} from "../utils/common";

export interface IParams {
    controller:string;
    method:string;
}

export interface IMatch {
    getName():string;
    getParam(key:string, defaults?:any):any;
    getParams():any;
}

export class Match implements IMatch {
    private _params:any = {};
    public getName():string {
        return null;
    }
    public getParam(key:string, defaults?:any):any {
        let param:any = get(this._params, String(key));
        if (isDefined(param)) {
            return clone(param, true);
        }
        return clone(defaults, true) || null;
    }
    public getParams():any {
        return clone(this._params, true);
    }
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
        return null;
    }
    public assemble(params:IParams, options:any):IRequest {
        return null;
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
