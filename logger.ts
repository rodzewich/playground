/// <reference path="./types/log4js/log4js.d.ts" />
/// <reference path="./types/node/node.d.ts" />

import log4js = require("log4js");
import path = require("path");

log4js.configure(path.join(__dirname, "configs/logger.json"));

export = log4js;