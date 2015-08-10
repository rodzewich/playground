/// <reference path="./IOptions.ts" />
/// <reference path="./ITransport.ts" />
/// <reference path="../Transport.ts" />
/// <reference path="../../../../core" />

import IOptions = require("./IOptions");
import ITransport = require("./ITransport");
import AbstractTransport = require("../Transport");
import core = require("../../../../core");

class Transport extends AbstractTransport implements ITransport {

    protected _document:Document = document;

    constructor(options:IOptions) {
        super(options);
        if (core.typeOf(options.document) !== "undefined") {
            this.setDocument(options.document);
        }
    }

    public setDocument(value:Document):void {
        this._document = value;
    }

    public getDocument():Document {
        return this._document;
    }

    public load(filename:string, callback:(error?:Error) => void):void {
        var document:Document = this.getDocument(),
            container:HTMLElement = document.head || document.body,
            script:HTMLScriptElement = document.createElement("script");
        script.src = filename;
        container.appendChild(script);
    }

}

export = Transport;
