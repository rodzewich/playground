/// <reference path="IMethod.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="../Generator.ts" />
/// <reference path="../Access.ts" />
/// <reference path="../arguments/IArgument.ts" />
/// <reference path="../arguments/Argument.ts" />

module tools.generator.methods {

  var keywords: string[] = [
    "abstract", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
    "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "final",
    "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int",
    "interface", "let", "long", "native", "new", "package", "private", "protected", "public", "return",
    "short", "static", "super", "switch", "synchronized", "this", "throw", "transient", "try", "typeof", "var",
    "void", "volatile", "while", "with", "yield", "module", "false", "true", "null", "undefined", "constructor"
  ];

  import Access  = generator.Access;
  import arguments = generator.arguments;
  import types   = generator.types;

  class Method implements IMethod {

    private _access: Access = Access.NONE;

    private _title: string = null;

    private _desc: string = null;

    private _name: string = null;

    private _type: types.IType = null;

    private _content: generator.Generator = new generator.Generator();

    private _arguments: arguments.IArgument[] = [];

    private _statics: boolean = false;

    constructor(options?: IOptions) {
      var index: number,
        length: number;
      if (options && xlib.typeOf(options.access) !== 'undefined') {
        this.setAccess(options.access);
      }
      if (options && xlib.typeOf(options.arguments) !== 'undefined') {
        if (xlib.typeOf(options.arguments) !== 'array') {
          throw new Error('bla bla bla');
        }
        length = options.arguments.length;
        for (index = 0; index < length; index++) {
          this.addArgument(options.arguments[index]);
        }
      }
      if (options && xlib.typeOf(options.desc) !== 'undefined') {
        this.setDesc(options.desc);
      }
      if (options && xlib.typeOf(options.lines) !== 'undefined') {
        if (xlib.typeOf(options.lines) !== 'array') {
          throw new Error('bla bla bla');
        }
        length = options.lines.length;
        for (index = 0; index < length; index++) {
          this.addLine(options.lines[index]);
        }
      }
      if (options && xlib.typeOf(options.name) !== 'undefined') {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.static) !== 'undefined') {
        this.setStatics(options.static);
      }
      if (options && xlib.typeOf(options.title) !== 'undefined') {
        this.setTitle(options.title);
      }
      if (options && xlib.typeOf(options.type) !== 'undefined') {
        this.setType(options.type);
      }
    }

    public getStatics(): boolean {
      return !!this._statics;
    }

    public isStatics(): boolean {
      return this.getStatics();
    }

    public setStatics(value: any): IMethod {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(value.replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._statics = temp;
      return this;
    }

    public getAccess(): Access {
      var values: Access[] = [
        Access.NONE,
        Access.PRIVATE,
        Access.PUBLIC
      ];
      if (values.indexOf(this._access) === -1) {
        return Access.NONE;
      }
      return this._access;
    }

    public setAccess(value: Access): IMethod {
      var values: Access[] = [
        Access.NONE,
        Access.PRIVATE,
        Access.PUBLIC
      ];
      if (values.indexOf(value) === -1) {
        throw new Error('bla bla bla');
      }
      this._access = value;
      return this;
    }

    public getTitle(): string {
      return this._title || null;
    }

    public setTitle(value: any): IMethod {
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

    public setDesc(value: any): IMethod {
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
      return this._name;
    }

    public setName(value: any): IMethod {
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

    public getType(): types.IType {
      return this._type;
    }

    public setType(value: types.IType): IMethod {
      this._type = value;
      return this;
    }

    public addLine(value: any): IMethod {
      this._content.addLine(value);
      return this;
    }

    public getLines(): string[] {
      var lines: string[] = [],
        content: string[] = this._content.getLines(),
        length: number = content.length,
        args: arguments.IArgument[] = this.getArguments(),
        index: number,
        access: string;
      if (this.getTitle() !== null) {
        lines.push('/**');
        lines.push(' * ' + this.getTitle());
        if (this.getDesc() !== null) {
          lines.push(' *');
          lines.push(' * ' + this.getDesc());
        }
        if (args.length !== 0) {
          lines.push(' *');
          length = args.length;
          for (index = 0; index < length; index++) {
            lines.push(' * @param ' + args[index].getName() + (args[index].getDesc() !== null ? ' ' + args[index].getDesc() : ''));
          }
        }
        lines.push(' */');
      }
      switch(this.getAccess()) {
        case Access.PRIVATE:
          access = 'private ';
          break;
        case Access.PUBLIC:
          access = 'public ';
          break;
        default:
          access = '';
          break;
      }
      lines.push(access + (this.isStatics() ? 'static ' : '') + this.getName() + '(' + this._arguments.join(', ') + '): ' + this.getType().toString() + ' {');
      length = content.length;
      for (index = 0; index < length; index++) {
        lines.push('  ' + content[index]);
      }
      lines.push('}');
      return lines;
    }

    public addArgument(argument: arguments.IArgument): IMethod {
      var index: number,
        length: number = this._arguments.length;
      for (index = 0; index < length; index++) {
        if (this._arguments[index].isRest()) {
          throw new Error('bla bla bla');
        }
        if (this._arguments[index].getName() === argument.getName()) {
          throw new Error('bla bla bla');
        }
      }
      this._arguments.push(argument);
      return this;
    }

    public getArguments(): arguments.IArgument[] {
      return this._arguments.slice(0);
    }

    public toString(): string {
      return this.getLines().join('\n');
    }

  }

  export function create(options?: IOptions): IMethod {
    return new Method(options);
  }

}