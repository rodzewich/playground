/// <reference path="../../../utils/core.ts" />
/// <reference path="../types/IType.ts" />
/// <reference path="../types/Type.ts" />
/// <reference path="../Generator.ts" />
/// <reference path="IProperty.ts" />
/// <reference path="IOptions.ts" />

module tools.generator.properties {

  var keywords: string[] = [
    "abstract", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
    "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "final",
    "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int",
    "interface", "let", "long", "native", "new", "package", "private", "protected", "public", "return",
    "short", "static", "super", "switch", "synchronized", "this", "throw", "transient", "try", "typeof", "var",
    "void", "volatile", "while", "with", "yield", "module", "false", "true", "null", "undefined", "constructor"
  ];

  import types = generator.types;

  class Property implements IProperty {

    private _statics: boolean = false;

    private _name: string = null;

    private _defaults: string = null;

    private _type: types.IType = null;

    private _title: string = null;

    private _desc: string = null;

    private _access: string = null;

    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.statics) !== 'undefined') {
        this.setStatics(options.statics);
      }
      if (options && xlib.typeOf(options.access) !== 'undefined') {
        this.setAccess(options.access);
      }
      if (options && xlib.typeOf(options.defaults) !== 'undefined') {
        this.setDefaults(options.defaults);
      }
      if (options && xlib.typeOf(options.desc) !== 'undefined') {
        this.setDesc(options.desc);
      }
      if (options && xlib.typeOf(options.title) !== 'undefined') {
        this.setTitle(options.title);
      }
      if (options && xlib.typeOf(options.type) !== 'undefined') {
        this.setType(options.type);
      }
      if (options && xlib.typeOf(options.name) !== 'undefined') {
        this.setName(options.name);
      }
    }

    public getStatics(): boolean {
      return !!this._statics;
    }

    public isStatics(): boolean {
      return this.getStatics();
    }

    public setStatics(value: any): IProperty {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(value.replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._statics = temp;
      return this;
    }

    public getType(): types.IType {
      return this._type || null;
    }

    public setType(value: types.IType): IProperty {
      this._type = value;
      return this;
    }

    public getName(): string {
      return this._name || null;
    }

    public setName(value: any): IProperty {
      var temp: string = String(value || '');
      if (!/^[a-z_]\w*$/i.test(temp)) {
        throw new Error('bla bla bla');
      }
      if (keywords.indexOf(temp) !== -1) {
        throw new Error('bla bla bla');
      }
      this._name = temp;
      return this;
    }

    public getDefaults(): string {
      return this._defaults || null;
    }

    public setDefaults(value: any): IProperty {
      if (['null', 'boolean', 'number', 'string'].
        indexOf(xlib.typeOf(value)) === -1) {
        throw new Error('bla bla bla');
      }
      if (this.getType() !== null && value !== null &&
        this.getType().toString() !== xlib.typeOf(value)) {
        throw new Error('bla bla bla');
      }
      if (this.getType() === null && value !== null) {
        this.setType(types.create().setValue(xlib.typeOf(value)));
      }
      this._defaults = JSON.stringify(value);
      return this;
    }

    public getTitle(): string {
      return this._title || null;
    }

    public setTitle(value: any): IProperty {
      var temp: string = String(value || '').
        replace(/^\s*(.*)\s*$/, '$1');
      if (temp.indexOf('\n') !== -1 ||
        temp.indexOf('\r') !== -1) {
        throw new Error('bla bla bla');
      }
      this._title = temp || null;
      return this;
    }

    public getDesc(): string {
      return this._desc || null;
    }

    public setDesc(value: any): IProperty {
      var temp: string = String(value || '').
        replace(/^\s*(.*)\s*$/, '$1');
      if (temp.indexOf('\n') !== -1 ||
        temp.indexOf('\r') !== -1) {
        throw new Error('bla bla bla');
      }
      this._desc = temp;
      return this;
    }

    public getAccess(): string {
      return this._access || null;
    }

    public setAccess(value: any): IProperty {
      var temp: string = String(value || '').
        replace(/^\s*(.*)\s*$/, '$1').toLowerCase();
      if (['public', 'private'].indexOf(temp) === -1) {
        throw new Error('bla bla bla');
      }
      this._access = temp;
      return this;
    }

    public getLines(): string[] {
      var lines: string[] = [];
      if (this.getName() === null) {
        throw new Error('bla bla bla');
      }
      if (this.getType() === null) {
        throw new Error('bla bla bla');
      }
      if (this.getTitle() !== null) {
        lines.push('/**');
        lines.push(' * ' + this.getTitle());
        if (this.getDesc() !== null) {
          lines.push(' *');
          lines.push(' * ' + this.getDesc());
        }
        lines.push(' */');
      }
      lines.push([
        this.getAccess() !== null ?
          this.getAccess() + ' ' : '',
        this.isStatics() ? 'static ' : '',
        this.getName(),
        ': ',
        this.getType(),
        this.getDefaults() !== null ?
          ' = ' + this.getDefaults() : '',
        ';'
      ].join(''));
      return lines;
    }

    public toString(): string {
      return this.getLines().join('\n');
    }

  }

  export function create(options?: IOptions): IProperty {
    return new Property(options);
  }

}