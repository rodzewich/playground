/// <reference path="../../types/chai/chai.d.ts" />

import {describe, it} from "../../lib/tests";
import {assert} from "chai";


class Test {

    protected setUp():void {

    }

    protected tearDown():void {

    }

    public run(callback):void {

    }

}



assert.typeOf({a: 123, b: {c: {d: [1,2,3]}}}, 'string');
assert.isTrue(1);

for (var prop in assert) {
    console.log(prop + " :", assert[prop]);
}

/*describe("xlib", (done):void => {

    describe("memory", (done):void => {

        it("sdfsdfsdfs", (done):void => {



            done();

        });

        it("sdfsdfs", ():void => {


            done();

        });

        done();

    });

    done();

});*/
