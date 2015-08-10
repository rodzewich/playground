/// <reference path="ILoader.ts" />
/// <reference path="IUsedTransport.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="../../core.ts" />
/// <reference path="../dom.ts" />
/// <reference path="../deferred/IAction.ts" />
/// <reference path="../deferred/IDeferred.ts" />
/// <reference path="../deferred/Deferred.ts" />
/// <reference path="transport/ITransport.ts" />
/// <reference path="builder/IBuilder.ts" />
/// <reference path="transport/javascript/Transport.ts" />


module xlib.utils.loader {

  import deferred  = utils.deferred;

  export class Loader implements ILoader {

    private _transport: transport.ITransport;

    public getTransport(): transport.ITransport {
      if (!this._transport) {
        throw new Error('bla bla bla');
      }
      return this._transport;
    }

    public setTransport(value: transport.ITransport): void {
      if (!value) {
        throw new Error('bla bla bla');
      }
      this._transport = value;
    }

    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.transport) !== 'undefined') {
        this.setTransport(options.transport);
      }
    }

    public load(files: any[], callback?: (errors: Error[]) => void) {
      var index   : number,
        length  : number,
        queue   : deferred.IDeferred = deferred.create(),
        transport : transport.ITransport = this.getTransport();

      function addLoadFileAction(queue: deferred.IDeferred, filename: string): void {
        queue.add(<deferred.IAction>((success: () => void, error: (message: Error) => void) => {
          transport.load(filename, function (err:Error) {
            if (err) {
              error(err);
            } else {
              success();
            }
          });
        }));
      }

      function addLoadBatchAction(queue: deferred.IDeferred, files: any[]): void {
        var results: deferred.IAction[] = [],
          index: number,
          length: number = files.length;
        for (index = 0; index < length; index++) {
          if (xlib.typeOf(files[index]) === 'string') {
            addParallelLoadAction(results, files[index]);
          } else if (xlib.typeOf(files[index]) === 'array') {
            addParallelBatchAction(results, files[index]);
          } else {
            throw new TypeError('bla bla bla');
          }
        }
        queue.add.apply(queue, results);
      }

      function addParallelLoadAction(results: deferred.IAction[], filename: string): void {
        results.push(<deferred.IAction>((success: () => void, error: (message: Error) => void) => {
          transport.load(filename, function (err:Error) {
            if (err) {
              error(err);
            } else {
              success();
            }
          });
        }));
      }

      function addParallelBatchAction(results: deferred.IAction[], files: any[]) {
        var queue: deferred.IDeferred = deferred.create();
        addActions(queue, files);
        results.push(<deferred.IAction>((success: () => void, error: (message: Error[]) => void) => {
          queue.run((errors: Error[]) => {
            error(errors);
          });
        }));
      }

      function addActions(queue: deferred.IDeferred, files: any[]) {
        if (xlib.typeOf(files) !== 'array') {
          throw new TypeError('bla bla bla');
        }
        length = files.length;
        for (index = 0; index < length; index++) {
          if (xlib.typeOf(files[index]) === 'string') {
            addLoadFileAction(queue, files[index]);
          } else if (xlib.typeOf(files[index]) === 'array' && files[index].length) {
            addLoadBatchAction(queue, files[index]);
          } else {
            throw new TypeError('bla bla bla');
          }
        }
      }

      addActions(queue, files);

      queue.run((errors: Error[]) => {
        if (xlib.typeOf(callback) === 'function') {
          callback(errors);
        }
      });
    }

  }

}
