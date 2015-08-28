/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/source-map-support/source-map-support.d.ts" />

import fs = require("fs");
import mappingSupport = require('source-map-support');

mappingSupport.install({
    handleUncaughtExceptions: true,
    retrieveSourceMap : function (source) {
        if (fs.existsSync(source + ".map")) {
            return {
                url : source,
                map : fs.readFileSync(source + ".map", 'utf8')
            };
        }
        return null;
    }
});
