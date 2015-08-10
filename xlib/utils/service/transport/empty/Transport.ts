/// <reference path="../../../../core.ts" />
/// <reference path="../Transport.ts" />
/// <reference path="ITransport.ts" />
/// <reference path="IOptions.ts" />

module xlib.utils.service.transport.empty {

  export class Transport extends transport.Transport implements ITransport {

    constructor(options?: IOptions) {
      super(options);
    }

    load(service: string, method: string, params?: any, callback?: (error?: Error[], data?: any) => void): void {
      setTimeout(() => {
        if (xlib.typeOf(callback) === 'function') {
          callback(null, null);
        }
      }, 0);
    }
  }

}