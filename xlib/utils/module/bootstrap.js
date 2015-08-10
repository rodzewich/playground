(function () {
    "use strict";

    var Module           = "<%= module/Module %>";
    var Builder          = "<%= module/builder/Builder %>";
    var NodeBuilder      = "<%= module/builder/node/Builder %>";
    var BrowserBuilder   = "<%= module/builder/browser/Builder %>";
    var Loader           = "<%= module/loader/Loader %>";
    var Transport        = "<%= module/transport/Transport %>";
    var NodeTransport    = "<%= module/transport/node/Transport %>";
    var BrowserTransport = "<%= module/transport/browser/Transport %>";
    var module           = new Module();
    var loader           = new Loader();
    var builder;
    var transport;

    function loadTypescript(module, dependency, callback) {
        module.load(module, dependency, callback);
    }

    function callbackTypescript() {

    }

    module.register("module/Module", Module);
    module.register("module/IModule", {});
    module.register("module/builder/IOptions", {});
    module.register("module/builder/IBuilder", {});
    module.register("module/builder/Builder", Builder);
    module.register("module/builder/node/IOptions", {});
    module.register("module/builder/node/IBuilder", {});
    module.register("module/builder/node/Builder", NodeBuilder);
    module.register("module/builder/browser/IOptions", {});
    module.register("module/builder/browser/IBuilder", {});
    module.register("module/builder/browser/Builder", BrowserBuilder);
    module.register("module/loader/ILoader", {});
    module.register("module/loader/Loader", Loader);
    module.register("module/transport/IOptions", {});
    module.register("module/transport/ITransport", {});
    module.register("module/transport/Transport", Transport);
    module.register("module/transport/node/IOptions", {});
    module.register("module/transport/node/ITransport", {});
    module.register("module/transport/node/Transport", NodeTransport);
    module.register("module/transport/browser/IOptions", {});
    module.register("module/transport/browser/ITransport", {});
    module.register("module/transport/browser/Transport", BrowserTransport);

    if (typeof window !== "undefined") {
        builder   = new BrowserBuilder();
        transport = new BrowserTransport();
        window.loadTypescript     = loadTypescript;
        window.callbackTypescript = callbackTypescript;
    } else {
        builder = new NodeBuilder();
        transport = new NodeTransport();
    }

    loader.setBuilder(builder);
    loader.setTransport(transport);
    module.setLoader(loader);

    module.load("application/Bootstrap", [], function (exports) {
        var bootstrap = new exports.Bootstrap();
        bootstrap.initialization();
    });

}());