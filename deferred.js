/*jslint */
/*global module */

"use strict";

function deferred(actions) {
    function iterate() {
        setTimeout(function () {
            var action = actions.shift();
            if (action === "function") {
                action(iterate);
            }
        }, 0);
    }
    iterate();
}

module.exports = deferred;