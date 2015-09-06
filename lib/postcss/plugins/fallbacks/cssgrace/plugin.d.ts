declare module "cssgrace" {

    interface IPlugin {
        (...args:any[]): any;
    }

    var plugin:IPlugin;

    export = plugin;
}