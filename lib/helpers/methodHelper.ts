import {isDefined} from "../utils";

export interface IMethodHelper {
    getMethod():string;
    setMethod(method:string):void;
}

export class MethodHelper implements IMethodHelper {
    private _method:string;
    constructor(method?:string) {
        if (isDefined(method)) {
            this.setMethod(method);
        }
    }
    public getMethod():string {
        return this._method;
    }
    public setMethod(method:string):void {
        this._method = method;
    }
}
