import {isDefined} from "../utils/common";

export interface IPortHelper {
    getPort():number;
    setPort(port:number):void;
}

export class PortHelper implements IPortHelper {
    private _port:number;
    constructor(port?:number) {
        if (isDefined(port)) {
            this.setPort(port);
        }
    }
    public getPort():number {
        return this._port;
    }
    public setPort(port:number):void {
        this._port = port;
    }
}
