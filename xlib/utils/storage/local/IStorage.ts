/// <reference path="../IStorage.ts" />

module xlib.utils.storage.local {

  export interface IStorage extends storage.IStorage {
    getClearTimeout(): number;
    setClearTimeout(value: number): void;
  }

}