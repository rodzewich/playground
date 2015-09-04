import typeOf = require("../../../../typeOf");
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import pixrem = require("pixrem");

// @see https://github.com/robwierzbowski/node-pixrem
class Plugin extends PluginBase implements IPlugin {

    public getInstance():any {
        return pixrem({
            replace: false,
            atrules: false,
            html: true,
            browsers: 'ie <= 8'
        });
    }

}

export = Plugin;
