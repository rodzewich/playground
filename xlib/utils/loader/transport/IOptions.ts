/// <reference path="../builder/IBuilder.ts" />

module xlib.utils.loader.transport {

  import builder = loader.builder;

  export interface IOptions {
    useCache?: boolean;
    encoding?: string;
    timeout?: number;
    builder?: builder.IBuilder;
  }

}