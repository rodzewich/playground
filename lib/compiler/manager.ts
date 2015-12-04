/// <reference path="../../types/node/node.d.ts" />

import path = require("path");
import {isDefined, isFunction, deferred, parallel} from "../utils/common";
import {IOptions as IOptionsBase, IClient, Client} from "./client";
import {INumberOfProcessesHelper, NumberOfProcessesHelper} from "./helpers/numberOfProcessesHelper";

interface IOptions extends IOptionsBase {
    numberOfProcesses: number;
}

interface IManager extends IClient {
}

export class Manager extends Client implements IManager {

    private _numberOfProcessesHelper:INumberOfProcessesHelper;

    private _queue:((client:IClient) => void)[] = [];

    private _pool:IClient[] = [];

    private _clients:IClient[] = [];

    private _connecting:boolean = false;

    private _connected:boolean = false;

    private _connectionQueue:((errors:Error[]) => void)[] = [];

    protected createNumberOfProcessesHelper():INumberOfProcessesHelper {
        return new NumberOfProcessesHelper();
    }

    protected getNumberOfProcessesHelper():INumberOfProcessesHelper {
        if (this._numberOfProcessesHelper) {
            this._numberOfProcessesHelper = this.createNumberOfProcessesHelper();
        }
        return this._numberOfProcessesHelper;
    }

    constructor(options:IOptions) {
        super(options);
        if (options && isDefined(options.numberOfProcesses)) {
            this.setNumberOfProcesses(options.numberOfProcesses);
        }
    }

    protected getNumberOfProcesses():number {
        return this.getNumberOfProcessesHelper().getNumber();
    }

    protected setNumberOfProcesses(value:number):void {
        this.getNumberOfProcessesHelper().setNumber(value);
    }

    protected createRequest(location:string):IOptionsBase {
        return <IOptionsBase>{
            location              : location,
            memoryLocation        : this.getMemoryLocation(),
            sourcesDirectory      : this.getSourcesDirectory(),
            errorsBackgroundColor : this.getErrorsBackgroundColor(),
            errorsTextColor       : this.getErrorsTextColor(),
            errorsBlockPadding    : this.getErrorsBlockPadding(),
            errorsFontSize        : this.getErrorsFontSize(),
            webRootDirectory      : this.getWebRootDirectory(),
            useCache              : this.isCacheUsed()
        };
    }

    protected createClient(location:string):IClient {
        return new Client(this.createRequest(location));
    }

    protected formatLocationById(id:any):string {
        var location:string   = this.getMeLocation().getLocation(),
            identifier:string = String(id),
            extension:string  = path.extname(location),
            directory:string  = path.dirname(location),
            filename:string   = path.basename(location, extension);
        return path.join(directory, [filename, "-", identifier, extension].join(""));
    }

    private pull(callback:(client:IClient) => void):void {
        var client:IClient;
        if (this._pool.length) {
            client = this._pool.shift();
            setTimeout(():void => {
                if (isFunction(callback)) {
                    callback(client);
                } else {
                    this.push(client);
                }
            }, 0).ref();
        } else if (isFunction(callback)) {
            this._queue.push(callback);
        }
    }

    private push(client:IClient):void {
        var callback:(client:IClient, callback:(client:IClient) => void) => void =
                (client:IClient, callback:(client:IClient) => void):void => {
                    setTimeout(():void => {
                        callback(client);
                    }, 0).ref();
                };
        if (this._clients.indexOf(client) !== -1 &&
            this._pool.indexOf(client) === -1) {
            this._pool.push(client);
        }
        while (this._pool.length && this._queue.length) {
            callback(this._pool.shift(), this._queue.shift());
        }
    }

    public compile(filename:string, callback?:(errors:Error[], result:any) => void):void {
        deferred([
            (next:() => void):void => {
                this.connect((errors:Error[]):void => {
                    if (errors && errors.length) {
                        if (typeof callback === "function") {
                            callback(errors, null);
                        }
                    } else {
                        next();
                    }
                });
            },
            ():void => {
                this.pull((client:IClient):void => {
                    client.compile(filename, (errors:Error[], result:any):void => {
                        this.push(client);
                        if (typeof callback === "function") {
                            callback(errors && errors.length ? errors : null, result || null);
                        }
                    });
                });
            }
        ]);
    }

    public connect(callback:(errors:Error[]) => void):void {
        var errors:Error[] = [],
            actions:((done:() => void) => void)[] = [],
            numberOfProcesses:number = this.getNumberOfProcesses(),
            processNumber:number,
            createAction:(processNumber:number) => ((done:() => void) => void) =
                (processNumber:number):((done:() => void) => void) => {
                    return (done:() => void):void => {
                        var client:IClient = this.createClient(this.formatLocationById(processNumber));
                        client.connect((errs:Error[]):void => {
                            if (!errors || !errors.length) {
                                this._pool.push(client);
                                this._clients.push(client);
                            } else {
                                errors = errors.concat(errs);
                            }
                            done();
                        })
                    };
                };
        if (this._connected) {
            setTimeout(():void => {
                if (typeof callback === "function") {
                    callback(null);
                }
            }, 0).ref();
        } else if (this._connecting) {
            if (typeof callback === "function") {
                this._connectionQueue.push(callback);
            }
        } else {
            this._connecting = true;
            for (processNumber = 0; processNumber < numberOfProcesses; processNumber++) {
                actions.push(createAction(processNumber));
            }
            parallel(actions, ():void => {
                var index:number,
                    length:number = this._connectionQueue.length,
                    element:(errors:Error[]) => void,
                    handler:(element:(errors:Error[]) => void) => void = (element:(errors:Error[]) => void):void => {
                        setTimeout(():void => {
                            if (!errors.length) {
                                element(null);
                            } else {
                                element(errors);
                            }
                        }, 0).ref();
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
                    element = this._connectionQueue.shift();
                    handler(element);
                }
            });
        }
    }

    private _disconnecting:boolean = false;

    private _disconnectionQueue:((errors:Error[]) => void)[] = [];

    public disconnect(callback:(errors:Error[]) => void):void {
        if (this._connected) {

        } else if (this._connecting) {

        } else {
            setTimeout(():void => {
                if (typeof callback === "function") {
                    callback(null);
                }
            }, 0).ref();
        }
    }

}
