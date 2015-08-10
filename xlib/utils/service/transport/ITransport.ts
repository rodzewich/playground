/// <reference path="../builder/IBuilder.ts" />
/// <reference path="../../../core.ts" />

module xlib.utils.service.transport {

  export interface ITransport extends xlib.IUsedBuilder<builder.IBuilder,builder.IBuilder> {
    load(namespace: string, name: string, params?: any, callback?: (error?: Error[], data?: any) => void): void;
  }

}