/// <reference path="../../../core.ts" />
/// <reference path="../builder/Builder.ts" />
/// <reference path="../builder/IBuilder.ts" />
/// <reference path="../builder/IOptions.ts" />

import builder = loader.builder;

class Factory {

    public createTemplatesBuilder():builder.IBuilder {
        return new builder.Builder(this.getTemplatesBuilderOptions());
    }

    public createScriptsBuilder():builder.IBuilder {
        return new builder.Builder(this.getScriptsBuilderOptions());
    }

    public createStylesBuilder():builder.IBuilder {
        return new builder.Builder(this.getStylesBuilderOptions());
    }

    protected _templatesBuilder:builder.IBuilder = null;

    public getTemplatesBuilder():builder.IBuilder {
        if (this._templatesBuilder === null) {
            this._templatesBuilder = this.createTemplatesBuilder();
        }
        return this._templatesBuilder;
    }

    protected _scriptsBuilder:builder.IBuilder = null;

    public getScriptsBuilder():builder.IBuilder {
        if (this._scriptsBuilder === null) {
            this._scriptsBuilder = this.createScriptsBuilder();
        }
        return this._scriptsBuilder;
    }

    protected _stylesBuilder:builder.IBuilder = null;

    public getStylesBuilder():builder.IBuilder {
        if (this._stylesBuilder === null) {
            this._stylesBuilder = this.createStylesBuilder();
        }
        return this._stylesBuilder;
    }

    public createTemplatesBuilderOptions():builder.IOptions {
        return null;
    }

    public createScriptsBuilderOptions():builder.IOptions {
        return null;
    }

    public createStylesBuilderOptions():builder.IOptions {
        return null;
    }

    protected _templatesBuilderOptions:builder.IOptions = null;

    public getTemplatesBuilderOptions():builder.IOptions {
        if (this._templatesBuilderOptions === null) {
            this._templatesBuilderOptions = this.createTemplatesBuilderOptions() || null;
        }
        return <builder.IOptions>xlib.clone(this._templatesBuilderOptions);
    }

    protected _scriptsBuilderOptions:builder.IOptions = null;

    public getScriptsBuilderOptions():builder.IOptions {
        if (this._scriptsBuilderOptions === null) {
            this._scriptsBuilderOptions = this.createScriptsBuilderOptions() || null;
        }
        return <builder.IOptions>xlib.clone(this._scriptsBuilderOptions);
    }

    protected _stylesBuilderOptions:builder.IOptions = null;

    public getStylesBuilderOptions():builder.IOptions {
        if (this._stylesBuilderOptions === null) {
            this._stylesBuilderOptions = this.createStylesBuilderOptions() || null;
        }
        return <builder.IOptions>xlib.clone(this._stylesBuilderOptions);
    }
}

export = Factory;
