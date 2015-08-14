/// <reference path="../../daemon/Daemon.ts" />
/// <reference path="./IDaemon.ts" />
/// <reference path="./IOptions.ts" />

import AbstractDaemon = require("../../daemon/Daemon");
import IDaemon = require("./IDaemon");
import IOptions = require("./IOptions");

class Daemon extends AbstractDaemon implements IDaemon {

    constructor(options: IOptions) {
        super(options);
    }

    protected getLength(): number {
        return null;
    }

    protected getKey(index: number): string {
        return null;
    }

    protected getKeys() {

    }

    protected getItem() {

    }

    protected getItems() {}

    protected hasItem() {}

    protected hasItems() {}

    protected setItem() {}

    protected setItems() {}

    protected removeItem() {}

    protected removeItems() {}

    protected lock() {}

    protected unlock() {}

    protected requestHandler(request:any, callback:(response:any) => void):void {
        super.requestHandler(request, (response:any) => {
            var command:string = request.command,
                args:any[] = request.arguments;
            switch (command) {
                case "getLength":
                    response.result = this.getLength();
                    break;
                case "getKey":
                    response.result = this.getKey(<number>args[0]);
                    break;
                case "getKeys":
                    response.result = this.getKeys();
                    break;
                case "getItem":
                    //response.result = this.getItem(request);
                    break;
                case "getItems":
                    //response.result = this.getItems(request);
                    break;
                case "hasItem":
                    //response.result = this.hasItem(request);
                    break;
                case "hasItems":
                    //response.result = this.hasItems(request);
                    break;
                case "setItem":
                    //response.result = this.setItem(request);
                    break;
                case "setItems":
                    //response.result = this.setItems(request);
                    break;
                case "removeItem":
                    //response.result = this.removeItem(request);
                    break;
                case "removeItems":
                    //response.result = this.removeItems(request);
                    break;
                case "lock":
                    //response.result = this.lock(request);
                    break;
                case "unlock":
                    //response.result = this.unlock(request);
                    break;
                default:
                    response.result = null;
                    break;
            }
            callback(response);
        });
    }

}

export = Daemon;
