/// <reference path="../mediator/Column.ts"/>

module widget.table.column {

  import mediator = widget.table.mediator;

  export interface IColumn {

    getAlign(): string;

    getVerticalAlign(): string;

    getName(): string;

    getType(): string;

    getTitle(): string;

    getDocument(): Document;

    createContent(arg1?: any, arg2?: any): mediator.IColumn;

    createHeader(): HTMLElement;

  }

}