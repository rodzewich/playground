import typeOf = require("./typeOf");

class TryCode {

    private _error:Error = null;

    private _catch:boolean = false;

    private _finally:boolean = false;

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
        if (this._error && !this._catch && this._error instanceof type) {
            this._catch = true;
            callback(this._error);
        }
        return this;
    }

    public finally(callback:() => void):void {
        if (!this._finally && typeOf(callback) === "function") {
            this._finally = true;
            callback();
        }
    }

}


function tryCode(callback:() => void) {
    return new TryCode(callback);
}

export = tryCode;
