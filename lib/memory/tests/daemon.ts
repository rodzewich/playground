/// <reference path="../../../types/node/node.d.ts" />

import assert = require("assert");
import Exception = require("../../exception/Exception");
import displayException = require("../../displayException");

require("../../mapping");

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});


