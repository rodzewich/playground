
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

export module router {

    export interface IOptions {
        controller?:string;
        action?:string;
        type?:string;
        children?:IRouter[];
    }

    export interface IRouter {
        match(request:IRequest):IMatch;
        assemble(params:IParams, options:any):IRequest;
    }

    export class Router implements IRouter {

        constructor(options?:IOptions) {
            if (options && isDefined(options.defaults)) {

            }
        }

        public match(request:IRequest):IMatch {
            return new Match();
        }
        
        public assemble(params:IParams, options:any):IRequest {
            return null;
        }

    }

    export function factory(options?:IOptions):IRouter {
        return new Router(options);
    }

}

export module hostname {
    
    export interface IOptions extends router.IOptions {
        route:string;
        constraints:{[index:string]:(string|string[]|RegExp)};
    }

    export interface IRouter extends router.IRouter {
    }

    export class Router extends router.Router implements IRouter {

        private _route:string;
        private _constraints:{[index:string]:(string|string[]|RegExp)};

        constructor(options?:IOptions) {
            super(options);
            if (options && isDefined(options.route)) {
                this._route = options.route;
            }
            if (options && isDefined(options.constraints)) {
                this._constraints = options.constraints;
            }
        }

        public match(request:IRequest):IMatch {
            return null;
        }
        public assemble(params:IParams, options:any):IRequest {
            return null;
        }

    }

    export function factory(options?:IOptions):IRouter {
        return new Router(options);
    }

}


export module literal {
    
    export interface IOptions extends router.IOptions {
    }

    export interface IRouter extends router.IRouter {
    }

    export class Router extends router.Router implements IRouter {
    }

}


export module method {

    export interface IRouter extends router.IRouter {
    }

    export class Router extends router.Router implements IRouter {
    }

}

export module path {

    export interface IRouter extends router.IRouter {
    }

    export class Router extends router.Router implements IRouter {
    }

}

export module regex {

    export interface IRouter extends router.IRouter {
    }

    export class Router extends router.Router implements IRouter {
    }

}

export module scheme {

    export interface IRouter extends router.IRouter {
    }

    export class Router extends router.Router implements IRouter {
    }

}

export module segment {

    export interface IRouter extends router.IRouter {
    }

    export class Router extends router.Router implements IRouter {
    }

}
