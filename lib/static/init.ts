/// <reference path="../../types/node/node.d.ts" />
/// <reference path="../../types/log4js/log4js.d.ts" />

import IException = require("../exception/IException");
import log4js     = require("../../logger");

var logger:log4js.Logger = log4js.getLogger("client");

function init(callback:(errors?:IException[]) => void):void {

}

export = init;