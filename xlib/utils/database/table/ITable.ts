/// <reference path="../column/IColumn.ts" />

module xlib.utils.database.table {

  export interface ITable {
    getName(): string;
    setName(value: string): void;
    getColumn(name: string): column.IColumn;
    addColumn(value: column.IColumn): void;
    getColumns(): column.IColumn[];
    addColumns(values: column.IColumn[]): void;
  }

}