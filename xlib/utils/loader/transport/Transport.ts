/// <reference path="../../../core.ts" />
/// <reference path="../builder/IBuilder.ts" />
/// <reference path="IOptions.ts" />

module xlib.utils.loader.transport {

  import builder = loader.builder;

  /**
   * Abstract transport class.
   */
  export class Transport {

    private _encoding: string = null;

    private _useCache: boolean = true;

    private _timeout: number = -1;

    private _builder: builder.IBuilder = null;

    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.timeout) !== 'undefined') {
        this.setTimeout(options.timeout);
      }
      if (options && xlib.typeOf(options.encoding) !== 'undefined') {
        this.setEncoding(options.encoding);
      }
      if (options && xlib.typeOf(options.useCache) !== 'undefined') {
        this.setUseCache(options.useCache);
      }
      if (options && xlib.typeOf(options.builder) !== 'undefined') {
        this.setBuilder(options.builder);
      }
    }

    getEncoding(): string {
      return this._encoding || null;
    }

    setEncoding(value: any): void {
      var temp: string = String(value || '').
        replace(/^\s+/, '').
        replace(/\s+$/, '').
        replace(/\s+/, ' ');
      this._encoding = temp || null;
    }

    getUseCache(): boolean {
      return !!this._useCache;
    }

    isUseCache(): boolean {
      return this.getUseCache();
    }

    setUseCache(value: any): void {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(value.replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._useCache = temp;
    }

    getTimeout(): number {
      return this._timeout;
    }

    setTimeout(value: any): void {
      var temp1: string = String(value),
        temp2: number = parseInt(temp1, 10);
      if (!/^(?:-1|\d+)$/.test(temp1)) {
        throw new Error('bla bla bla');
      }
      if (temp2 === -1) {
        this._timeout = -1;
      } else {
        this._timeout = Math.max(0, temp2 || 0);
      }
    }

    getBuilder(): builder.IBuilder {
      if (!this._builder) {
        throw new Error('bla bla bla');
      }
      return this._builder;
    }

    setBuilder(value: builder.IBuilder): void {
      if (!value) {
        throw new Error('bla bla bla');
      }
      this._builder = value;
    }

  }

}