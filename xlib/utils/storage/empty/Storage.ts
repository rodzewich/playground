/// <reference path="../Storage.ts" />
/// <reference path="IStorage.ts" />
/// <reference path="IOptions.ts" />

module xlib.utils.storage.empty {

  /**
   * Empty storage.
   */
  export class Storage extends storage.Storage implements IStorage {}

  export function create(options?: IOptions): Storage {
    return new Storage(options);
  }

}