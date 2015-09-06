declare module "pixrem" {

    interface IPlugin {
        (rootFontSize:string, options?:{replace?: boolean; atrules?: boolean; html?: boolean; browsers?: string[]}): ((...args:any[]) => any);
    }

    var plugin:IPlugin;

    export = plugin;

}