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

    public compile(filename:string, callback:(errors?:Error[], result:any) => void):void {
    }

    private _clients:IClient[] = [];

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
                            this._clients.push(client);
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
            this._connecting = true;
            for (processNumber = 0; processNumber < numberOfProcesses; processNumber++) {
                actions.push(createAction(processNumber));
            }
            parallel(actions, (): void => {
                var index:number,
                    length:number = this._connectionQueue.length,
                    element:(errors?:Error[]) => void,
                    handler:(element:(errors?:Error[]) => void) => void = (element:(errors?:Error[]) => void):void => {
                        setTimeout((): void => {
                            if (!errors.length) {
                                element(null);
                            } else {
                                element(errors);
                            }
                        }, 0);
                    };

                this._connecting = false;
                if (!errors.length) {
                    this._connected = true;
                    callback(null);
                } else {
                    this._connected = false;
                    callback(errors);
                }
                for (index = 0; index < length; index++) {
                    element = this._connectionQueue.unshift();
                    handler(element);
                }
            });
        }
    }

    disconnect(callback:(errors?:Error[]) => void):void {
    }

}

export = Manger;
