import {isFunction} from "../utils/common";

export interface IHandlersRegistrationHelper {
    register(callback:any):string;
    clear():void;
    find(id:string):any;
}

export class HandlersRegistrationHelper implements IHandlersRegistrationHelper {

    private _handlers:{[index:string]:Function} = {};

    private _increments:number[] = [0];

    public register(callback:Function):string {
        var index:number,
            length:number,
            result:string;
        this._increments[0]++;
        length = this._increments.length;
        for (index = 0; index < length; index++) {
            if (this._increments[index] <= 0xffffffff) {
                break;
            }
            this._increments[index] = 0;
            if (!this._increments[index + 1]) {
                this._increments[index + 1] = 0;
            }
            this._increments[index + 1]++;
        }
        result = this._increments.map((item:number):string => {
            return item.toString(16);
        }).join("");
        if (isFunction(callback)) {
            this._handlers[result] = callback;
        }
        return result;
    }

    public clear():void {
        this._handlers = {};
    }

    public find(id:string):Function {
        var handler:Function = this._handlers[id] || null;
        delete this._handlers[id];
        return handler;
    }

}
