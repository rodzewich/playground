import {isDefined, isObject, clone, get} from "../../utils/common";

export interface IParamsHelper {
    getParams():{[index:string]:any};
    getParam(name:string):any;
    hasParam(name:string):boolean;
}

export class ParamsHelper implements IParamsHelper {
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
