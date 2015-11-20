import {deferred, isFunction} from "./utils";

export interface ITest {
    run(callback:() => void):void;
}

export abstract class Test implements ITest {

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