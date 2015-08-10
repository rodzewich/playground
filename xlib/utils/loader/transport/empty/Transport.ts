/// <reference path="../../../../core.ts" />
/// <reference path="../Transport.ts" />
/// <reference path="ITransport.ts" />

module xlib.utils.loader.transport.empty {

  export class Transport extends transport.Transport implements ITransport {

    load(filename: string, callback?: (error?: Error) => void): void {
      setTimeout(() => {
        if (xlib.typeOf(callback) === 'function') {
          callback();
        }
      }, 0);
    }

  }

  export function create(): ITransport {
    return new Transport();
  }

}