/// <reference path="../types/chai/chai.d.ts" />

import path = require("path");
import {isFunction} from "../lib/utils";
import {IOptions, IClient, Client} from "../lib/client";
import {ITest as ITestBase, Test as TestBase} from "../lib/tests";
import {Exception} from "../lib/exception";
import {TimeoutHelper} from "../lib/helpers/timeoutHelper";
import {assert} from "chai";

export interface ITest extends ITestBase {

}

export abstract class Test extends TestBase implements ITest {

    public createClientInstance(options?:IOptions):IClient {
        return new Client(options);
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

        var client:IClient = this.createClientInstance();

        assert.strictEqual(client.location, null);
        assert.strictEqual(client.getLocation(), null);
        assert.strictEqual(client.timeout, TimeoutHelper.DEFAULT);
        assert.strictEqual(client.getTimeout(), TimeoutHelper.DEFAULT);
        assert.strictEqual(client.debug, false);
        assert.strictEqual(client.isDebug(), false);
        assert.strictEqual(client.getIsDebug(), false);

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

    public testSetupOptionsViaSetters(callback:() => void):void {

    }


    public run():void {
        this.testSetupOptionsViaConstructor();
    }

}