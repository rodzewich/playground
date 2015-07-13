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

function diagnostic(fileNames, options) {
    var program = ts.createProgram(fileNames, options)/*,
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
    process.exit(exitCode)*/;

    var errors = [];

    function calculateErrors(diagnostics) {
        diagnostics.forEach(function (diagnostic) {
            if (diagnostic.file) {
                var temp = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start),
                    line = temp.line,
                    character = temp.character,
                    message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                errors.push(new Error(message));
                //console.log(["(", diagnostic.file.fileName, ", ", line + 1, ":", character + 1, "): ", message].join(""));
            } else {
                errors.push(new Error(diagnostic.messageText));
                //console.log([diagnostic.messageText, "(code:", diagnostic.code, " category:", diagnostic.category, ")"].join(""));
            }
        });
    }

    calculateErrors(program.getSemanticDiagnostics());
    calculateErrors(program.getSyntacticDiagnostics());
    calculateErrors(program.getOptionsDiagnostics());
    calculateErrors(program.getGlobalDiagnostics());
    calculateErrors(program.getGlobalDiagnostics());
    calculateErrors(program.getDeclarationDiagnostics());

    if (errors.length) {
        console.log(errors);
    } else {
        console.log(program);
    }

    console.log("alert (123);", {
        out: "index.js"
    }, fileNames[0], null, null);
    console.log(ts.transpile("alert (123);", options, fileNames[0], [], null));


}

ts.sys = (function (sys) {

    return {
        args: sys.args,
        newLine: sys.newLine,
        useCaseSensitiveFileNames: sys.useCaseSensitiveFileNames,
        write: function () {
            var ret = sys.write.apply(this, arguments);
            console.log("sys.write: arguments =", arguments, " return =", ret);
            return ret;
        },
        readFile: function () {
            var ret = sys.readFile.apply(this, arguments);
            console.log("sys.readFile: arguments =", arguments, "return = [Binary]");
            return ret;
        },
        writeFile: function () {
            console.log("sys.writeFile: arguments =", arguments);
            return sys.writeFile.apply(this, arguments);
        },
        watchFile: function () { // todo: ???
            console.log("sys.watchFile: arguments =", arguments);
            return sys.watchFile.apply(this, arguments);
        },
        resolvePath: function () {
            console.log("sys.resolvePath: arguments =", arguments);
            return sys.resolvePath.apply(this, arguments);
        },
        fileExists: function () {
            console.log("sys.fileExists: arguments =", arguments);
            return sys.fileExists.apply(this, arguments);
        },
        directoryExists: function () {
            console.log("sys.directoryExists: arguments =", arguments);
            return sys.directoryExists.apply(this, arguments);
        },
        createDirectory: function () {
            console.log("sys.createDirectory: arguments =", arguments);
            return sys.createDirectory.apply(this, arguments);
        },
        getExecutingFilePath: function () {
            console.log("sys.getExecutingFilePath: arguments =", arguments);
            return sys.getExecutingFilePath.apply(this, arguments);
        },
        getCurrentDirectory: function () {
            var ret = sys.getCurrentDirectory.apply(this, arguments);
            console.log("sys.getCurrentDirectory: arguments =", arguments, "return =", ret);
            return ret;
        },
        readDirectory: function () {
            var ret = sys.readDirectory.apply(this, arguments);
            console.log("sys.readDirectory: arguments =", arguments, "return =", ret);
            return ret;
        },
        getMemoryUsage: function () {
            var ret = sys.getMemoryUsage.apply(this, arguments);
            console.log("sys.getMemoryUsage: arguments =", arguments, "return =", ret);
            return ret;
        },
        exit: function () {
            var ret = sys.exit.apply(this, arguments);
            console.log("sys.exit: arguments =", arguments, "return =", ret);
            return ret;
        }
    }

}(ts.sys));

diagnostic(['./public/index2.ts'], {
    noEmitOnError : true,
    noImplicitAny : true,
    sourceMap : true,
    target        : ts.ScriptTarget.ES3,
    module        : ts.ModuleKind.AMD
});


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