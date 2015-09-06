declare module "postcss-epub" {

    interface IPlugin {
        (options?:{fonts?: boolean; strip?: boolean; strict?: boolean;}): ((...args:any[]) => any);
    }

    var plugin:IPlugin;

    export = plugin;
}