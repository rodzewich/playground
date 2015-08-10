/// <reference path="../IOptions.ts" />

module xlib.utils.storage.session {

  export interface IOptions extends storage.IOptions {
    clearTimeout?: number;
  }

}