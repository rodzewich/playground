import IIncrementlyBigIntegerHelper = require("./IIncrementlyBigIntegerHelper");

class IncrementlyBigIntegerHelper implements IIncrementlyBigIntegerHelper {

    private _value:number[] = [0];

    public getValue():string {

        var sign:string = "";
        if (this._value[0] < 0) {
            sign = "-";
        }

        function addition(value:string):string {
            if (value.slice(0, 1) === "-") {
                value = value.slice(1);
            }
            return new Array(9 - value.length).join("0") + value;
        }

        function clear(value:string):string {
            while (value.slice(0, 1) === "0") {
                value = value.slice(1);
            }
            return value;
        }

        return sign + clear(this._value.map((item:number):string => {
            return addition(item.toString(16));
        }).join(""));

    }

    public increment():string {
        var index:number,
            length:number = this._value.length;
        if (this._value[0] >= 0) {
            this._value[0]++;
            for (index = 0; index < length; index++) {
                if (this._value[index] <= 0xffffffff) {
                    break;
                }
                this._value[index] = 0;
                if (!this._value[index + 1]) {
                    this._value[index + 1] = 0;
                }
                this._value[index + 1]++;
            }
        } else {
            this._value[length - 1]++;
            if (this._value[length - 1] === 0) {
                this._value.pop();
            }
        }

        console.log("this.getValue()", this.getValue());

        return this.getValue();
    }

    public decrement():string {
        var index:number,
            length:number = this._value.length;
        if (this._value[0] <= 0) {
            this._value[0]--;
            for (index = 0; index < length; index++) {
                if (this._value[index] >= -0xffffffff) {
                    break;
                }
                this._value[index] = 0;
                if (!this._value[index + 1]) {
                    this._value[index + 1] = 0;
                }
                this._value[index + 1]--;
            }
        } else {
            this._value[length - 1]--;
            if (this._value[length - 1] === 0) {
                this._value.pop();
            }
        }

        return this.getValue();
    }

}

export = IncrementlyBigIntegerHelper;
