/// <reference path="./IManager.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../client/IClient.ts" />
/// <reference path="../client/Client.ts" />
/// <reference path="../../types/node/node.d.ts" />

import IManager = require("./IManager");
import IOptions = require("./IOptions");
import IClient = require("../client/IClient");
import Client = require("../client/Client");
import path = require("path");

class Manger implements IManager {

    private _location: string;

    private _numberOfProcesses: number = 1;

    constructor(options:IOptions) {
        if (options && typeof options.location !== "undefined") {
            this.setLocation(options.location);
        }
        if (options && typeof options.numberOfProcesses !== "undefined") {
            this.setNumberOfProcesses(options.numberOfProcesses);
        }
    }

    protected createClient(location: string): IClient {
        return new Client({location: location});
    }

    protected getNumberOfProcesses(): number {
        return this._numberOfProcesses;
    }

    protected setNumberOfProcesses(value: number): void {
        this._numberOfProcesses = value;
    }

    protected formatLocationById(id:any):string {
        var location:string = this.getLocation(),
            identifier:string = String(id || ""),
            extension:string = path.extname(location),
            directory:string = path.dirname(location),
            filename:string = path.basename(location);
        return path.join(directory, [filename, "-", identifier, extension].join(""));
    }

    protected setLocation(value: string): void {
        this._location = value;
    }

    protected getLocation(): string {
        return this._location;
    }

    public compile(filename:string, callback:(error?:Error, result:any) => void):void {
    }

    private _pool:IClient[] = [];

    connect(callback:(error?:Error) => void):void {
        var errors: Error[] = [],
            actions;
        var index;

        var createClient:(processNumber:number, done:() => void) => void = (done:() => void):void => {
            var client:IClient = this.createClient(this.formatLocationById(processNumber));
            client.connect((error?:Error):void => {
                if (!error) {
                    this._pool.push(client);
                } else {
                    errors.push(error);
                }
                done();
            })
        };
        
        if (typeOf(callback) === "function") {
            self.once("connect", callback);
        }
        if (!lock && !connected) {
            lock    = true;
            errors  = [];
            actions = [];
            for (index = 0; index < numberOfProcesses; index++) {
                actions.push(createClient);
            }
            parallel(actions, function () {
                if (!errors.length) {
                    lock = false;
                    connected = true;
                    self.emit("connect", null);
                } else {
                    self.destroy(function () {
                        lock = false;
                        connected = false;
                        self.emit("connect", errors);
                    });
                }
            });
        } else if (connected) {
            self.emit("connect", null);
        }
    }

    disconnect(callback:(error?:Error) => void):void {
    }

}

export = Manger;
