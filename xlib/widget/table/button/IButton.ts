module widget.table.button {

  export interface IButton {

    getType(): string;

    getName(): string;

    getTitle(): string;

    createContent(callback?: () => void): HTMLTableDataCellElement;

    createHeader(): HTMLElement;

  }

}