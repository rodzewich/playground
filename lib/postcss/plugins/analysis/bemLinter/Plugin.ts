import typeOf = require("../../../../typeOf");
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import postcssBemLinter = require("postcss-bem-linter");
import doiuse = require("doiuse");
import browserslist = require("browserslist");

class Plugin extends PluginBase implements IPlugin {

    public getPattern(): string {
        return "pattern";
    }

    public getInstance():any {
        return doiuse({browsers: browserslist.defaults});
    }

}

export = Plugin;
