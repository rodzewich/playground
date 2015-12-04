/// <reference path="./plugin.d.ts" />

import {isDefined} from "../../../../utils/common";
import PluginBase = require("../Plugin");
import IPlugin = require("./IPlugin");
import IOptions = require("./IOptions");
import postcssColorRgba = require("postcss-color-rgba-fallback");

class Plugin extends PluginBase implements IPlugin {

    private _properties:string[] = ["background-color", "background", "color", "border", "border-color", "outline", "outline-color"];

    constructor(options?:IOptions) {
        super(options);
        if (options && isDefined(options.properties)) {
            this.setProperties(options.properties);
        }
    }

    public getProperties():string[] {
        return this._properties;
    }

    public setProperties(value:string[]):void {
        this._properties = value;
    }

    public getInstance():any {
        return postcssColorRgba({
            properties: this.getProperties()
        });
    }

}

export = Plugin;