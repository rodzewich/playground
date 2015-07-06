/*jslint */
/*global module */

console.debug = console.log;
console.info = console.log;

module.exports = {
    getLogger: function (name) {
        return console;
    }
};
