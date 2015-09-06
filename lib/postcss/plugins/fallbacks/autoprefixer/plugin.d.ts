declare module "autoprefixer" {

    interface IPlugin {
        (options?:{add?: boolean; remove?: boolean; cascade?: boolean; browsers?: string[]}): ((...args:any[]) => any);
    }

    var plugin:IPlugin;

    export = plugin;

}