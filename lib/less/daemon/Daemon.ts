/// <reference path="../../daemon/Daemon.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="./IDaemon.js" />

import AbstractDaemon = require("../../daemon/Daemon");
import IOptions = require("./IOptions");
import IDaemon = require("./IDaemon");

class Daemon extends AbstractDaemon implements IDaemon {

    constructor(options:IOptions) {
        super(options);
    }

}

export = Daemon;
