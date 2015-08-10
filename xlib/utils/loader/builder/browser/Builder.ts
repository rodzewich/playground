/// <reference path="../Builder.ts" />
/// <reference path="./IBuilder.ts" />
/// <reference path="./IOptions.ts" />

import IBuilder = require("./IBuilder");
import IOptions = require("./IOptions");
import AbstractBuilder = require("../Builder");

export class Builder extends AbstractBuilder implements IBuilder {

    constructor(options?:IOptions) {
        super(options);
        if (options && xlib.typeOf(options.hostname) !== 'undefined') {
            this.setHostname(options.hostname);
        }
        if (options && xlib.typeOf(options.protocol) !== 'undefined') {
            this.setProtocol(options.protocol);
        }
        if (options && xlib.typeOf(options.port) !== 'undefined') {
            this.setPort(options.port);
        }
        if (options && xlib.typeOf(options.variables) !== 'undefined') {
            this.setVariables(options.variables);
        }
    }

    protected _hostname:string = null;

    public getHostname():string {
        return this._hostname || null;
    }

    public setHostname(value:string):void {
        this._hostname = String(value || '') || null;
    }

    protected _protocol:string = null;

    public getProtocol():string {
        return this._protocol || null;
    }

    public setProtocol(value:string):void {
        var temp:string = String(value || '');
        if (!/^[a-z]+$/.test(temp)) {
            throw new Error('bla bla bla');
        }
        this._protocol = temp;
    }

    protected _port:number = null;

    public getPort():number {
        return this._port || null;
    }

    public setPort(value:number):void {
        var temp:string = String(value),
            port:number = parseInt(temp, 10);
        if (!/^\d{1,5}$/.test(temp)) {
            throw new Error('bla bla bla');
        }
        if (port < 0 || port > 65535) {
            throw new Error('bla bla bla');
        }
        this._port = port;
    }

    protected _variables:any = null;

    public setVariables(value:any):void {
        var property:string;
        if (value === null) {
            this._variables = null;
        } else if (xlib.typeOf(value) === 'object') {
            this._variables = {};
            for (property in value) {
                if (value.hasOwnProperty(property) && ['boolean', 'null', 'number', 'string'].indexOf(xlib.typeOf(value[property])) !== -1) {
                    this._variables[property] = value[property];
                }
            }
            if (Object.keys(this._variables).length === 0) {
                this._variables = null;
            }
        } else {
            throw new Error('bla bla bla');
        }
    }

    public getVariables():any {
        return xlib.clone(this._variables) || null;
    }

    public build(filename:string):string {
        var result:string[] = [super.build(filename)],
            variables:any = this.getVariables(),
            query:string[] = [],
            property:string;
        if (this.getHostname() !== null) {
            if (this.getPort() && this.getPort() !== 80) {
                result.unshift(':', String(this.getPort()));
            }
            result.unshift('//', this.getHostname());
            if (this.getProtocol() !== null) {
                result.unshift(this.getProtocol(), ':');
            }
        }
        if (variables !== null) {
            for (property in variables) {
                if (variables.hasOwnProperty(property)) {
                    query.push(encodeURI(property) + '=' + encodeURI(variables[property]));
                }
            }
            if (query.length) {
                result.push('?', query.join('&'));
            }
        }
        return result.join('');
    }
}

export = Builder;
