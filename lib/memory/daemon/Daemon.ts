/// <reference path="../../daemon/Daemon.ts" />
/// <reference path="./IDaemon.ts" />

import AbstractDaemon = require("../../daemon/Daemon");
import IDaemon = require("./IDaemon");

class Daemon extends AbstractDaemon implements IDaemon {

    protected requestHandler(request:any, callback:(response:any) => void):void {
        super.requestHandler(request, (response: any) => {

        });
    }

}

export = Daemon;
