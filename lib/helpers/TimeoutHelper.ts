import {isDefined} from "../utils";
import ITimeoutHelper = require("./ITimeoutHelper");

class TimeoutHelper implements ITimeoutHelper {

    private _value:number = TimeoutHelper.DEFAULT;

    constructor(timeout?:number) {
        this._value = TimeoutHelper.DEFAULT;
        if (isDefined(timeout)) {
            this.setTimeout(timeout);
        }
    }

    public getTimeout():number {
        return this._value;
    }

    public setTimeout(timeout:number):void {
        this._value = Math.max(TimeoutHelper.MINIMUM, parseInt(String(timeout), 10) || 0);
    }

    public static MINIMUM:number = 50;

    public static DEFAULT:number = 300;

}

export = TimeoutHelper;
