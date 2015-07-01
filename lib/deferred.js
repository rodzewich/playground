/*jslint */
/*global module */

"use strict";

function deferred(actions) {
    var temp = actions.splice(0);
    function iterate() {
        setTimeout(function () {
            var action = temp.shift();
            if (typeof action === "function") {
                action(iterate);
            }
        }, 0).ref();
    }
    iterate();
}

module.exports = deferred;