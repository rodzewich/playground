/*jslint */
/*global module */

var fs       = require("fs"),
    ts       = require("../typescript"),
    path     = require("path"),
    spawn    = require("child_process").spawn,
    deferred = require("./deferred"),
    EventEmitter = require('events').EventEmitter;

var locks = {};
var cache = {};

function getReferences(filename, content) {
    var dirname = path.dirname(filename);
    return ts.preProcessFile(content, false).referencedFiles.map(function (item) {
        return path.resolve(dirname, path.join(path.dirname(item.fileName), path.basename(item.fileName, path.extname(item.fileName)) + ".js"));
    });
}

function readFile(filename, callback) {
    if (!locks[filename]) {
        locks[filename] = new EventEmitter();
        fs.readFile(filename, function (error, buffer) {
            if (!error) {

            } else {
                callback(error);
            }
            locks[filename].emit("complete");
            delete locks[filename];
        });
    } else {
        locks[filename].addListener("complete", function () {
            readFile(filename, callback);
        });
    }
}

function typescriptCompile (options, callback) {
    var basedir     = options.basename,
        script      = options.script,
        typescript  = path.join(basedir, script + ".ts"),
        sourcemap   = path.join(basedir, script + ".js.map"),
        javascript  = path.join(basedir, script + ".js"),
        result      = {};
    deferred([
        function () {
            callback(null, result);
        }
    ]);
}

module.exports = typescriptCompile;