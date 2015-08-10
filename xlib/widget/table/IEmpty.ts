module widget.table {

  export interface IEmpty {
    getDocument(): Document;
    createHeader(): HTMLElement;
    createContent(): HTMLTableDataCellElement;
  }

}