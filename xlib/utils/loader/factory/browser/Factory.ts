/// <reference path="../../../../core.ts" />
/// <reference path="../Factory.ts" />
/// <reference path="../IFactory.ts" />

/// <reference path="../../Loader.ts" />
/// <reference path="../../ILoader.ts" />
/// <reference path="../../transport/IOptions.ts" />
/// <reference path="../../transport/ITransport.ts" />
/// <reference path="../../builder/browser/Builder.ts" />
/// <reference path="../../builder/browser/IBuilder.ts" />
/// <reference path="../../builder/browser/IOptions.ts" />

/// <reference path="../../transport/javascript/Transport.ts" />
/// <reference path="../../transport/style/Transport.ts" />


import core = require("../../../../core");
import AbstractFactory = require("../Factory");
import IAbstractFactory = require("../IFactory");


class Factory extends AbstractFactory implements IAbstractFactory {

    public createTemplatesBuilderOptions():browser.IOptions {
        return {separator: '/', extension: 'js'};
    }

    public createScriptsBuilderOptions():browser.IOptions {
        return {separator: '/', extension: 'js'};
    }

    public createStylesBuilderOptions():browser.IOptions {
        return {separator: '/', extension: 'css'};
    }

    public getTemplatesBuilderOptions():browser.IOptions {
        return <browser.IOptions>super.getTemplatesBuilderOptions();
    }

    public getScriptsBuilderOptions():browser.IOptions {
        return <browser.IOptions>super.getScriptsBuilderOptions();
    }

    public getStylesBuilderOptions():browser.IOptions {
        return <browser.IOptions>super.getStylesBuilderOptions();
    }

    public createTemplatesBuilder():browser.IBuilder {
        return new browser.Builder(this.getTemplatesBuilderOptions());
    }

    public createScriptsBuilder():browser.IBuilder {
        return new browser.Builder(this.getScriptsBuilderOptions());
    }

    public createStylesBuilder():browser.IBuilder {
        return new browser.Builder(this.getStylesBuilderOptions());
    }

    public getTemplatesBuilder():browser.IBuilder {
        return <browser.IBuilder>super.getTemplatesBuilder()
    }

    public getScriptsBuilder():browser.IBuilder {
        return <browser.IBuilder>super.getScriptsBuilder();
    }

    public getStylesBuilder():browser.IBuilder {
        return <browser.IBuilder>super.getStylesBuilder();
    }

    public createTemplatesLoader():loader.ILoader {
        var instance:loader.ILoader = new loader.Loader(this.getTemplatesLoaderOptions());
        instance.setTransport(this.getTemplatesTransport());
        return instance;
    }

    public createScriptsLoader():loader.ILoader {
        var instance:loader.ILoader = new loader.Loader(this.getScriptsLoaderOptions());
        instance.setTransport(this.getScriptsTransport());
        return instance;
    }

    public createStylesLoader():loader.ILoader {
        var instance:loader.ILoader = new loader.Loader(this.getStylesLoaderOptions());
        instance.setTransport(this.getStylesTransport());
        return instance;
    }

    protected _templatesLoader:loader.ILoader = null;

    public getTemplatesLoader():loader.ILoader {
        if (this._templatesLoader === null) {
            this._templatesLoader = this.createTemplatesLoader() || null;
        }
        return this._templatesLoader;
    }

    protected _scriptsLoader:loader.ILoader = null;

    public getScriptsLoader():loader.ILoader {
        if (this._scriptsLoader === null) {
            this._scriptsLoader = this.createScriptsLoader() || null;
        }
        return this._scriptsLoader;
    }

    protected _stylesLoader:loader.ILoader = null;

    public getStylesLoader():loader.ILoader {
        if (this._stylesLoader === null) {
            this._stylesLoader = this.createStylesLoader() || null;
        }
        return this._stylesLoader;
    }

    public createTemplatesLoaderOptions():loader.IOptions {
        return null;
    }

