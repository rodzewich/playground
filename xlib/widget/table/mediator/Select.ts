/// <reference path="ISelect.ts" />
/// <reference path="../../../utils/core.ts" />

module widget.table.mediator {

  export class Select implements ISelect {

    private getActionCallback: () => any;

    private setActionCallback: (value: any) => void;

    private content: HTMLTableDataCellElement;

    constructor(
      content       : HTMLTableDataCellElement,
      getActionCallback : () => any,
      setActionCallback : (value: any) => void
      ) {
      if (xlib.typeOf(getActionCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      if (xlib.typeOf(setActionCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      this.content = content;
      this.getActionCallback = getActionCallback;
      this.setActionCallback = setActionCallback;
    }

    isChecked(): boolean {
      return !!this.getActionCallback();
    }

    setChecked(value: any): void {
      this.setActionCallback(!!value);
    }

    getContent(): HTMLTableDataCellElement {
      return this.content;
    }

  }

}