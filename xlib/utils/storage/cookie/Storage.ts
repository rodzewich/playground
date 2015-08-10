/// <reference path="../Storage.ts" />
/// <reference path="IStorage.ts" />
/// <reference path="IOptions.ts" />

module xlib.utils.storage.cookie {

  /**
   * Browser cookie storage.
   */
  export class Storage extends storage.Storage implements IStorage {

    private _path: string = null;

    private _domain: string = null;

    private _secure: boolean = false;

    private _useExpires: boolean = true;

    constructor(options?: IOptions) {
      super(options);
      if (options && xlib.typeOf(options.path) !== 'undefined') {
        this.setPath(options.path);
      }
      if (options && xlib.typeOf(options.domain) !== 'undefined') {
        this.setDomain(options.domain);
      }
      if (options && xlib.typeOf(options.secure) !== 'undefined') {
        this.setSecure(options.secure);
      }
      if (options && xlib.typeOf(options.useExpires) !== 'undefined') {
        this.setUseExpires(options.useExpires);
      }
    }

    public setPath(value: string): void {
      var temp: string = String(value || '').replace(/^\s*(\S(?:.*\S)?)?\s*$/, '$1');
      this._path = temp || null;
    }

    public getPath(): string {
      return this._path;
    }

    public setDomain(value: string): void {
      var temp: string = String(value || '').replace(/^\s*(\S(?:.*\S)?)?\s*$/, '$1');
      this._domain = temp || null;
    }

    public getDomain(): string {
      return this._domain;
    }

