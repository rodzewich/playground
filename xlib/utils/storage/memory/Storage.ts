/// <reference path="../Storage.ts" />
/// <reference path="IStorage.ts" />
/// <reference path="IOptions.ts" />

module xlib.utils.storage.memory {

  var memory: any = {}, // data storage
    locks: any = {}, // locks storage
    index: number = 0;

  /**
   * Memory storage.
   */
  export class Storage extends storage.Storage implements IStorage {

    constructor(options?: IOptions) {
      super(options);
    }

    public getKeys(callback?: (errors?: Error[], keys?: string[]) => void) {
      super.getKeys(() => {
        var property: string,
          keys: string[] = [],
          namespace: string = this.getNamespace();
        for (property in memory) {
          if (memory.hasOwnProperty(property)) {
            if (namespace !== null) {
              keys.push(property.slice(namespace.length + 1));
            } else {
              keys.push(property);
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
          remove: (element: string, index: number, ttl: number) => void =
            (element: string, index: number, ttl: number) => {
              locks[element] = index;
              setTimeout(() => {
                if (locks[element] === index) {
                  delete locks[element];
                  delete memory[element];
                }
              }, ttl);
            };
        for (property in values) {
          if (values.hasOwnProperty(property)) {
            value = values[property];
            element = property;
            if (namespace !== null) {
              element = namespace + '.' + element;
            }
            if (['null', 'undefined'].indexOf(xlib.typeOf(value)) !== -1) {
              if (xlib.typeOf(memory[element]) === 'string') {
                delete memory[element];
              }
            } else {
              memory[element] = JSON.stringify(value);
              if (temp !== -1) {
                remove(element, index++, temp);
              } else {
                delete locks[element];
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
        var values: any = {},
          index: number,
          element: string,
          key: string,
          length: number = keys.length,
          namespace: string = this.getNamespace();
        for (index = 0; index < length; index++) {
          key = keys[index];
          element = keys[index];
          if (namespace !== null) {
            element = namespace + '.' + element;
          }
          if (xlib.typeOf(memory[element]) === 'string') {
            values[key] = JSON.parse(memory[element]);
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
        var index: number,
          resolve: boolean = true,
          element: string,
          length: number = keys.length,
          namespace: string = this.getNamespace();
        for (index = 0; index < length; index++) {
          element = keys[index];
          if (namespace !== null) {
            element = namespace + '.' + element;
          }
          if (xlib.typeOf(memory[element]) === 'string') {
            resolve = false;
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
          if (xlib.typeOf(memory[element]) === 'string') {
            delete memory[element];
          }
        }
        if (xlib.typeOf(callback) === 'function') {
          callback(null);
        }
      });
    }

    public clear(callback?: (errors?: Error[]) => void): void {
      super.clear(() => {
        var property: string,
          namespace: string = this.getNamespace();
        if (namespace === null) {
          memory = {};
        } else {
          for (property in memory) {
            if (memory.hasOwnProperty(property) && property.indexOf(namespace + '.') === 0) {
              delete memory[namespace + '.' + property];
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