/*jslint */
/*global module */

var fs       = require("fs"),
    path     = require("path"),
    spawn    = require("child_process").spawn,
    deferred = require("./deferred"),
    cache    = {
        sources : {},
        results : {},
        maps    : {}
    };


var ts = require("../typescript");

function compile(fileNames, options) {
    var program = ts.createProgram(fileNames, options),
        emitResult = program.emit(),
        allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach(function (diagnostic) {
        if (diagnostic.file) {
            var temp = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start),
                line = temp.line,
                character = temp.character,
                message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            console.log(["(", diagnostic.file.fileName, ", ", line + 1, ":", character + 1, "): ", message].join(""));
        } else {

            console.log([diagnostic.messageText, "(code:", diagnostic.code, " category:", diagnostic.category, ")"].join(""));
        }
    });

    var exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log("Process exiting with code '" + exitCode + "'.");
    process.exit(exitCode);
}

compile(['./public/index2.ts'], {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
});


function compileTypescript (options, callback) {
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

module.exports = compileTypescript;