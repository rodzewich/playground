module widget.table.mediator {

  export interface IColumn {

    enable(): void;

    disable(): void;

    getValues(): any;

    setValues(values: any): void;

    getContent(): HTMLTableDataCellElement;

  }

}