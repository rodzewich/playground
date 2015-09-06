declare module "postcss-pseudoelements" {

    interface IPlugin {
        (options?:{selectors?: string[]}): ((...args:any[]) => any);
    }

    var plugin:IPlugin;

    export = plugin;
}