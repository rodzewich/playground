/// <reference path="../../../utils/core.ts" />
/// <reference path="IType.ts" />
/// <reference path="IOptions.ts" />

module tools.generator.types {

  var keywords: string[] = [
    "abstract", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
    "continue", "debug" + "ger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "final",
    "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int",
    "interface", "let", "long", "native", "new", "package", "private", "protected", "public", "return",
    "short", "static", "super", "switch", "synchronized", "this", "throw", "transient", "try", "typeof", "var",
    "void", "volatile", "while", "with", "yield", "module", "false", "true", "null", "undefined", "constructor"
  ];

  class Type implements IType {

    private _value: string = null;

    private _arguments: IType[] = [];

    private _array: boolean = false;

    constructor(options?: IOptions) {
      var index: number,
        length: number;
      if (options && xlib.typeOf(options.value) !== 'undefined') {
        this.setValue(options.value);
      }
      if (options && xlib.typeOf(options.array) !== 'undefined') {
        this.setArray(options.array);
      }
      if (options && xlib.typeOf(options.arguments) !== 'undefined') {
        if (xlib.typeOf(options.arguments) !== 'array') {
          throw new Error('bla bla bla');
        }
        length = options.arguments.length;
        for (index = 0; index < length; index++) {
          this.addArgument(types.create(options.arguments[index]));
        }
      }
    }

    public getValue(): string {
      return this._value || null;
    }

    public setValue(value: any): IType {
      var temp: string[] = String(value || '').split('.'),
        length: number = temp.length,
        index: number;
      if (!/^[a-z_]\w*(?:\.[a-z_]\w*)*$/i.test(temp.join('.'))) {
        throw new Error('bla bla bla');
      }
      for (index = 0; index < length; index++) {
        if (keywords.indexOf(temp[index]) !== -1) {
          throw new Error('bla bla bla');
        }
      }
      this._value = temp.join('.');
      return this;
    }

    public getArray(): boolean {
      return !!this._array;
    }

    public isArray(): boolean {
      return this.getArray();
    }

    public setArray(value: any): IType {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(value.replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._array = temp;
      return this;
    }

    public addArgument(value: IType): IType {
      this._arguments.push(value);
      return this;
    }

    public getArguments(): IType[] {
      return this._arguments.slice(0);
    }

    public toString(): string {
      var arguments: IType[];
      if (this.getValue() === null) {
        throw new Error('bla bla bla');
      }
      arguments = this.getArguments();
      return [
        this.getValue(),
        arguments.length !== 0 ? '<' + arguments.join(', ') + '>' : '',
        this.isArray() ? '[]' : ''
      ].join('');
    }

  }

  export function create(options?: IOptions): IType {
    return new Type(options);
  }

}
