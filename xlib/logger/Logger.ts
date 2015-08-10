/// <reference path="./../../declares.ts" />
/// <reference path="./../utils/core.ts" />
/// <reference path="./ILogger.ts" />

module logger {

  class Logger implements ILogger {

    debug(message: string, ...params: any[]): void {
      params.unshift(message);
      if (global.console && xlib.typeOf(console.debug) === 'function') {
        console.debug.apply(console, params);
      }
    }

    error(message: string, ...params: any[]): void {
      params.unshift(message);
      if (global.console && xlib.typeOf(console.error) === 'function') {
        console.error.apply(console, params);
      }
    }

    fatal(message: string, ...params: any[]): void {
      params.unshift(message);
      if (global.console && xlib.typeOf(console.error) === 'function') {
        console.error.apply(console, params);
      }
    }

    info(message: string, ...params: any[]): void {
      params.unshift(message);
      if (global.console && xlib.typeOf(console.info) === 'function') {
        console.info.apply(console, params);
      }
    }

    trace(message: string, ...params: any[]): void {
      params.unshift(message);
      if (global.console && xlib.typeOf(console.trace) === 'function') {
        console.trace.apply(console, params);
      }
    }

    warning(message: string, ...params: any[]): void {
      params.unshift(message);
      if (global.console && xlib.typeOf(console.warn) === 'function') {
        console.warn.apply(console, params);
      }
    }

    notice(message: string, ...params: any[]): void {
      params.unshift(message);
      if (global.console && xlib.typeOf(console.log) === 'function') {
        console.log.apply(console, params);
      }
    }

  }

  var instance: ILogger = new Logger();

  export function configure(config: any): void {}

  export function getLogger(name: string): ILogger {
    return instance;
  }

  export function getRootLogger(): ILogger {
    return instance;
  }

  global.logger = logger;

}
