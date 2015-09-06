declare module "postcss-will-change" {

    interface IPlugin {
        (...args:any[]): any;
    }

    var plugin:IPlugin;

    export = plugin;
}