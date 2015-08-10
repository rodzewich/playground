/// <reference path="ITransport.ts" />
/// <reference path="../Transport.ts" />

module xlib.utils.service.transport.jsonp {

  export class Transport extends transport.Transport implements ITransport {
    load(service: string, method: string, params?: any, callback?: (error?: Error[], data?: any) => void): void {
    }
  }

}