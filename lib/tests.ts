import {deferred, isFunction, isDefined} from "./utils";
import {IDebugHelper, DebugHelper} from "../lib/helpers/debugHelper";

export interface IOptions {
    debug?:boolean;
}

export interface ITest {
    run(callback:() => void):void;
}

export abstract class Test implements ITest {

    private _debugHelper:IDebugHelper;

    protected createDebugHelper():IDebugHelper {
        return new DebugHelper();
    }

    protected getDebugHelper():IDebugHelper {
        if (!this._debugHelper) {
            this._debugHelper = this.createDebugHelper();
        }
        return this._debugHelper;
    }

    constructor(options?:IOptions) {
        if (options && isDefined(options.debug)) {
            this.setIsDebug(options.debug);
        }
    }

    public get debug():boolean {
        return this.getIsDebug();
    }

    public set debug(value:boolean) {
        this.setIsDebug(value);
    }

    public isDebug():boolean {
        return this.getDebugHelper().isDebug();
    }

    public getIsDebug():boolean {
        return this.getDebugHelper().getIsDebug();
    }

    public setIsDebug(value:boolean):void {
        this.getDebugHelper().setIsDebug(value);
    }

    protected setUp(callback:() => void):void {
        if (isFunction(callback)) {
            callback();
        }
    }

    protected tearDown(callback:() => void):void {
        if (isFunction(callback)) {
            callback();
        }
    }

    public run(callback:() => void):void {
        deferred([
            this.setUp,
            this.tearDown,
            ():void => {
                if (isFunction(callback)) {
                    callback();
                }
            }
        ]);
    }

}