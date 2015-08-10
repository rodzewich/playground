/// <reference path="../../core.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="Type.ts" />

module xlib.utils.database.column {

  var keywrods: string[] = [];

  export class Column {
    private _name: string = null;
    private _type: column.Type = null;
    private _default: any = null;
    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.name) !== 'undefined') {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.type) !== 'undefined') {
        this.setType(options.type);
      }
      if (options && xlib.typeOf(options.defaults) !== 'undefined') {
        this.setDefault(options.defaults);
      }
    }
    getName(): string {
      return this._name;
    }
    setName(value: string): void {
      var temp: string = String(value || '');
      if (!/^[a-z_]\w*$/.test(temp)) {
        throw new Error('bla bla bla');
      } else if (keywrods.indexOf(temp) !== -1) {
        throw new Error('bla bla bla');
      }
      this._name = temp;
    }
    getType(): any {
      return this._type;
    }
    setType(value: any): void {
      var temp: string = String(value || '').toUpperCase(),
        keys: string[] = Object.keys(column.Type);
      if (value === null) {
        this._type = null;
      } else if (/^\d+$/.test(temp) &&
        keys.indexOf(temp) !== -1) {
        this._type = parseInt(temp);
      } else if (xlib.typeOf(value) === 'string' &&
        keys.indexOf(temp) !== -1) {
        this._type = column.Type[temp];
      } else {
        throw new Error('bla bla bla');
      }
    }


    getDefault(): any {
      return this._default;
    }
    setDefault(value: any): void {
      // todo: fix this
      this._default = value;
    }

  }

}