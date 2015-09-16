import typeOf = require("./typeOf");

class TryCode {

    private _error:Error = null;

    private _catched:boolean = false;

    constructor(callback:() => void) {
        try {
            if (typeOf(callback) === "function") {
                callback();
            }
        } catch (error) {
            this._error = <Error>error;
        }
    }

    public catch(type:any, callback:(error:Error) => void):TryCode {
        if (!this._catched && this._error instanceof type) {
            this._catched = true;
            callback(this._error);
        }
        return this;
    }

    public finaly(callback:() => void): void {
        if (typeOf(callback) === "function") {
            callback();
        }
    }

}


function tryCode(callback:() => void) {
    return new TryCode(callback);
}

export = tryCode;
