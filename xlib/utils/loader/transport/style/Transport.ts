/// <reference path="../../../../core.ts" />
/// <reference path="../Transport.ts" />
/// <reference path="ITransport.ts" />
/// <reference path="IOptions.ts" />

module xlib.utils.loader.transport.style {

  export class Transport extends transport.Transport implements ITransport {

    private _cache: string[] = [];

    private _document: Document;

    public getDocument(): Document {
      if (!this._document) {
        throw new Error('bla bla bla');
      }
      return this._document;
    }

    public setDocument(value: Document): void {
      if (!value) {
        throw new Error('bla bla bla');
      }
      this._document = value;
    }

    constructor(options?: IOptions) {
      super(options);
      if (options && xlib.typeOf(options.document) !== 'undefined') {
        this.setDocument(options.document);
      }
    }

    public load(filename: string, callback?: (error?: Error) => void): void {
      var timer  : any,
        executed : boolean   = false,
        timeout  : number    = this.getTimeout(),
        document : Document  = this.getDocument(),
        parent   : HTMLElement = document.head || document.body || document.documentElement,
        source   : string    = this.getBuilder().build(filename),
        element  : HTMLLinkElement;
      function startTimer(): void {
        if (timeout !== -1) {
          timer = setTimeout(() => {
            if (!executed) {
              stopTimer();
              executed = true;
              parent.removeChild(element);
              if (typeof callback === 'function') {
                callback(new Error('Request timeout (' + String(this.getTimeout()) + ' msec)!'));
              }
            }
          }, timeout);
        }
      }
      function stopTimer(): void {
        if (timer) {
          clearTimeout(timer);
        }
      }
      // todo block by download
      if (this.isUseCache() &&
        this._cache.indexOf(source) !== -1) {
        setTimeout(() => {
          callback();
        }, 0);
      } else {
        if (this.isUseCache() &&
          this._cache.indexOf(source) === -1) {
          this._cache.push(source);
        }
        startTimer();
        element = document.createElement('link');
        element.rel   = 'stylesheet';
        element.type  = 'text/css';
        element.href  = source;
        element.media   = 'all';
        element.charset = 'utf-8';
        element.onerror = function () {
          if (!executed) {
            stopTimer();
            executed = true;
            if (xlib.typeOf(callback) === 'function') {
              callback(new Error('File ' + JSON.stringify(source) + ' not found!'));
            }
          }
        };
        element.onload = function () {
          if (!executed) {
            stopTimer();
            executed = true;
            if (xlib.typeOf(callback) === 'function') {
              callback();
            }
          }
        };
        element.onreadystatechange = function() {
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            setTimeout(() => {
              if (!executed) {
                stopTimer();
                executed = true;
                if (xlib.typeOf(callback) === 'function') {
                  callback();
                }
              }
            }, 0);
          }
        };
        parent.appendChild(element);
      }
    }
  }

  export function create(options?: IOptions): ITransport {
    return new Transport(options);
  }

}
