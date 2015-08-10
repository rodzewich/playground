module widget.table.mediator {

  export interface ISelect {

    isChecked(): boolean;

    setChecked(value: any): void;

    getContent(): HTMLTableDataCellElement;

  }

}