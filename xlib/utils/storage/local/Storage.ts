/// <reference path="../Storage.ts" />
/// <reference path="IStorage.ts" />
/// <reference path="IOptions.ts" />

module xlib.utils.storage.local {

  var DEFAULT_CLEAR_TIMEOUT: number = 1000;

  /**
   * Browser local storage.
   */
  export class Storage extends storage.Storage implements IStorage {

    private _changed: boolean = true;

    private _clearTimeout: number = DEFAULT_CLEAR_TIMEOUT;

    constructor(options?: IOptions) {
      super(options);
      if (xlib.typeOf(options.clearTimeout) !== 'undefined') {
        this.setClearTimeout(options.clearTimeout);
      }
      var clear: () => void = () => {
        var key: string,
          index: number,
          value: any[],
          length: number = 0,
          namespace: string;
        if (this._changed) {
          namespace = this.getNamespace();
          if (window && window.sessionStorage &&
            xlib.typeOf(window.sessionStorage.length) === 'number') {
            length = window.sessionStorage.length;
          }
          for (index = 0; index < length; index++) {
            key = null;
            value = null;
            if (window && window.sessionStorage &&
              xlib.typeOf(window.sessionStorage.key) === 'function') {
              key = window.sessionStorage.key(index);

            }
            if (xlib.typeOf(key) !== 'string' && ((namespace !== null && key.indexOf(namespace + '.') === 0) || namespace === null)) {
              try {
                value = JSON.parse(window.sessionStorage.getItem(key));
              } catch (e) {}
            }
            if (xlib.typeOf(value) === 'array' && value.length === 3) {
              if (value[0] !== this.getRevision() || value[1] < Number(new Date()) && value[1] !== -1) {
                if (window && window.sessionStorage && xlib.typeOf(window.sessionStorage.removeItem) === 'function') {
                  window.sessionStorage.removeItem(key);
                }
              }
            }
          }
          this._changed = false;
        }
        setTimeout(() => {
          clear();
        }, this.getClearTimeout());
      };
      setTimeout(() => {
        clear();
      }, this.getClearTimeout());
    }

    public getClearTimeout(): number {
      return this._clearTimeout;
    }

    public setClearTimeout(value: number): void {
      var temp: string = String(value);
      if (value === null) {
        this._clearTimeout = DEFAULT_CLEAR_TIMEOUT;
      } else if (/^\d+$/.test(temp) && temp !== '0') {
        this._clearTimeout = parseInt(temp, 10);
      } else {
        throw new Error('bla bla bla');
      }
    }

    public getKeys(callback?: (errors?: Error[], keys?: string[]) => void) {
      super.getKeys(() => {
        var key: string,
          index: number,
          keys: string[] = [],
          length: number = 0,
          namespace: string = this.getNamespace();
        if (window && window.localStorage &&
          xlib.typeOf(window.localStorage.length) === 'number') {
          length = window.localStorage.length;
        }
        for (index = 0; index < length; index++) {
          key = null;
          if (window && window.localStorage &&
            xlib.typeOf(window.localStorage.key) === 'function') {
            key = window.localStorage.key(index);
          }
          if (xlib.typeOf(key) === 'string') {
            if (namespace !== null && key.indexOf(namespace + '.') === 0) {
              keys.push(key.slice(namespace.length + 1));
            } else {
              keys.push(key);
            }
          }
        }
        if (xlib.typeOf(callback) === 'function') {
          callback(null, keys);
        }
      });
    }

    public setItems(values: any, ttl: number, callback?: (errors?: Error[]) => void): void {
      var temp: number = parseFloat(String(ttl));
      if (['null', 'undefined'].indexOf(xlib.typeOf(values)) === -1) {
        values = xlib.clone(values);
      }
      if (temp && this.getExpire() !== null) {
        temp = Math.min(temp, this.getExpire());
      }
      super.setItems(values, temp, () => {
        var value: any,
          element: string,
          property: string,
          namespace: string = this.getNamespace();
        for (property in values) {
          if (values.hasOwnProperty(property)) {
            value = values[property];
            element = property;
            if (namespace !== null) {
              element = namespace + '.' + element;
            }
            if (['null', 'undefined'].indexOf(xlib.typeOf(value)) !== -1) {
              if (window && window.localStorage &&
                xlib.typeOf(window.localStorage.removeItem) === 'function') {
                window.localStorage.removeItem(element);
              }
            } else {
              if (window && window.localStorage &&
                xlib.typeOf(window.localStorage.setItem) === 'function') {
                window.localStorage.setItem(element, JSON.stringify([this.getRevision(), temp === -1 ? -1 : Number(new Date()) + temp, value]));
              }
            }
          }
          this._changed = true;
          if (xlib.typeOf(callback) === 'function') {
            callback(null);
          }
        }
      });
    }

