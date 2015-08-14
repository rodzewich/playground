/// <reference path="../daemon/IDaemon.ts" />
/// <reference path="../daemon/Daemon.ts" />
/// <reference path="../node.d.ts" />
/// <reference path="../optimist.d.ts" />

import IDaemon = require("./daemon/IDaemon");
import Daemon = require("./daemon/Daemon");
import optimist = require("optimist");

var argv = require('optimist').
    usage('Usage: $0 -x [num] -y [num]').
    demand(['x', 'y']).
    argv;

if (process.argv.length !== 3) {
    throw new Error("bla bla bla");
}

var daemon:IDaemon = new Daemon({
    location: process.argv[2]
});

// todo: using optimist module
// https://www.npmjs.com/package/optimist
/*
nginx version: nginx/1.6.2 (Ubuntu)
Usage: nginx [-?hvVtq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
-?,-h         : this help
-v            : show version and exit
-V            : show version and configure options then exit
-t            : test configuration and exit
-q            : suppress non-error messages during configuration testing
-s signal     : send signal to a master process: stop, quit, reopen, reload
-p prefix     : set prefix path (default: /usr/share/nginx/)
-c filename   : set configuration file (default: /etc/nginx/nginx.conf)
-g directives : set global directives out of configuration file
*/

daemon.start((error:Error):void => {
    // todo: log info
});
