/// <reference path="IConstructor.ts" />
/// <reference path="../Generator.ts" />
/// <reference path="../arguments/IArgument.ts" />
/// <reference path="../arguments/Argument.ts" />

module tools.generator.constructors {

  import arguments = generator.arguments;

  class Constructor implements IConstructor {

    private _title: string = null;

    private _desc: string = null;

    private _content: generator.Generator = new generator.Generator();

    private _arguments: arguments.IArgument[] = [];

    public getName(): string {
      return 'constructor';
    }

    public getTitle(): string {
      return this._title || null;
    }

    public setTitle(value: any): IConstructor {
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
      return this._desc;
    }

    public setDesc(value: any): IConstructor {
      var temp: string = String(value || '').
        replace(/^\s*(.*)\s*$/, '$1');
      if (temp.indexOf('\n') !== -1 ||
        temp.indexOf('\r') !== -1) {
        throw new Error('bla bla bla');
      }
      this._desc = temp;
      return this;
    }

    public addLine(value: any): IConstructor {
      this._content.addLine(value);
      return this;
    }

    public getLines(): string[] {
      var lines: string[] = [],
        content: string[] = this._content.getLines(),
        length: number = content.length,
        index: number;
      if (this.getTitle() !== null) {
        lines.push('/**');
        lines.push(' * ' + this.getTitle());
        if (this.getDesc() !== null) {
          lines.push(' *');
          lines.push(' * ' + this.getDesc());
        }
        lines.push(' */');
      }
      lines.push(this.getName() + '(' + this._arguments.join(', ') + ') {');
      for (index = 0; index < length; index++) {
        lines.push('  ' + content[index]);
      }
      lines.push('}');
      return lines;
    }

    public addArgument(argument: arguments.IArgument): IConstructor {
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

  export function create(): IConstructor {
    return new Constructor();
  }

}