    public getItems(keys: string[], callback?: (errors?: Error[], values?: any[]) => void): void {
      if (xlib.typeOf(keys) === 'array') {
        keys = keys.slice(0);
      }
      super.getItems(keys, () => {
        var values: any = {},
          index: number,
          value: any[],
          element: string,
          key: string,
          length: number = keys.length,
          namespace: string = this.getNamespace();
        for (index = 0; index < length; index++) {
          value = null;
          key = keys[index];
          element = keys[index];
          if (namespace !== null) {
            element = namespace + '.' + element;
          }
          if (window && window.localStorage &&
            xlib.typeOf(window.localStorage.getItem) === 'function') {
            try {
              value = JSON.parse(window.localStorage.getItem(element));
            } catch (e) {}
          }
          if (xlib.typeOf(value) === 'array' && value.length === 3) {
            if (value[0] === this.getRevision() && (value[1] === -1 || value[1] >= Number(new Date()))) {
              values[key] = value[2];
            } else {
              if (window && window.localStorage &&
                xlib.typeOf(window.localStorage.removeItem) === 'function') {
                window.localStorage.removeItem(element);
              }
            }
          } else {
            values[key] = null;
            if (window && window.localStorage &&
              xlib.typeOf(window.localStorage.removeItem) === 'function') {
              window.localStorage.removeItem(element);
            }
          }
        }
        if (xlib.typeOf(callback) === 'function') {
          callback(null, values);
        }
      });
    }

    public hasItems(keys: string[], callback?: (errors?: Error[], resolve?: boolean) => void): void {
      if (xlib.typeOf(keys) === 'array') {
        keys = keys.slice(0);
      }
      super.hasItems(keys, () => {
        var resolve: boolean = true,
          index: number,
          value: any[],
          element: string,
          key: string,
          length: number = keys.length,
          namespace: string = this.getNamespace();
        for (index = 0; index < length; index++) {
          value = null;
          key = keys[index];
          element = keys[index];
          if (namespace !== null) {
            element = namespace + '.' + element;
          }
          if (window && window.localStorage &&
            xlib.typeOf(window.localStorage.getItem) === 'function') {
            try {
              value = JSON.parse(window.localStorage.getItem(element));
            } catch (e) {}
          }
          if (xlib.typeOf(value) === 'array' && value.length === 3) {
            if (value[0] !== this.getRevision() || value[1] < Number(new Date()) && value[1] !== -1) {
              resolve = false;
              if (window && window.localStorage &&
                xlib.typeOf(window.localStorage.removeItem) === 'function') {
                window.localStorage.removeItem(element);
              }
            }
          } else {
            resolve = false;
            if (window && window.localStorage &&
              xlib.typeOf(window.localStorage.removeItem) === 'function') {
              window.localStorage.removeItem(element);
            }
          }
        }
        if (xlib.typeOf(callback) === 'function') {
          callback(null, resolve);
        }
      });
    }

    public removeItems(keys: string[], callback?: (errors?: Error[]) => void): void {
      if (xlib.typeOf(keys) === 'array') {
        keys = keys.slice(0);
      }
      super.removeItems(keys, () => {
        var index: number,
          element: string,
          length: number = keys.length,
          namespace: string = this.getNamespace();
        for (index = 0; index < length; index++) {
          element = keys[index];
          if (namespace !== null) {
            element = namespace + '.' + element;
          }
          if (window && window.localStorage &&
            xlib.typeOf(window.localStorage.removeItem) === 'function') {
            window.localStorage.removeItem(element);
          }
        }
        if (xlib.typeOf(callback) === 'function') {
          callback(null);
        }
      });
    }

    public clear(callback?: (errors?: Error[]) => void): void {
      super.clear(() => {
        var key: string,
          index: number,
          length: number = 0,
          namespace: string = this.getNamespace();
        if (namespace === null) {
          if (window && window.localStorage &&
            xlib.typeOf(window.localStorage.clear) === 'function') {
            window.localStorage.clear();
          }
        } else {
          if (window && window.localStorage &&
            xlib.typeOf(window.localStorage.length) === 'number') {
            length = window.localStorage.length;
          }
          for (index = 0; index < length; index++) {
            key = null;
            if (window && window.localStorage &&
              xlib.typeOf(window.localStorage.key) === 'function') {
              key = window.localStorage.key(index);
            }
            if (xlib.typeOf(key) === 'string' && key.indexOf(namespace + '.') === 0) {
              if (window && window.localStorage &&
                xlib.typeOf(window.localStorage.removeItem) === 'function') {
                window.localStorage.removeItem(key);
              }
            }
          }
        }
        if (xlib.typeOf(callback) === 'function') {
          callback(null);
        }
      });
    }
  }

  export function create(options?: IOptions): Storage {
    return new Storage(options);
  }

}