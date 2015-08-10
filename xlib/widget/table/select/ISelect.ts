module widget.table.select {

  export interface ISelect {

    getType(): string;

    getName(): string;

    getTitle(): string;

    getDocument(): Document;

    createContent(callback?: () => void): HTMLTableDataCellElement;

    createHeader(callback?: () => void): HTMLTableHeaderCellElement;

  }

}