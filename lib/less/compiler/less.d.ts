declare module "less" {
    export interface Options {
        paths: string[];
        filename: string;
        compress: boolean;
        sourceMap: boolean;
        lint: boolean;
    }
    export interface Result {
        css: string;
        map: string;
        imports: string[];
    }
    export function render(content:string, options:any, callback:(error:Error, result:Result) => void):void;
}
