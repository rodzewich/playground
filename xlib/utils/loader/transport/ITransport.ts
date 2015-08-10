/// <reference path="../../../core.ts" />
/// <reference path="../builder/IBuilder.ts" />

module xlib.utils.loader.transport {

  import builder = loader.builder;

  export interface ITransport extends xlib.IUsedBuilder<builder.IBuilder,builder.IBuilder> {
    load(filename: string, callback?: (error?: Error) => void): void;
  }

}