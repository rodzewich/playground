import isDefined = require("../isDefined");
import ITimeoutHelper = require("./ITimeoutHelper");

class TimeoutHelper implements ITimeoutHelper {

    private _value:number = 50;

    constructor(value:number) {
        if (isDefined(value)) {
            this.setValue(value);
        }
    }

    public getValue():number {
        return this._value;
    }

    public setValue(value:number):void {
        this._value = Math.max(50, parseInt(String(value), 10) || 0);
    }

}

export = TimeoutHelper;
