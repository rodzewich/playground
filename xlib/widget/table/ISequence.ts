module widget.table {

  export interface ISequence {
    getDocument(): Document;
    createHeader(): HTMLElement;
    createContent(value: number): HTMLTableDataCellElement;
  }


}