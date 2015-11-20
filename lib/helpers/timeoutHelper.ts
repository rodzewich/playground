import {isDefined, isNumber} from "../utils";
import {Exception} from "../exception";

export interface ITimeoutHelper {
    getTimeout():number;
    setTimeout(timeout:number):void;
}

export class TimeoutHelper implements ITimeoutHelper {

    private _timeout:number = TimeoutHelper.DEFAULT;

    constructor(timeout?:number) {
        this._timeout = TimeoutHelper.DEFAULT;
        if (isDefined(timeout)) {
            this.setTimeout(timeout);
        }
    }

    public getTimeout():number {
        return this._timeout;
    }

    public setTimeout(timeout:number):void {
        if (!isNumber(timeout) || isNaN(timeout)) {
            throw new Exception({message: "timeout must be a number"});
        }
        if (timeout < TimeoutHelper.MINIMUM) {
            throw new Exception({
                message : "timeout must be not less minimum value",
                data    : {
                    minimum : TimeoutHelper.MINIMUM
                }
            });
        }
        this._timeout = timeout;
    }

    public static MINIMUM:number = 50;

    public static DEFAULT:number = 300;

}
