/// <reference path="../../../../defs/node.d.ts" />
/// <reference path="../Factory.ts" />
/// <reference path="../Factory.ts" />
/// <reference path="../IFactory.ts" />
/// <reference path="../../Loader.ts" />
/// <reference path="../../ILoader.ts" />
/// <reference path="../../transport/IOptions.ts" />
/// <reference path="../../transport/ITransport.ts" />
/// <reference path="../../transport/javascript/Transport.ts" />
/// <reference path="../../transport/style/Transport.ts" />
/// <reference path="../../builder/node/Builder.ts" />
/// <reference path="../../builder/node/IBuilder.ts" />
/// <reference path="../../builder/node/IOptions.ts" />

module xlib.utils.loader.factory.node {

  import node = builder.node;

  export class Factory extends factory.Factory implements factory.IFactory {
    public createTemplatesBuilderOptions(): node.IOptions {
      return {separator: path.sep, extension: 'js'};
    }
    public createScriptsBuilderOptions(): node.IOptions {
      return {separator: path.sep, extension: 'js'};
    }
    public createStylesBuilderOptions(): node.IOptions {
      return {separator: path.sep, extension: 'css'};
    }
    public getTemplatesBuilderOptions(): node.IOptions {
      return <node.IOptions>super.getTemplatesBuilderOptions();
    }
    public getScriptsBuilderOptions(): node.IOptions {
      return <node.IOptions>super.getScriptsBuilderOptions();
    }
    public getStylesBuilderOptions(): node.IOptions {
      return <node.IOptions>super.getStylesBuilderOptions();
    }
    public createTemplatesBuilder(): node.IBuilder {
      return new node.Builder(this.getTemplatesBuilderOptions());
    }
    public createScriptsBuilder(): node.IBuilder {
      return new node.Builder(this.getScriptsBuilderOptions());
    }
    public createStylesBuilder(): node.IBuilder {
      return new node.Builder(this.getStylesBuilderOptions());
    }
    public getTemplatesBuilder(): node.IBuilder {
      return <node.IBuilder>super.getTemplatesBuilder()
    }
    public getScriptsBuilder(): node.IBuilder {
      return <node.IBuilder>super.getScriptsBuilder();
    }
    public getStylesBuilder(): node.IBuilder {
      return <node.IBuilder>super.getStylesBuilder();
    }
    public createTemplatesLoader(): loader.ILoader {
      var instance: loader.ILoader = new loader.Loader(this.getTemplatesLoaderOptions());
      instance.setTransport(this.getTemplatesTransport());
      return instance;
    }
    public createScriptsLoader(): loader.ILoader {
      var instance: loader.ILoader = new loader.Loader(this.getScriptsLoaderOptions());
      instance.setTransport(this.getScriptsTransport());
      return instance;
    }
    public createStylesLoader(): loader.ILoader {
      var instance: loader.ILoader = new loader.Loader(this.getStylesLoaderOptions());
      instance.setTransport(this.getStylesTransport());
      return instance;
    }
    private _templatesLoader: loader.ILoader = null;
    public getTemplatesLoader(): loader.ILoader {
      if (this._templatesLoader === null) {
        this._templatesLoader = this.createTemplatesLoader() || null;
      }
      return this._templatesLoader;
    }
    private _scriptsLoader: loader.ILoader = null;
    public getScriptsLoader(): loader.ILoader {
      if (this._scriptsLoader === null) {
        this._scriptsLoader = this.createScriptsLoader() || null;
      }
      return this._scriptsLoader;
    }
    private _stylesLoader: loader.ILoader = null;
    public getStylesLoader(): loader.ILoader {
      if (this._stylesLoader === null) {
        this._stylesLoader = this.createStylesLoader() || null;
      }
      return this._stylesLoader;
    }
    public createTemplatesLoaderOptions(): loader.IOptions {
      return null;
    }
    public createScriptsLoaderOptions(): loader.IOptions {
      return null;
    }
    public createStylesLoaderOptions(): loader.IOptions {
      return null;
    }
    private _templatesLoaderOptions: loader.IOptions = null;
    public getTemplatesLoaderOptions(): loader.IOptions {
      if (this._templatesLoaderOptions === null) {
        this._templatesLoaderOptions = this.createTemplatesLoaderOptions() || null;
      }
      return <loader.IOptions>xlib.clone(this._templatesLoaderOptions);
    }
    private _scriptsLoaderOptions: loader.IOptions = null;
    public getScriptsLoaderOptions(): loader.IOptions {
      if (this._scriptsLoaderOptions === null) {
        this._scriptsLoaderOptions = this.createScriptsLoaderOptions() || null;
      }
      return <loader.IOptions>xlib.clone(this._scriptsLoaderOptions);
    }
    private _stylesLoaderOptions: loader.IOptions = null;
    public getStylesLoaderOptions(): loader.IOptions {
      if (this._stylesLoaderOptions === null) {
        this._stylesLoaderOptions = this.createStylesLoaderOptions() || null;
      }
      return <loader.IOptions>xlib.clone(this._stylesLoaderOptions);
    }
    public createTemplatesTransport(): transport.ITransport {
      var instance: transport.ITransport = new transport.javascript.Transport(this.getTemplatesTransportOptions());
      instance.setBuilder(this.getTemplatesBuilder());
      return instance;
    }
    public createScriptsTransport(): transport.ITransport {
      var instance: transport.ITransport = new transport.javascript.Transport(this.getScriptsTransportOptions());
      instance.setBuilder(this.getScriptsBuilder());
      return instance;
    }
    public createStylesTransport(): transport.ITransport {
      var instance: transport.ITransport = new transport.style.Transport(this.getStylesTransportOptions());
      instance.setBuilder(this.getStylesBuilder());
      return instance;
    }
    private _templatesTransport: transport.ITransport = null;
    public getTemplatesTransport(): transport.ITransport {
      if (this._templatesTransport === null) {
        this._templatesTransport = this.createTemplatesTransport() || null;
      }
      return this._templatesTransport;
    }
    private _scriptsTransport: transport.ITransport = null;
    public getScriptsTransport(): transport.ITransport {
      if (this._scriptsTransport === null) {
        this._scriptsTransport = this.createScriptsTransport() || null;
      }
      return this._scriptsTransport;
    }
    private _stylesTransport: transport.ITransport = null;
    public getStylesTransport(): transport.ITransport {
      if (this._stylesTransport === null) {
        this._stylesTransport = this.createStylesTransport() || null;
      }
      return this._stylesTransport;
    }
    public createTemplatesTransportOptions(): transport.IOptions {
      return null;
    }
    public createScriptsTransportOptions(): transport.IOptions {
      return null;
    }
    public createStylesTransportOptions(): transport.IOptions {
      return null;
    }
    private _templatesTransportOptions: transport.IOptions = null;
    public getTemplatesTransportOptions(): transport.IOptions {
      if (this._templatesTransportOptions === null) {
        this._templatesTransportOptions = this.createTemplatesTransportOptions() || null;
      }
      return <transport.IOptions>xlib.clone(this._templatesTransportOptions);
    }
    private _scriptsTransportOptions: transport.IOptions = null;
    public getScriptsTransportOptions(): transport.IOptions {
      if (this._scriptsTransportOptions === null) {
        this._scriptsTransportOptions = this.createScriptsTransportOptions() || null;
      }
      return <transport.IOptions>xlib.clone(this._scriptsTransportOptions);
    }
    private _stylesTransportOptions: transport.IOptions = null;
    public getStylesTransportOptions(): transport.IOptions {
      if (this._stylesTransportOptions === null) {
        this._stylesTransportOptions = this.createStylesTransportOptions() || null;
      }
      return <transport.IOptions>xlib.clone(this._stylesTransportOptions);
    }
  }

}
