/// <reference path="../../../core.ts" />
/// <reference path="./IBuilder.ts" />
/// <reference path="./IOptions.ts" />

import core = require("../../../core");
import IBuilder = require("./IBuilder");
import IOptions = require("./IOptions");

class Builder implements IBuilder {

    protected _separator:string = null;

    public setSeparator(value:string):void {
        if (['/', '\\'].indexOf(value) === -1) {
            throw new Error('bla bla bla');
        }
        this._separator = value;
    }

    public getSeparator():string {
        if (['/', '\\'].indexOf(this._separator) === -1) {
            throw new Error('bla bla bla');
        }
        return this._separator;
    }

    protected _base:string = null;

    public setBase(value:string):void {
        var temp:string[] = String(value || '').split('/'),
            length:number = temp.length,
            result:string[] = [],
            part:string,
            index:number;
        if (value === null) {
            this._base = null;
        } else {
            for (index = 0; index < length; index++) {
                part = temp[index].replace(/^\s*(\S(?:.*\S)*)*\s*$/, '$1');
                if (part !== '') {
                    result.push(part);
                }
            }
            if (result.length === 0) {
                throw new Error('bla bla bla');
            }
            this._base = result.join(this.getSeparator())
        }
    }

    public getBase():string {
        return this._base;
    }

    protected _extension:string = null;

    public getExtension():string {
        return this._extension;
    }

    public setExtension(value:string):void {
        var temp:string = String(value || '');
        if (value === null) {
            this._extension = null;
        } else if (/^[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)*$/i.test(temp)) {
            this._extension = temp;
        } else {
            throw new Error('bla bla bla');
        }
    }

    public route(path:string):string {
        return String(path || '');
    }

    public transform(filename:string):string {
        return String(filename || '');
    }

    constructor(options?:IOptions) {
        if (options && core.typeOf(options.extension) !== 'undefined') {
            this.setExtension(options.extension);
        }
        if (options && core.typeOf(options.separator) !== 'undefined') {
            this.setSeparator(options.separator);
        }
        if (options && core.typeOf(options.base) !== 'undefined') {
            this.setBase(options.base);
        }
    }

    public build(filename:string):string {
        var temp:string[] = String(filename || '').split('/'),
            length:number = temp.length,
            result:string[] = [],
            index:number,
            part:string;
        for (index = 0; index < length; index++) {
            part = temp[index].replace(/^\s*(\S(?:.*\S)*)*\s*$/, '$1');
            if (part !== '') {
                result.push(part);
            }
        }
        if (result.length === 0) {
            throw new Error('bla bla bla');
        }
        result[result.length - 1] = this.transform(result[result.length - 1]) +
        (this.getExtension() !== null ? '.' + this.getExtension() : '');
        if (this.getBase() !== null) {
            result.unshift(this.getBase());
        }
        return this.route(this.getSeparator() + result.join(this.getSeparator()));
    }

}

export = Builder;
