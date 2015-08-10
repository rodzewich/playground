/// <reference path="../../../core.ts" />
/// <reference path="../builder/IBuilder.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="ITransport.ts" />

module xlib.utils.service.transport {

  import builder = service.builder;

  export class Transport implements ITransport {
    private _builder: builder.IBuilder = null;
    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.builder) !== 'undefined') {
        this.setBuilder(options.builder);
      }
    }
    public getBuilder(): builder.IBuilder {
      if (this._builder === null) {
        throw new Error('bla bla bla');
      }
      return this._builder;
    }
    public setBuilder(value: builder.IBuilder): void {
      if (value === null) {
        this._builder = null;
      } else if (!value) {
        throw new Error('bla bla bla');
      } else {
        this._builder = value || null;
      }
    }
    public load(namespace: string, name: string, params?: any, callback?: (error?: Error[], data?: any) => void): void {
      if (!/^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)$/.test(String(namespace || ''))) {
        throw new Error('bla bla bla');
      }
      if (!/^[a-z][a-zA-Z0-9]*$/.test(String(name || ''))) {
        throw new Error('bla bla bla');
      }
      setTimeout(() => {
        if (xlib.typeOf(callback) === 'function') {
          callback(null, null);
        }
      }, 0);
    }
  }

}