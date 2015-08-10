/// <reference path="../IStorage.ts" />

module xlib.utils.storage.cookie {

  export interface IStorage extends storage.IStorage {
    setPath(value: string): void;
    getPath(): string;
    setDomain(value: string): void;
    getDomain(): string;
    setSecure(value: boolean): void;
    getSecure(): boolean;
    isSecure(): boolean;
    setUseExpires(value: boolean): void;
    getUseExpires(): boolean;
    isUseExpires(): boolean;
  }

}