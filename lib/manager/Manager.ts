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

    public getClient(callback: (client: IClient) => void): void {

    }

    public putClient(client: IClient): void {
        this._pool.push(client);
    }

    private _connecting:boolean = false;

    private _connected:boolean = false;

    private _connectionQueue:((errors?:Error[]) => void)[] = [];

    public connect(callback:(errors?:Error[]) => void):void {
        var errors:Error[] = [],
            actions:((done:() => void) => void)[] = [],
            numberOfProcesses:number = this.getNumberOfProcesses(),
            processNumber:number,
            createAction:(processNumber:number) => ((done:() => void) => void) = (processNumber:number):((done:() => void) => void) => {
                return (done:() => void):void => {
                    var client:IClient = this.createClient(this.formatLocationById(processNumber));
                    client.connect((error?:Error):void => {
                        if (!error) {
                            this.putClient(client);
                        } else {
                            errors.push(error);
                        }
                        done();
                    })
                };
            };

        if (this._connected) {
            setTimeout((): void => {
                if (typeof callback === "function") {
                    callback(null);
                }
            }, 0);
        } else if (this._connecting) {
            if (typeof callback === "function") {
                this._connectionQueue.push(callback);
            }
        } else {

        }


        if (!lock && !connected) {
            lock    = true;
            for (processNumber = 0; processNumber < numberOfProcesses; processNumber++) {
                actions.push(createAction(processNumber));
            }
            parallel(actions, function () {
                if (!errors.length) {
                    lock = false;
                    connected = true;
                    self.emit("connect", null);
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
