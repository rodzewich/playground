declare module "postcss" {

    interface IPostcss {
        (plugins:any[]): IPostcss;
        process(source:string, options:any): IPostcss;
        then(callback:(result:any) => void): IPostcss;
        catch(callback:(error?:Error) => void): IPostcss;
    }

    var postcss:IPostcss;

    export = postcss;

}