declare module "postcss-color-rgba-fallback" {

    interface IPlugin {
        (options?:{properties?: string[]}): ((...args:any[]) => any);
    }

    var plugin:IPlugin;

    export = plugin;
}