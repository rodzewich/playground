/// <reference path="../IOptions.ts" />

module xlib.utils.storage.cookie {

  export interface IOptions extends storage.IOptions {
    path?: string;
    domain?: string;
    secure?: boolean;
    useExpires?: boolean;
  }

}