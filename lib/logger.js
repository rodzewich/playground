/*jslint */
/*global module */

console.debug = console.log;

module.exports = {
    getLogger: function (name) {
        return console;
    }
};
