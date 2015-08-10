/// <reference path="../../../utils/core.ts" />
/// <reference path="IEnum.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="./entity/IEntity.ts" />
/// <reference path="./entity/Entity.ts" />

module tools.generator.enums {

  var keywords: string[] = [
    "abstract", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
    "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "final",
    "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int",
    "interface", "let", "long", "native", "new", "package", "private", "protected", "public", "return",
    "short", "static", "super", "switch", "synchronized", "this", "throw", "transient", "try", "typeof", "var",
    "void", "volatile", "while", "with", "yield", "module", "false", "true", "null", "undefined", "constructor"
  ];

  import entity = enums.entity;

  export class Enum implements IEnum {

    private _name: string = null;

    private _title: string = null;

    private _desc: string = null;

    private _exports: boolean = null;

    private _entities: entity.IEntity[] = [];

    constructor(options?: IOptions) {
      var index: number,
        length: number;
      if (options && xlib.typeOf(options.name)) {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.title)) {
        this.setTitle(options.title);
      }
      if (options && xlib.typeOf(options.desc)) {
        this.setDesc(options.desc);
      }
      if (options && xlib.typeOf(options.exports)) {
        this.setExports(options.exports);
      }
      if (options && xlib.typeOf(options.entities)) {
        if (xlib.typeOf(options.entities) !== 'array') {
          throw new Error('bla bla bla');
        }
        length = options.entities.length;
        for (index = 0; index < length; index++) {
          this.addEntity(entity.create(options.entities[index]));
        }
      }
    }

    public getTitle(): string {
      return this._title || null;
    }

    public setTitle(value: any): IEnum {
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

    public setDesc(value: string): IEnum {
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

    public setName(value: string): IEnum {
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

    public getExport(): boolean {
      return !!this._exports;
    }

    public isExport(): boolean {
      return this.getExport();
    }

    public setExports(value: any): IEnum {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(value.replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._exports = temp;
      return this;
    }

    public addEntity(value: entity.IEntity): IEnum {
      this._entities.push(value);
      return this;
    }

    public getEntities(): entity.IEntity[] {
      return this._entities.slice(0);
    }

  }

  export function create(options?: IOptions): IEnum {
    return new Enum(options);
  }

}