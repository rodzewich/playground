/// <reference path="../IOptions.ts" />

module xlib.utils.loader.transport.javascript {

  export interface IOptions extends transport.IOptions {
    document?: Document;
  }

}