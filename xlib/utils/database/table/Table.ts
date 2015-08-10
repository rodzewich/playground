/// <reference path="../../core.ts" />
/// <reference path="../column/IColumn.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="ITable.ts" />

module xlib.utils.database.table {

  import column = database.column;

  export class Table implements ITable {
    private _name: string = null;
    private _columns: column.IColumn[] = [];
    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.name) !== 'undefined') {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.columns) !== 'undefined') {
        this.addColumns(options.columns);
      }
    }
    public getName(): string {
      return this._name;
    }
    public setName(value: string): void {
      var temp: string = String(value || '');
      if (!/^[a-z0-9]\w*$/.test(temp)) {
        throw new Error('bla bla bla');
      }
      this._name = temp;
    }
    public addColumn(value: column.IColumn): void {
      var index: number,
        length: number = this._columns.length;
      if (!value || xlib.typeOf(value.getName) !== 'function') {
        throw new Error('bla bla bla');
      }
      for (index = 0; index < length; index++) {
        if (value.getName() === this._columns[index].getName()) {
          throw new Error('bla bla bla');
        }
      }
      this._columns.push(value);
    }
    public getColumn(name: string): column.IColumn {
      var index: number,
        length: number = this._columns.length,
        element: column.IColumn;
      for (index = 0; index < length; index++) {
        element = this._columns[index];
        if (element.getName() === name) {
          return element;
        }
      }
      throw new Error('bla bla bla');
    }
    public addColumns(value: column.IColumn[]): void {
      var index: number,
        length: number;
      if (xlib.typeOf(value) !== 'array') {
        throw new Error('bla bla bla');
      }
      length = value.length;
      for (index = 0; index < length; index++) {
        this.addColumn(value[index]);
      }
    }
    public getColumns(): column.IColumn[] {
      return this._columns.slice(0);
    }

  }

}