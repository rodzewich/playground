/// <reference path="IOptions.ts" />
/// <reference path="../ITransport.ts" />
/// <reference path="../Transport.ts" />
/// <reference path="../../../../defs/node.d.ts" />

module xlib.utils.loader.transport.node {

  export class Transport extends transport.Transport implements transport.ITransport {

    private _cache: string[] = [];

    private _changes: any = {};

    load(filename: string, callback?: (error?: Error) => void): void {
      var time1   : number = Number(new Date()),
        timeout : number = this.getTimeout(),
        source  : string = this.getBuilder().build(filename);
      // todo block by download
      if (this.isUseCache() &&
        this._cache.indexOf(source) !== -1) {
        setTimeout(() => {
          callback();
        }, 0);
      } else {
        fs.stat(source, (err1: Error, stats: fs.Stats) => {
          var time2: number = Number(new Date());
          if (err1) {
            callback(err1);
          } else if (!stats.isFile()) {
            callback(new Error('bla bla bla'));
          } else if (this._changes[source] === Number(stats.mtime)) {
            callback();
          } else if (time2 - time1 > timeout) {
            callback(new Error('bla bla bla'));
          } else {
            fs.readFile(source, {encoding: this.getEncoding()}, (err2: Error, data: string) => {
              var time3: number = Number(new Date());
              if (err2) {
                callback(err2);
              } else if (time3 - time1 > timeout) {
                callback(new Error('bla bla bla'));
              } else {
                try {
                  eval(data);
                  this._changes[source] = Number(stats.mtime);
                  if (this.isUseCache() &&
                    this._cache.indexOf(source) === -1) {
                    this._cache.push(source);
                  }
                  callback();
                } catch (err3) {
                  callback(err3);
                }
              }
            });
          }
        });
      }
    }
  }

  export function create(options?: IOptions): ITransport {
    return new Transport(options);
  }

}

