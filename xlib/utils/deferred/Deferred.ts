/// <reference path="../../core.ts" />
/// <reference path="./IDeferred.ts" />
/// <reference path="./IAction.ts" />

import core = require("../../core");
import IDeferred = require("./IDeferred");
import IAction = require("./IAction");

class Deferred implements IDeferred {

    private actions:IAction[][] = [];

    private locked:boolean = false;

    add(...actions:IAction[]):IDeferred {
        var index:number,
            action:IAction,
            length:number = actions.length,
            elements:IAction[] = [];
        if (this.locked) {
            throw new TypeError('bla bla bla');
        }
        if (length === 0) {
            throw new TypeError('bla bla bla');
        }
        for (index = 0; index < length; index++) {
            action = <IAction>actions[index];
            if (core.typeOf(action) !== 'function') {
                throw new TypeError('bla bla bla');
            }
            elements.push(action);
        }
        this.actions.push(elements);
        return this;
    }

    run(complete?:(errors:Error[]) => void): void {
        var errors:Error[] = [],
            completed:boolean = false,
            pushErrors:(message:any) => void = (message:any) => {
                var index:number,
                    length:number;
                if (core.typeOf(message) === 'error') {
                    errors.push(<Error>message);
                } else if (core.typeOf(message) === 'array') {
                    length = message.length;
                    for (index = 0; index < length; index++) {
                        if (core.typeOf(message[index]) === 'error') {
                            errors.push(<Error>message[index]);
                        } else {
                            errors.push(new Error(String(message[index] || 'undefined')));
                        }
                    }
                } else {
                    errors.push(new Error(String(message || 'undefined')));
                }
            },
            next:() => void = () => {
                var run:(action:(success:() => void, error:(message:any) => void, complete:() => void) => void) => void =
                        (action:(success:() => void, error:(message:any) => void, complete:() => void) => void) => {
                            setTimeout(() => {
                                var executed:boolean = false,
                                    successCallback = ():void => {
                                        if (!executed) {
                                            executed = true;
                                            increment++;
                                            if (increment === length && !errors.length) {
                                                next();
                                            } else if (increment === length && (errors.length || completed)) {
                                                this.actions = [];
                                                this.locked = false;
                                                if (core.typeOf(complete) === 'function') {
                                                    complete(errors);
                                                }
                                            }
                                        } else {
                                            this.actions = [];
                                            this.locked = false;
                                            errors.push(new Error('bla bla bla'));
                                            if (core.typeOf(complete) === 'function') {
                                                complete(errors);
                                            }
                                        }
                                    },
                                    errorCallback = (message:any):void => {
                                        if (!executed) {
                                            executed = true;
                                            increment++;
                                            pushErrors(message);
                                            if (increment === length) {
                                                this.actions = [];
                                                this.locked = false;
                                                if (core.typeOf(complete) === 'function') {
                                                    complete(errors);
                                                }
                                            }
                                        } else {
                                            this.actions = [];
                                            this.locked = false;
                                            errors.push(new Error('bla bla bla'));
                                            if (core.typeOf(complete) === 'function') {
                                                complete(errors);
                                            }
                                        }
                                    },
                                    completeCallback = ():void => {
                                        if (!executed) {
                                            executed = true;
                                            completed = true;
                                            if (increment === length) {
                                                this.actions = [];
                                                this.locked = false;
                                                if (core.typeOf(complete) === 'function') {
                                                    complete(errors);
                                                }
                                            }
                                        } else {
                                            this.actions = [];
                                            this.locked = false;
                                            errors.push(new Error('bla bla bla'));
                                            if (core.typeOf(complete) === 'function') {
                                                complete(errors);
                                            }
                                        }
                                    };
                                action(successCallback, errorCallback, completeCallback);
                            }, 0);
                        },
                    increment:number = 0,
                    actions:any[],
                    length:number,
                    index:number;
                if (this.actions.length) {
                    actions = this.actions.shift();
                    length = actions.length;
                    for (index = 0; index < length; index++) {
                        run(<(success:() => void, error:(message:any) => void, complete:() => void) => void>actions[index]);
                    }
                } else {
                    if (core.typeOf(complete) === 'function') {
                        complete(errors);
                    }
                    this.locked = false;
                }
            };
        if (this.locked) {
            throw new TypeError('bla bla bla');
        }
        this.locked = true;
        next();
    }

}

export = Deferred;