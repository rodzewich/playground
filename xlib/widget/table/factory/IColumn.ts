/// <reference path="../column/IColumn.ts" />

module widget.table.factory {

  import column = table.column;

  export interface IColumn {

    getDocument(): Document;

    getNames(): string[];

    createColumn(name: string): column.IColumn;

    getColumn(name: string): column.IColumn;

  }

}
