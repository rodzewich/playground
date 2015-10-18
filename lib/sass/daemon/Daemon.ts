import DaemonBase = require("../../css/daemon/Daemon");
import IOptions   = require("./IOptions");
import IDaemon    = require("./IDaemon");
import Compiler   = require("../compiler/Compiler");
import ICompiler  = require("../compiler/ICompiler");
import ICompilerOptions = require("../compiler/IOptions");

class Daemon extends DaemonBase implements IDaemon {

    constructor(options:IOptions) {
        super(options);
    }

    protected createCompiler(options:ICompilerOptions):ICompiler {
        return new Compiler(options);
    }

}

export = Daemon;
