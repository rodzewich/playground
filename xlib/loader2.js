/*jslint */
/*global window, global */

var modules = {};

(function () {

    "use strict";

    var config = {},
        cwd = [],
        locks = [];

    function require(module) {
        if (typeof module !== "string") {
            throw new Error("bal bla bla");
        }
        // todo: check module name by regexp


        var temp1 = cwd.slice(0);
        var temp2 = module.split("/");
        var element;
        while (temp2.length) {
            element = temp2.shift();
            if (element === ".." && temp1.length !== 0) {
                temp1.pop();
            } else if (element === ".." && temp1.length === 0) {
                throw new Error("bla bla bla");
            } else if (element === "") {
                throw new Error("bla bla bla");
            } else if (element !== ".") {
                temp1.push(element);
            }
        }

        if (!modules[temp1.join("/")]) {
            throw new Error("bla bla bla");
        }
        return modules[temp1.join("/")].exports;
    }

    function createRequire(parent) {
        var temp = String(parent).split("/");
        return function (module) {
            var exports;
            cwd = temp.slice(1, -1);
            exports = require(module);
            cwd = [];
            return exports;
        };
    }

    function load(filename) {
        var Transport,
            Builder,
            Module,
            transport,
            builder,
            module;
        if (locks.indexOf(filename) === -1) {
            locks.push(filename);
            Module = require("xlib/utils/module/Module");
            module = new Module();
            if (typeof window !== "undefined") {
                Transport = require(config.transportModule || "xlib/utils/module/transport/browser/Transport");
                Builder   = require(config.builderModule || "xlib/utils/module/builder/browser/Builder");
            } else if (typeof global !== "undefined") {
                Transport = require(config.transportModule || "xlib/utils/module/transport/node/Transport");
                Builder   = require(config.builderModule || "xlib/utils/module/builder/node/Builder");
            }
            transport = new Transport(config.transportOptions || {});
            builder = new Builder(config.builderOptions || {});
            module.setTransport(transport);
            module.setBuilder(builder);
            module.load(filename);
        }
    }

    var defineIndex = 0;

    function define(module, dependency, callback) {
        var names;
        var index;
        var length;

        function call(module) {
            var name;
            var index;
            var position;
            var names;
            var length;
            if (!module.inited) {
                names = Object.keys(modules);
                length = module.dependency.length;
                for (index = 0; index < length; index++) {
                    name = module.dependency[index];
                    position = names.indexOf(name);
                    if (position === -1) {
                        break;
                    }
                    if (!modules[name].dependency.length) {
                        break;
                    }
                    module.dependency.splice(position, 1);
                }
                if (!module.dependency.length && !module.inited) {
                    module.inited = true;
                    //console.log("%d. call: %s", ++defineIndex, module.name);
                    callback.call(null, module, createRequire(module.name));
                }
            }
        }

        if (typeof module !== "string") {
            throw new Error("bal bla bla");
        }
        // todo: check module name by regexp
        // todo: check dependency
        /*if (modules[module]) {
            throw new Error("Module " + JSON.stringify(module) + " already defined.");
        }*/
        console.log("%d. define: %s", ++defineIndex, module);
        modules[module] = {
            name       : module,
            dependency : dependency,
            callback   : callback,
            exports    : {},
            inited     : false
        };

        call(modules[module]);


        names = Object.keys(modules);
        length = names.length;

        for (index = 0; index < length; index++) {
            call(modules[names[index]]);
        }
    }

    if (typeof window !== "undefined") {
        window.define = define;
    } else if (typeof global !== "undefined") {
        global.define = define;
    }

}());
