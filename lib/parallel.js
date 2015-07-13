/*jslint */
/*global module */

"use strict";

function parallel(actions, complete) {
    var index,
        temp = actions.splice(0),
        length = temp.length,
        count1 = 0,
        count2 = 0;
    function callback() {
        count2 += 1;
        if (count1 === count2 && typeof complete === "function") {
            complete();
        }
    }
    function call(func) {
        count1 += 1;
        setTimeout(function () {
            func(callback);
        }, 0).ref();    }
    for (index = 0; index < length; index++) {
        if (typeof temp[index] === "function") {
            call(temp[index]);
        }
    }
}

module.exports = parallel;