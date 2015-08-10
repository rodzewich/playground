/// <reference path="../../../../core.ts" />
/// <reference path="../ITransport.ts" />
/// <reference path="../IUsedCache.ts" />

module xlib.utils.loader.transport.node {

  export interface ITransport extends transport.ITransport, transport.IUsedCache, xlib.IUsedTimeout {}

}