    public setSecure(value: boolean): void {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(String(value).replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._secure = temp;
    }

    public getSecure(): boolean {
      return this._secure;
    }

    public isSecure(): boolean {
      return this.getSecure();
    }

    public setUseExpires(value: boolean): void {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(String(value).replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._useExpires = temp;
    }

    public getUseExpires(): boolean {
      return this._useExpires;
    }

    public isUseExpires(): boolean {
      return this.getUseExpires();
    }

    public getKeys(callback?: (errors?: Error[], keys?: string[]) => void) {
      super.getKeys(() => {
        var keys: string[] = [],
          namespace: string = this.getNamespace(),
          content: string,
          length: number,
          index: number,
          list: string[],
          name: string;
        if (window && window.document &&
          xlib.typeOf(window.document.cookie) !== 'undefined') {
          content = String(window.document.cookie || '');
          if (content) {
            list = content.split('; ');
            length = list.length;
            for(index = 0; index < length; index++) {
              name = list[index].split('=')[0];
              if (namespace !== null && name.indexOf(namespace + '.') === 0) {
                keys.push(name.slice(namespace.length + 1));
              } else if (namespace === null) {
                keys.push(name);
              }
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
      super.setItems(values, temp, () => {
        var value: any,
          element: string,
          property: string,
          namespace: string = this.getNamespace(),
          cookie: string;
        for (property in values) {
          if (values.hasOwnProperty(property)) {
            value = values[property];
            element = property;
            if (namespace !== null) {
              element = namespace + '.' + element;
            }
            if (['null', 'undefined'].indexOf(xlib.typeOf(value)) !== -1) {
              if (window && window.document) {
                window.document.cookie = element + '=; max-age=0';
              }
            } else {
              cookie = element + '=' + encodeURIComponent(JSON.stringify(value));
              if (temp !== -1 && this.getUseExpires()) {
                cookie += '; expires=' + (new Date(Number(new Date()) + temp)).toUTCString();
              } else if (temp !== -1) {
                cookie += '; max-age=' + parseInt(String(temp / 1000), 10);
              }
              if (this.getPath() !== null) {
                cookie += '; path=' + this.getPath();
              }
              if (this.getDomain() !== null) {
                cookie += '; domain=' + this.getDomain();
              }
              if (this.getSecure()) {
                cookie += '; secure';
              }
              if (window && window.document &&
                xlib.typeOf(window.document.cookie) !== 'undefined') {
                window.document.cookie = cookie;
              }
            }
          }
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
        var cookies: any = {},
          content: string,
          index: number,
          length: number,
          cookie: string,
          position: number,
          namespace: string = this.getNamespace(),
          name: string,
          value: string,
          list: string[];
        if (window && window.document &&
          xlib.typeOf(window.document.cookie) !== 'undefined') {
          content = String(window.document.cookie || '');
          if (content) {
            list = content.split('; ');
            length = list.length;
            for(index = 0; index < length; index++) {
              cookie = list[index];
              position = cookie.indexOf('=');
              name  = cookie.substring(0, position);
              value = cookie.substring(position + 1);
              try {
                value = JSON.parse(decodeURIComponent(value));
              } catch (e) {
                value = null;
              }
              if (namespace !== null && name.indexOf(namespace + '.') === 0) {
                cookies[name.slice(namespace.length + 1)] = value;
              } else if (namespace === null) {
                cookies[name] = value;
              } else {
                cookies[name] = null;
              }

            }
          }
        }
        length = keys.length;
        for (index = 0; index < length; index++) {
          if (xlib.typeOf(cookies[keys[index]]) === 'undefined') {
            cookies[keys[index]] = null;
          }
        }
        if (xlib.typeOf(callback) === 'function') {
          callback(null, cookies);
        }
      });
    }

    public hasItems(keys: string[], callback?: (errors?: Error[], resolve?: boolean) => void): void {
      if (xlib.typeOf(keys) === 'array') {
        keys = keys.slice(0);
      }
      super.hasItems(keys, () => {
        var content: string,
          index: number,
          length: number,
          cookie: string,
          position: number,
          namespace: string = this.getNamespace(),
          name: string,
          value: string,
          list: string[],
          temp: string[] = [],
          resolve: boolean = true;
        if (window && window.document &&
          xlib.typeOf(window.document.cookie) !== 'undefined') {
          content = String(window.document.cookie || '');
          if (content) {
            list = content.split('; ');
            length = list.length;
            for(index = 0; index < length; index++) {
              cookie = list[index];
              position = cookie.indexOf('=');
              name  = cookie.substring(0, position);
              value = cookie.substring(position + 1);
              try {
                JSON.parse(decodeURIComponent(value));
              } catch (e) {
                resolve = false;
                break;
              }
              temp.push(name);
            }
          }
        }
        if (resolve) {
          length = keys.length;
          for (index = 0; index < length; index++) {
            name = keys[index];
            if (namespace !== null) {
              name = namespace + '.' + name;
            }
            if (temp.indexOf(name) === -1) {
              resolve = false;
              break;
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
          if (window && window.document) {
            window.document.cookie = element + '=; max-age=0';
          }
        }
        if (xlib.typeOf(callback) === 'function') {
          callback(null);
        }
      });
    }

    public clear(callback?: (errors?: Error[]) => void): void {
      super.clear(() => {
        var content: string,
          index: number,
          length: number,
          name: string,
          namespace: string = this.getNamespace(),
          list: string[];
        if (window && window.document &&
          xlib.typeOf(window.document.cookie) !== 'undefined') {
          content = String(window.document.cookie || '');
          if (content) {
            list = content.split('; ');
            length = list.length;
            for(index = 0; index < length; index++) {
              name = list[index].split('=')[0];
              if (namespace !== null && name.indexOf(namespace + '.') === 0 || namespace === null) {
                if (window && window.document) {
                  window.document.cookie = name + '=; max-age=0';
                }
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

  export function isEnabled(): boolean {
    var name: string = 'testCookie' + String(Number(new Date())),
      content: string,
      list: string[],
      index: number,
      length: number,
      element: string,
      value: string,
      enabled: boolean = false;
    if (window && window.document) {
      window.document.cookie = name + '=1';
    }
    if (window && window.document &&
      xlib.typeOf(window.document.cookie) !== 'undefined') {
      content = String(window.document.cookie || '');
      if (content) {
        list = content.split('; ');
        length = list.length;
        for(index = 0; index < length; index++) {
          element = list[index].split('=')[0];
          value = list[index].split('=')[1];
          if (element === name && value === '1') {
            enabled = true;
            break;
          }
        }
      }
    }
    if (window && window.document) {
      window.document.cookie = name + '=; max-age=0';
    }
    return enabled;
  }

}