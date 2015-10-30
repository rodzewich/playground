import IOptions   = require("./IOptions");
import IException = require("../lib/exception/IException");
import error      = require("./error");

function render(options:IOptions, errors?:IException[]):string {
    return error(500, options, errors);
}

export = render;
