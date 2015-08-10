/// <reference path="../../core.ts" />
/// <reference path="ICallback.ts" />
/// <reference path="IDependency.ts" />

module xlib.utils.dependency {

  var instances: any = {},
    functions: any = {},
    singletons: string[] = [];

  export class Dependency implements IDependency {
    public register(name: string, callback: ICallback, singleton?: boolean): void {
      var temp: string = String(name || '');
      if (!/^[a-z][a-z0-9]*(?:\:[a-z][a-z0-9]*)*$/i.test(temp)) {
        throw new Error('bla bla bla');
      }
      if (xlib.typeOf(callback) !== 'function') {
        throw new Error('bla bla bla');
      }
      functions[temp] = callback;
      if (singleton) {
        singletons.push(temp);
      }
    }
    public load(name: string, callback: (errors?: Error[], instance?: any) => void) {
      var temp: string = String(name || '');
      if (!/^[a-z][a-z0-9]*(?:\:[a-z][a-z0-9]*)*$/i.test(temp)) {
        throw new Error('bla bla bla');
      }
      if (xlib.typeOf(callback) !== 'function') {
        throw new Error('bla bla bla');
      }
      setTimeout(() => {
        if (singletons.indexOf(temp) !== -1 && xlib.typeOf(instances[temp]) !== 'undefined') {
          callback(null, instances[temp]);
        } else {
          if (xlib.typeOf(functions[temp]) !== 'function') {
            callback([new Error('bla bla bla')], null);
          } else {
            functions[temp](
              (message: any) => {
                var errors: Error[] = [],
                  index: number,
                  length: number;
                if (xlib.typeOf(message) === 'array') {
                  length = message.length;
                  for (index = 0; index < length; index++) {
                    if (xlib.typeOf(message[index]) === 'error') {
                      errors.push(message[index]);
                    } else {
                      errors.push(new Error(String(message[index] || '')));
                    }
                  }
                } else if (xlib.typeOf(message) === 'error') {
                  errors.push(message);
                } else {
                  errors.push(new Error(String(message || '')));
                }
                callback(errors);
              },
              (instance: any) => {
                if (singletons.indexOf(temp) !== -1) {
                  instances[temp] = instance;
                }
                callback(null, instance);
              }
            );
          }
        }
      }, 0);
    }

    public static create(): Dependency {
      return new Dependency();
    }
  }

}