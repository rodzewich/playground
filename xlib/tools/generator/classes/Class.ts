/// <reference path="../../../core.ts" />
/// <reference path="IEntity.ts" />
/// <reference path="IClass.ts" />
/// <reference path="../IGenerator.ts" />
/// <reference path="../Generator.ts" />

module tools.generator.classes {

  class Class extends generator.Generator implements IClass {

    private _title: string = null;

    private _desc: string = null;

    private _exports: boolean = false;

    private _name: string = null;

    private _extend: string = null;

    private _interfaces: string[] = [];

    private _entities: IEntity[] = [];

    addEntity(value: IEntity): IClass {
      var index: number,
        length: number = this._entities.length;
      for (index = 0; index < length; index++) {
        if (this._entities[index].getName() === value.getName()) {
          throw new Error('bla bla bla');
        }
      }
      this._entities.push(value);
      return this;
    }

    getEntities(): IEntity[] {
      return this._entities.slice(0);
    }

    public getTitle(): string {
      return this._title || null;
    }

    public setTitle(value: any): IClass {
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

    public setDesc(value: any): IClass {
      var temp: string = String(value || '').
        replace(/^\s*(.*)\s*$/, '$1');
      if (temp.indexOf('\n') !== -1 ||
        temp.indexOf('\r') !== -1) {
        throw new Error('bla bla bla');
      }
      this._desc = temp;
      return this;
    }

    public getExport(): boolean {
      return !!this._exports;
    }

    public isExport(): boolean {
      return this.getExport();
    }

    public setExports(value: any): IClass {
      var temp: boolean = !!value;
      if (xlib.typeOf(value) === 'string' &&
        ['', 'false', 'off', 'no', '0'].indexOf(value.replace(/^\s*(.*)\s*$/g, '$1').toLowerCase()) !== -1) {
        temp = false;
      }
      this._exports = temp;
      return this;
    }

    public getName(): string {
      return this._name || null;
    }

    public setName(value: any) {
      var temp: string = String(value || '');
      if (!/^[a-z_]\w*$/i.test(temp)) {
        throw new Error('bla bla bla');
      }
      this._name = temp;
      return this;
    }

    public getExtend(): string {
      return this._extend || null;
    }

    public setExtend(value: any): Class {
      var temp: string = String(value || '');
      if (!/^[a-z_]\w*(?:\.[a-z_]\w*)*$/i.test(temp)) {
        throw new Error('bla bla bla');
      }
      this._extend = temp;
      return this;
    }

    public addInterface(value: any): IClass {
      var temp: string = String(value || '');
      if (!/^[a-z_]\w*(?:\.[a-z_]\w*)*$/i.test(temp)) {
        throw new Error('bla bla bla');
      }
      if (this._interfaces.indexOf(temp) !== -1) {
        throw new Error('bla bla bla');
      }
      this._interfaces.push(temp);
      return this;
    }

    public getInterfaces(): string[] {
      return this._interfaces.slice(0);
    }

    public getLines(): string[] {
      var index1: number,
        index2: number,
        length1: number,
        length2: number,
        list: string[],
        lines: string[] = [];
      if (this.getTitle() !== null) {
        lines.push('/**');
        lines.push(' * ' + this.getTitle());
        if (this.getDesc() !== null) {
          lines.push(' *');
          lines.push(' * ' + this.getDesc());
        }
        lines.push(' */');
      }
      lines.push(
        (this.isExport() ? 'export ' : '') +
        'class ' + this.getName() +
        (this.getExtend() !== null ? ' extends ' + this.getExtend() : '') +
        (this.getInterfaces().length ? ' implements ' + this.getInterfaces().join(', ') : '') +
        ' {');
      lines.push('');
      length1 = this._entities.length;
      for (index1 = 0; index1 < length1; index1++) {
        list = this._entities[index1].getLines();
        length2 = list.length;
        for (index2 = 0; index2 < length2; index2++) {
          lines.push('  ' + list[index2]);
        }
        lines.push('');
      }
      lines.push('}');
      return lines;
    }

  }

  export function create(): IClass {
    return new Class();
  }

}