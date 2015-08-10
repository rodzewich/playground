module widget.table.mediator {

  export interface INewRecord {

    enable(): void;

    disable(): void;

    getValues(): any;

    setValues(values: any): void;

    getContent(): HTMLTableRowElement;

  }

}