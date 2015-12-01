import {isDefined} from "../utils";

export interface IProtocolHelper {
    getProtocol():string;
    setProtocol(protocol:string):void;
}

export class ProtocolHelper implements IProtocolHelper {
    private _protocol:string = "http";
    constructor(protocol?:string) {
        if (isDefined(protocol)) {
            this.setProtocol(protocol);
        }
    }
    public getProtocol():string {
        return this._protocol;
    }
    public setProtocol(protocol:string):void {
        this._protocol = protocol;
    }
}
