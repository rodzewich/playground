/// <reference path="../../builder/IBuilder.ts" />
/// <reference path="../IOptions.ts" />

module xlib.utils.loader.transport.style {

  import builder = loader.builder;

  export interface IOptions extends transport.IOptions {
    encoding?: string;
    document?: Document;
    builder?: builder.IBuilder;
    timeout?: number;
  }

}