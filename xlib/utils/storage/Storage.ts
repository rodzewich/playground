/// <reference path="../../core.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="IStorage.ts" />

module xlib.utils.storage {

  export class Storage implements IStorage {

    private _namespace: string = null;

    private _revision: string = null;

    private _expire: number = null;

    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.expire) !== 'undefined') {
        this.setExpire(options.expire);
      }
      if (options && xlib.typeOf(options.namespace) !== 'undefined') {
        this.setNamespace(options.namespace);
      }
      if (options && xlib.typeOf(options.revision) !== 'undefined') {
        this.setRevision(options.revision);
      }
    }

    public getNamespace(): string {
      return this._namespace || null;
    }

    public setNamespace(value: string): void {
      var temp: string = String(value || '');
      if (value === null) {
        this._namespace = null;
      } else if (!/^[a-z](?:[a-z0-9_]*)(?:\.[a-z](?:[a-z0-9_]*))*$/i.test(temp)) {
        throw new Error('bla bla bla');
      } else {
        this._namespace = temp;
      }
    }

    public getRevision(): string {
      return this._revision || null;
    }

    public setRevision(value: string): void {
      var temp: string = String(value || '');
      if (value === null) {
        this._revision = null;
      } else if (!/^[a-z0-9]+$/.test(temp)) {
        throw new Error('bla bla bla');
      } else {
        this._revision = temp;
      }
    }

    public getExpire(): number {
      return this._expire;
    }

    public setExpire(value: number): void {
      var temp: string = String(value || ''),
        integer: number = parseInt(temp, 10);
      if (!/^\d+$/.test(temp)) {
        throw new Error('bla bla bla');
      }
      this._expire = integer || null;
    }

    public clear(callback?: (errors?: Error[]) => void): void {
      setTimeout(() => {
        if (xlib.typeOf(callback) === 'function') {
          callback(null);
        }
      }, 0);
    }

    public getKeys(callback?: (errors?: Error[], keys?: string[]) => void) {
      setTimeout(() => {
        if (xlib.typeOf(callback) === 'function') {
          callback(null, []);
        }
      }, 0);
    }

    public setItem(key: string, value: any, ttl: number, callback?: (errors?: Error[]) => void): void {
      var values: any = {};
      values[String(key || '')] = value;
      this.setItems(values, ttl, callback);
    }

    public setItems(values: any, ttl: number, callback?: (errors?: Error[]) => void): void {
      var property: string;
      if (['null', 'undefined'].indexOf(xlib.typeOf(values)) !== -1) {
        throw new Error('bla bla bla');
      }
      if (!/^(?:-1|\d+)$/.test(String(ttl))) {
        throw new Error('bla bla bla');
      }
      for (property in values) {
        if (values.hasOwnProperty(property) &&
          !/^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)*$/i.test(property)) {
          throw new Error('bla bla bla');
        }
      }
      setTimeout(() => {
        if (xlib.typeOf(callback) === 'function') {
          callback(null);
        }
      }, 0);
    }

    public getItem(key: string, callback?: (errors?: Error[], value?: any) => void): void {
      this.getItems([key], (errors?: Error[], values?: any[]) => {
        var trueKey: string = String(key || ''),
          value: any = null;
        if (errors && errors.length) {
          callback(errors, null);
        } else {
          if (values && values[trueKey]) {
            value = values[trueKey];
          }
          callback(null, value);
        }
      });
    }

    public getItems(keys: string[], callback?: (errors?: Error[], values?: any) => void): void {
      var index: number,
        length: number;
      if (xlib.typeOf(keys) !== 'array') {
        throw new Error('bla bla bla');
      }
      keys = keys.slice(0);
      length = keys.length;
      for (index = 0; index < length; index++) {
        if (xlib.typeOf(keys[index]) !== 'string') {
          throw new Error('bla bla bla');
        }
        if (!/^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)*$/i.test(keys[index])) {
          throw new Error('bla bla bla');
        }
      }
      setTimeout(() => {
        if (xlib.typeOf(callback) === 'function') {
          callback(null, {});
        }
      }, 0);
    }

    public hasItem(key: string, callback?: (errors?: Error[], resolve?: boolean) => void): void {
      this.hasItems([key], callback);
    }

    public hasItems(keys: string[], callback?: (errors?: Error[], resolve?: boolean) => void): void {
      var index: number,
        length: number;
      if (xlib.typeOf(keys) !== 'array') {
        throw new Error('bla bla bla');
      }
      keys = keys.slice(0);
      length = keys.length;
      for (index = 0; index < length; index++) {
        if (xlib.typeOf(keys[index]) !== 'string') {
          throw new Error('bla bla bla');
        }
        if (!/^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)*$/i.test(keys[index])) {
          throw new Error('bla bla bla');
        }
      }
      setTimeout(() => {
        if (xlib.typeOf(callback) === 'function') {
          callback(null, false);
        }
      }, 0);
    }

    public removeItem(key: string, callback?: (errors?: Error[]) => void): void {
      this.removeItems([key], callback);
    }

    public removeItems(keys: string[], callback?: (errors?: Error[]) => void): void {
      var index: number,
        length: number;
      if (xlib.typeOf(keys) !== 'array') {
        throw new Error('bla bla bla');
      }
      keys = keys.slice(0);
      length = keys.length;
      for (index = 0; index < length; index++) {
        if (xlib.typeOf(keys[index]) !== 'string') {
          throw new Error('bla bla bla');
        }
        if (!/^[a-z][a-z0-9]*(?:\.[a-z][a-z0-9]*)*$/i.test(keys[index])) {
          throw new Error('bla bla bla');
        }
      }
      setTimeout(() => {
        if (xlib.typeOf(callback) === 'function') {
          callback(null);
        }
      }, 0);
    }

  }

}