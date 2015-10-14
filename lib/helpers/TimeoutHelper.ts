import isDefined = require("../isDefined");
import ITimeoutHelper = require("./ITimeoutHelper");

class TimeoutHelper implements ITimeoutHelper {

    private _value:number;

    protected MINIMUM:number = 50;

    protected DEFAULT:number = 300;

    constructor(value:number) {
        this._value = this.DEFAULT;
        if (isDefined(value)) {
            this.setValue(value);
        }
    }

    public getValue():number {
        return this._value;
    }

    public setValue(value:number):void {
        this._value = Math.max(this.MINIMUM, parseInt(String(value), 10) || 0);
    }

}

export = TimeoutHelper;
