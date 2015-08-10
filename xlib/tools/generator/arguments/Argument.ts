/// <reference path="../../../utils/core.ts" />
/// <reference path="IArgument.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="../types/IType.ts" />
/// <reference path="../types/Type.ts" />

module tools.generator.arguments {

  import types = generator.types;

  class Argument implements IArgument {

    private _desc: string = null;

    private _name: string = null;

    private _type: types.IType = null;

    private _defaults: string = null;

    private _rest: boolean = false;

    private _optional: boolean = false;

    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.defaults)) {
        this.setDefaults(options.defaults);
      }
      if (options && xlib.typeOf(options.desc)) {
        this.setDesc(options.desc);
      }
      if (options && xlib.typeOf(options.name)) {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.optional)) {
        this.setOptional(options.optional);
      }
      if (options && xlib.typeOf(options.rest)) {
        this.setRest(options.rest);
      }
      if (options && xlib.typeOf(options.type)) {
        this.setType(types.create(options.type));
      }
    }

    public getName(): string {
      return this._name || null;
    }

    public setName(value: any): IArgument {
      var temp: string = String(value || '');
      if (!/^[a-z_]\w*$/i.test(temp)) {
        throw new Error('bla bla bla');
      }
      this._name = temp;
      return this;
    }

    public getType(): types.IType {
      return this._type || null;
    }

    public setType(value: types.IType): IArgument {
      this._type = value;
      return this;
    }

    public getDesc(): string {
      return this._desc || null;
    }

    public setDesc(value: any): IArgument {
      var temp: string = String(value || '').
        replace(/^\s*(.*)\s*$/, '$1');
      if (temp.indexOf('\n') !== -1 ||
        temp.indexOf('\r') !== -1) {
        throw new Error('bla bla bla');
      }
      this._desc = temp || null;
      return this;
    }

    public getOptional(): boolean {
      return !!this._optional;
    }

    public isOptional(): boolean {
      return this.getOptional() && this.getDefaults() !== null;
    }

    public setOptional(value: any): IArgument {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(value.replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._optional = temp;
      return this;
    }

    public getRest(): boolean {
      return !!this._rest;
    }

    public isRest(): boolean {
      return this.getRest();
    }

    public setRest(value: any): IArgument {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(value.replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._rest = temp;
      return this;
    }

    public getDefaults(): string {
      return this._defaults || null;
    }

    public setDefaults(value: any): IArgument {
      if (['null', 'boolean', 'number', 'string'].
        indexOf(xlib.typeOf(value)) === -1) {
        throw new Error('bla bla bla');
      }
      if (this.getType() !== null && value !== null &&
        this.getType().toString() !== xlib.typeOf(value)) {
        throw new Error('bla bla bla');
      }
      if (this.getType() === null && value !== null) {
        this.setType(types.create().setValue(value));
      }
      this._defaults = JSON.stringify(value);
      return this;
    }

    public toString() {
      var content: string[] = [];
      if (this.getName() === null) {
        throw new Error('bla bla bla');
      }
      if (this.getType() === null) {
        throw new Error('bla bla bla');
      }
      if (this.getDefaults() !== null && this.isRest()) {
        throw new Error('bla bla bla');
      }
      if (this.isRest()) {
        content.push('...');
      }
      content.push(this.getName());
      if (this.isOptional()) {
        content.push('?');
      }
      content.push(': ');
      content.push(this.getType().toString());
      if (this.isRest()) {
        content.push('[]');
      }
      if (this.getDefaults() !== null) {
        content.push(' = ' + this.getDefaults());
      }
      return content.join('');
    }

  }

  export function create(options?: IOptions): IArgument {
    return new Argument(options);
  }

}
