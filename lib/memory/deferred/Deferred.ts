import isObject  = require("../../isObject");
import IOptions  = require("../client/IOptions");
import IClient   = require("../client/IClient");
import Client    = require("../client/Client");
import IDeferred = require("./IDeferred");

class Deferred implements IDeferred {

    private _client:IClient;

    private _options:IOptions;

    protected createClient():IClient {
        return new Client(this._options);
    }

    protected getClient():IClient {
        if (!this._client) {
            this._client = this.createClient();
        }
        return this._client;
    }

    constructor(options?:IOptions) {
        if (isObject(options)) {
            this._options = options;
        }
    }

    public static create(options?:IOptions):IDeferred {
        new Deferred(options);
    }
}

export = Deferred;
