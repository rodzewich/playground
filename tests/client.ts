/// <reference path="../types/chai/chai.d.ts" />

import path = require("path");
import {isFunction, deferred} from "../lib/utils";
import {IOptions, IClient, Client} from "../lib/client";
import {ITest as ITestBase, Test as TestBase} from "../lib/tests";
import {Exception} from "../lib/exception";
import {TimeoutHelper} from "../lib/helpers/timeoutHelper";
import {assert} from "chai";

export interface ITest extends ITestBase {
    createClientInstance(options?:IOptions):IClient;
    testDefaultValues(callback:() => void):void;
    testThrowsViaConstructor(callback:() => void):void;
    testThrowsViaSetters(callback:() => void):void;
    testSetupOptionsViaConstructor(callback:() => void):void;
    testSetupOptionsViaSetters(callback:() => void):void;
}

export abstract class Test extends TestBase implements ITest {

    abstract createClientInstance(options?:IOptions):IClient;

    public testDefaultValues(callback:() => void):void {

        var client:IClient = this.createClientInstance();
        assert.strictEqual(client.location, null);
        assert.strictEqual(client.getLocation(), null);
        assert.strictEqual(client.timeout, TimeoutHelper.DEFAULT);
        assert.strictEqual(client.getTimeout(), TimeoutHelper.DEFAULT);
        assert.strictEqual(client.debug, false);
        assert.strictEqual(client.isDebug(), false);
        assert.strictEqual(client.getIsDebug(), false);

        if (isFunction(callback)) {
            callback();
        }

    }

    public testThrowsViaConstructor(callback:() => void):void {

        assert.throw(():void => {
            this.createClientInstance({
                location : "../relative/path"
            });
        }, Exception, "location should be a absolute path");

        assert.throw(():void => {
            this.createClientInstance({
                timeout : null
            });
        }, Exception, "timeout must be a number");

        assert.throw(():void => {
            this.createClientInstance({
                timeout : -1
            });
        }, Exception, "timeout must be not less minimum value");

        if (isFunction(callback)) {
            callback();
        }

    }

    public testThrowsViaSetters(callback:() => void):void {

        assert.throw(():void => {
            var client:IClient = this.createClientInstance();
            client.setLocation("../relative/path");
        }, Exception, "location should be a absolute path");

        assert.throw(():void => {
            var client:IClient = this.createClientInstance();
            client.setTimeout(null);
        }, Exception, "timeout must be a number");

        assert.throw(():void => {
            var client:IClient = this.createClientInstance();
            client.setTimeout(-1);
        }, Exception, "timeout must be not less minimum value");

        if (isFunction(callback)) {
            callback();
        }

    }

    public testSetupOptionsViaConstructor(callback:() => void):void {

        var test:(location:string, timeout:number, debug:boolean) => void =
                (location:string, timeout:number, debug:boolean):void => {

                    var client:IClient = this.createClientInstance({
                        location : location,
                        timeout  : timeout,
                        debug    : debug
                    });

                    assert.strictEqual(client.location, location);
                    assert.strictEqual(client.getLocation(), location);
                    assert.strictEqual(client.timeout, timeout);
                    assert.strictEqual(client.getTimeout(), timeout);
                    assert.strictEqual(client.debug, debug);
                    assert.strictEqual(client.isDebug(), debug);
                    assert.strictEqual(client.getIsDebug(), debug);

                };

        test("/path/location1", 123, false);
        test("/path/location2", 124, true);

        if (isFunction(callback)) {
            callback();
        }

    }

    public testSetupOptionsViaSetters(callback:() => void):void {

        var test:(location:string, timeout:number, debug:boolean) => void =
                (location:string, timeout:number, debug:boolean):void => {

                    var client1:IClient = this.createClientInstance();
                    var client2:IClient = this.createClientInstance();

                    client1.setLocation(location);
                    client1.setTimeout(timeout);
                    client1.setIsDebug(debug);

                    client2.location = location;
                    client2.timeout = timeout;
                    client2.debug = debug;

                    assert.strictEqual(client1.location, location);
                    assert.strictEqual(client1.getLocation(), location);
                    assert.strictEqual(client1.timeout, timeout);
                    assert.strictEqual(client1.getTimeout(), timeout);
                    assert.strictEqual(client1.debug, debug);
                    assert.strictEqual(client1.isDebug(), debug);
                    assert.strictEqual(client1.getIsDebug(), debug);

                    assert.strictEqual(client2.location, location);
                    assert.strictEqual(client2.getLocation(), location);
                    assert.strictEqual(client2.timeout, timeout);
                    assert.strictEqual(client2.getTimeout(), timeout);
                    assert.strictEqual(client2.debug, debug);
                    assert.strictEqual(client2.isDebug(), debug);
                    assert.strictEqual(client2.getIsDebug(), debug);

                };

        test("/path/location1", 123, false);
        test("/path/location2", 124, true);


        if (isFunction(callback)) {
            callback();
        }

    }


    public run(callback:() => void):void {
        deferred([
            (next:() => void):void => {
                this.testDefaultValues(next);
            },
            (next:() => void):void => {
                this.testSetupOptionsViaConstructor(next);
            },
            (next:() => void):void => {
                this.testSetupOptionsViaSetters(next);
            },
            (next:() => void):void => {
                this.testThrowsViaConstructor(next);
            },
            (next:() => void):void => {
                this.testThrowsViaSetters(next);
            },
            ():void => {
                if (isFunction(callback)) {
                    callback();
                }
            }
        ]);
    }

}