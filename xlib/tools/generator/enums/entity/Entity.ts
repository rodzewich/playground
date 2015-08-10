/// <reference path="IEntity.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="../../../../utils/core.ts" />

module tools.generator.enums.entity {

  var keywords: string[] = [
    "abstract", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
    "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "final",
    "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int",
    "interface", "let", "long", "native", "new", "package", "private", "protected", "public", "return",
    "short", "static", "super", "switch", "synchronized", "this", "throw", "transient", "try", "typeof", "var",
    "void", "volatile", "while", "with", "yield", "module", "false", "true", "null", "undefined", "constructor"
  ];

  class Entity implements IEntity {

    private _title: string = null;

    private _desc: string = null;

    private _name: string = null;

    private _value: number = null;

    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.name) !== 'undefined') {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.value) !== 'undefined') {
        this.setValue(options.value);
      }
      if (options && xlib.typeOf(options.title) !== 'undefined') {
        this.setTitle(options.title);
      }
      if (options && xlib.typeOf(options.desc) !== 'undefined') {
        this.setDesc(options.desc);
      }
    }

    public getTitle(): string {
      return this._title || null;
    }

    public setTitle(value: any): IEntity {
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

    public setDesc(value: any): IEntity {
      var temp: string = String(value || '').
        replace(/^\s*(.*)\s*$/, '$1');
      if (temp.indexOf('\n') !== -1 ||
        temp.indexOf('\r') !== -1) {
        throw new Error('bla bla bla');
      }
      this._desc = temp;
      return this;
    }

    public getName(): string {
      return this._name || null;
    }

    public setName(value: any): IEntity {
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

    public getValue(): number {
      return this._value || null;
    }

    public setValue(value: number): IEntity {
      var temp: string = String(value || '');
      if (!/^-?\d+(?:\.\d+)?$/.test(temp)) {
        throw new Error('bla bla bla');
      }
      this._value = value;
      return this;
    }

    public getLines(): string[] {
      var content: string[] = [];
      if (this.getTitle() !== null || this.getDesc() !== null) {
        content.push('/**');
        if (this.getTitle() !== null) {
          content.push(' * ' + this.getTitle());
        }
        if (this.getTitle() !== null && this.getDesc() !== null) {
          content.push(' *');
        }
        if (this.getDesc() !== null) {
          content.push(' * ' + this.getDesc());
        }
        content.push(' */');
        content.push(this.getName() + (this.getValue() !== null ? ' = ' + this.getValue() : ''));
      }
      return content;
    }

    public toString(): string {
      return this.getLines().join('\n');
    }

  }

  export function create(options?: IOptions): IEntity {
    return new Entity(options);
  }

}