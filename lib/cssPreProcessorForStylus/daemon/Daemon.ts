import BaseDaemon = require("../../cssPreProcessorAbstract/daemon/Daemon");
import ICompilerOptions = require("../compiler/IOptions");
import IOptions = require("./IOptions");
import IDaemon = require("./IDaemon");
import Compiler = require("../compiler/Compiler");

class Daemon extends BaseDaemon implements IDaemon {

    constructor(options:IOptions) {
        super(options);
    }

    protected createCompiler(options:ICompilerOptions):ICompiler {
        return new Compiler(options);
    }

}

export = Daemon;
