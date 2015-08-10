/// <reference path="../builder/IOptions.ts" />
/// <reference path="../builder/IBuilder.ts" />
/// <reference path="../transport/IOptions.ts" />
/// <reference path="../transport/ITransport.ts" />

module xlib.utils.service.factory {

  import builder = service.builder;
  import transport = service.transport;

  export interface IFactory {
    createBuilderOptions(): builder.IOptions;
    getBuilderOptions(): builder.IOptions;
    createBuilder(): builder.IBuilder;
    getBuilder(): builder.IBuilder;
    createTransportOptions(): transport.IOptions;
    getTransportOptions(): transport.IOptions;
    createTransport(): transport.ITransport;
    getTransport(): transport.ITransport;
  }

}