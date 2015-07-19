(function () {

    var __extends = (this && this.__extends) || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
            switch (arguments.length) {
                case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
                case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
                case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
            }
        };

    var __metadata = (this && this.__metadata) || function (k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };

    var __param = (this && this.__param) || function (paramIndex, decorator) {
            return function (target, key) { decorator(target, key, paramIndex); }
        };

    var scripts = [];
    var callbacks = [];
    var loaded = [];
    var exports = {};

    function check() {
        var index1;
        var length1 = callbacks.length;
        var callback;
        var dependencies;
        var index2;
        var length2;
        var result;
        for (index1 = 0; index1 < length1; index1++) {
            callback     = callbacks[index1].callback;
            dependencies = callbacks[index1].dependencies;
            length2 = dependencies.length;
            result = true;
            for (index2 = 0; index2 < length2; index2++) {
                result = result && loaded.indexOf(dependencies[index2]) !== -1;
                if (!result) {
                    break;
                }
            }
            if (result) {
                callbacks.splice(index1, 1);
                callback({}, require, __extends, __decorate, __metadata, __param);
            }
        }
    }

    function registry(dependencies, callback) {
        callbacks.push({
            callback     : callback,
            dependencies : dependencies
        });
    }

    function require(module) {
        return exports[module];
    }

    function loader(dependencies, callback) {
        var index, script, length, count = 0;
        if (dependencies && dependencies.length) {
            length = dependencies.length;
            for (index = 0; index < length; index++) {
                if (scripts.indexOf(dependencies[index]) === -1) {
                    script = document.createElement("script");
                    script.setAttribute("src", "/" + dependencies[index] + ".js");
                    document.head.appendChild(script);
                    scripts.push(dependencies[index]);
                    count++;
                }
            }
        }
        if (!count) {
            callback({}, require, __extends, __decorate, __metadata, __param);
        } else {
            registry(dependencies, callback);
            check();
        }
    }

    function adding(name, options) {
        debugger;
        if (loaded.indexOf(options.module) === -1) {
            loaded.push(options.module);
            exports[options.module] = options.exports;
            check();
        }
    }

    window.xlib={utils:{require:{scripts:{load:loader,fireListeners:adding}}}};


}).call({});
