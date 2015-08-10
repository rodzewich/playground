/// <reference path="../column/IOptions.ts" />

module xlib.utils.database.table {

  import column = database.column;

  export interface IOptions {
    name: string;
    columns?: column.IOptions[];
  }

}