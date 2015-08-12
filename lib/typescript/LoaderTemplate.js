(function () {

    var modules = {};
    var config = {};
    var cwd = [];
    var locks = [];

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
            cwd = temp.slice(1, -1);
            return require(module);
            cwd = [];
        }
    }

    function define(module, dependency, callback) {
        if (typeof module !== "string") {
            throw new Error("bal bla bla");
        }
        // todo: check module name by regexp
        // todo: check dependency
        if (modules[module]) {
            throw new Error("Module " + JSON.stringify(module) + " already defined.");
        }
        modules[module] = {
            name       : module,
            dependency : dependency,
            callback   : callback,
            exports    : null
        };
        if (!dependency.length) {
            callback.call(null, modules[module], createRequire(module));
            var name;
            var index;
            var names = Object.keys(modules);
            var length = names.length;
            for (index = 0; index < length; index++) {
                name = names[index];
                var position = modules[name].dependency.indexOf(module);
                if (position === -1) {
                    continue;
                }
                modules[name].dependency.splice(position, 1);
                if (!modules[name].dependency.length) {
                    modules[name].callback.call(null, modules[name], createRequire(name));
                }
            }
        } else {
            length = dependency.length;
            for (index = 0; index < length; index++) {
                load(module);
            }
        }
    }

    if (typeof window !== "undefined") {
        window.define = define;
    } else if (typeof global !== "undefined") {
        global.define = define;
    }

}());
