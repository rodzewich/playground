/*jslint */
/*global module */

"use strict";

function parallel(actions:((done:() => void) => void)[], complete:() => void) {
    var index:number,
        temp,
        length: number,
        type:string = Object.prototype.toString.call(actions),
        count1:number = 0,
        count2:number = 0;

    function callComplete() {
        if (typeof complete === "function") {
            complete();
        }
    }

    function callback() {
        count2 += 1;
        if (count1 === count2) {
            callComplete();
        }
    }

    function call(func) {
        count1 += 1;
        setTimeout(function () {
            func(callback);
        }, 0).ref();
    }

    if (type.length === 14 && type.substr(8, 5).toLowerCase() === "array") {

        temp   = actions.splice(0);
        length = temp.length;

        for (index = 0; index < length; index++) {
            if (typeof temp[index] === "function") {
                call(temp[index]);
            }
        }

    }

    if (count1 === count2) {
        callComplete();
    }
}

export = parallel;