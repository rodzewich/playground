declare module "postcss5-opacity" {

    interface IPlugin {
        (...args:any[]): any;
    }

    var plugin:IPlugin;

    export = plugin;
}