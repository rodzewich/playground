/// <reference path="INewRecord.ts" />
/// <reference path="../../../utils/core.ts" />

module widget.table.mediator {

  export class NewRecord implements INewRecord{

    private content: HTMLTableRowElement;

    private getActionCallback: () => any;

    private setActionCallback: (value: any) => void;

    constructor(
      content       : HTMLTableRowElement,
      getActionCallback : () => any,
      setActionCallback : (values: any) => void
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

    enable(): void {}

    disable(): void {}

    getValues(): any {
      var values: any = this.getActionCallback();
      return xlib.clone(values, true);
    }

    setValues(values: any): void {
      this.setActionCallback(xlib.clone(values, true));
    }

    getContent(): HTMLTableRowElement {
      return this.content;
    }

  }

}