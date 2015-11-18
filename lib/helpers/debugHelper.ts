import {isTrue, isDefined} from "../utils";

export interface IDebugHelper {
    isDebug():boolean;
    getIsDebug():boolean;
    setIsDebug(value:boolean):void;
}

export class DebugHelper implements IDebugHelper {

    private _debug:boolean = false;

    constructor(value?:boolean) {
        if (isDefined(value)) {
            this.setIsDebug(value);
        }
    }

    public isDebug():boolean {
        return this.getIsDebug();
    }

    public getIsDebug():boolean {
        return this._debug;
    }

    public setIsDebug(value:boolean):void {
        this._debug = isTrue(value);
    }

}
