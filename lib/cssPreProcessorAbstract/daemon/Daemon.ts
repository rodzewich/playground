import BaseDaemon = require("../../compiler/daemon/Daemon");
import IOptions = require("./IOptions");
import IDaemon = require("./IDaemon");
import IRequest = require("../client/IRequest");
import IResponse = require("../client/IResponse");
import Compiler = require("../compiler/Compiler");
import ICompiler = require("../compiler/ICompiler");
import ICompilerOptions = require("../compiler/IOptions");
import typeOf = require("../../typeOf");

class Daemon extends BaseDaemon implements IDaemon {

    private _memory:IMemory;

    constructor(options:IOptions) {
        super(options);
    }

    protected setMemory(value:IMemory):void {
        this._memory = value;
    }

    protected getMemory():IMemory {
        return this._memory;
    }

    protected createCompiler(options:ICompilerOptions):ICompiler {
        return new Compiler(options);
    }

    public compile(options:IRequest, callback:(errors:Error[], result:IResponse) => void):void {
        var compiler:ICompiler = this.createCompiler(options);
        compiler.setMemory(this.getMemory());
        compiler.compile((errors:Error[], result:any):void => {
            var temp:Error[],
                data:IResponse;
            if (errors && errors.length) {
                temp = errors;
            } else {
                data = <IResponse>result || null;
            }
            if (typeOf(callback) === "function") {
                callback(temp, data);
            }
        });
    }

}

export = Daemon;
