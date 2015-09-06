declare module "postcss-vmin" {

    interface IPlugin {
        (...args:any[]): any;
    }

    var plugin:IPlugin;

    export = plugin;
}