    public createScriptsLoaderOptions():loader.IOptions {
        return null;
    }

    public createStylesLoaderOptions():loader.IOptions {
        return null;
    }

    protected _templatesLoaderOptions:loader.IOptions = null;

    public getTemplatesLoaderOptions():loader.IOptions {
        if (this._templatesLoaderOptions === null) {
            this._templatesLoaderOptions = this.createTemplatesLoaderOptions() || null;
        }
        return <loader.IOptions>core.clone(this._templatesLoaderOptions);
    }

    protected _scriptsLoaderOptions:loader.IOptions = null;

    public getScriptsLoaderOptions():loader.IOptions {
        if (this._scriptsLoaderOptions === null) {
            this._scriptsLoaderOptions = this.createScriptsLoaderOptions() || null;
        }
        return <loader.IOptions>core.clone(this._scriptsLoaderOptions);
    }

    protected _stylesLoaderOptions:loader.IOptions = null;

    public getStylesLoaderOptions():loader.IOptions {
        if (this._stylesLoaderOptions === null) {
            this._stylesLoaderOptions = this.createStylesLoaderOptions() || null;
        }
        return <loader.IOptions>core.clone(this._stylesLoaderOptions);
    }

    public createTemplatesTransport():transport.ITransport {
        var instance:transport.ITransport = new transport.javascript.Transport(this.getTemplatesTransportOptions());
        instance.setBuilder(this.getTemplatesBuilder());
        return instance;
    }

    public createScriptsTransport():transport.ITransport {
        var instance:transport.ITransport = new transport.javascript.Transport(this.getScriptsTransportOptions());
        instance.setBuilder(this.getScriptsBuilder());
        return instance;
    }

    public createStylesTransport():transport.ITransport {
        var instance:transport.ITransport = new transport.style.Transport(this.getStylesTransportOptions());
        instance.setBuilder(this.getStylesBuilder());
        return instance;
    }

    protected _templatesTransport:transport.ITransport = null;

    public getTemplatesTransport():transport.ITransport {
        if (this._templatesTransport === null) {
            this._templatesTransport = this.createTemplatesTransport() || null;
        }
        return this._templatesTransport;
    }

    protected _scriptsTransport:transport.ITransport = null;

    public getScriptsTransport():transport.ITransport {
        if (this._scriptsTransport === null) {
            this._scriptsTransport = this.createScriptsTransport() || null;
        }
        return this._scriptsTransport;
    }

    protected _stylesTransport:transport.ITransport = null;

    public getStylesTransport():transport.ITransport {
        if (this._stylesTransport === null) {
            this._stylesTransport = this.createStylesTransport() || null;
        }
        return this._stylesTransport;
    }

    public createTemplatesTransportOptions():transport.IOptions {
        return {document: document};
    }

    public createScriptsTransportOptions():transport.IOptions {
        return {document: document};
    }

    public createStylesTransportOptions():transport.IOptions {
        return {document: document};
    }

    protected _templatesTransportOptions:transport.IOptions = null;

    public getTemplatesTransportOptions():transport.IOptions {
        if (this._templatesTransportOptions === null) {
            this._templatesTransportOptions = this.createTemplatesTransportOptions() || null;
        }
        return <transport.IOptions>core.clone(this._templatesTransportOptions);
    }

    protected _scriptsTransportOptions:transport.IOptions = null;

    public getScriptsTransportOptions():transport.IOptions {
        if (this._scriptsTransportOptions === null) {
            this._scriptsTransportOptions = this.createScriptsTransportOptions() || null;
        }
        return <transport.IOptions>core.clone(this._scriptsTransportOptions);
    }

    protected _stylesTransportOptions:transport.IOptions = null;

    public getStylesTransportOptions():transport.IOptions {
        if (this._stylesTransportOptions === null) {
            this._stylesTransportOptions = this.createStylesTransportOptions() || null;
        }
        return <transport.IOptions>core.clone(this._stylesTransportOptions);
    }
}

export = Factory;
