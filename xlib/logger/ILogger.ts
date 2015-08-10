module logger {

  export interface ILogger {

    error(message:string, ...params:any[]): void;

    debug(message:string, ...params:any[]): void;

    fatal(message:string, ...params:any[]): void;

    info(message:string, ...params:any[]): void;

    trace(message:string, ...params:any[]): void;

    warning(message:string, ...params:any[]): void;

    notice(message:string, ...params:any[]): void;

  }

}