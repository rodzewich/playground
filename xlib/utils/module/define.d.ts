interface Window {
    define: (module:string, dependency:string[], exports:any) => void;
}

declare var window:Window;

declare module NodeJS {
    interface Global {
        define: (module:string, dependency:string[], exports:any) => void;
    }
}

declare var global:NodeJS.Global;
