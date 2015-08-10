/// <reference path="Type.ts" />

module xlib.utils.database.column {

  export interface IColumn {

    getName(): string;

    getType(): column.Type;
    setType(value: column.Type): void;
    setType(value: string): void;

  }

}