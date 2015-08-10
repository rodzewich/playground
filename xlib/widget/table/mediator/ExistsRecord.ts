/// <reference path="../../../core.ts" />
/// <reference path="IExistsRecord.ts" />

module widget.table.mediator {

  export class ExistsRecord implements IExistsRecord {

    private content: HTMLTableRowElement;

    private getValuesCallback: () => any;

    private setValuesCallback: (value: any) => void;

    private getUpdateCallback: () => any;

    private setUpdateCallback: (value: any) => void;

    private getRemoveCallback: () => any;

    private setRemoveCallback: (value: any) => void;

    private getCustomCallback: () => any;

    private setCustomCallback: (value: any) => void;

    constructor(
      content       : HTMLTableRowElement,
      getValuesCallback : () => any,
      setValuesCallback : (values: any) => void,
      getUpdateCallback : () => boolean,
      setUpdateCallback : (value: boolean) => void,
      getRemoveCallback : () => boolean,
      setRemoveCallback : (value: boolean) => void,
      getCustomCallback : () => boolean,
      setCustomCallback : (value: boolean) => void
      ) {
      if (xlib.typeOf(getValuesCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      if (xlib.typeOf(setValuesCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      if (xlib.typeOf(getUpdateCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      if (xlib.typeOf(setUpdateCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      if (xlib.typeOf(getRemoveCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      if (xlib.typeOf(setRemoveCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      if (xlib.typeOf(getCustomCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      if (xlib.typeOf(setCustomCallback) !== 'function') {
        throw new TypeError('bla bla bla');
      }
      this.content = content;
      this.getValuesCallback = getValuesCallback;
      this.setValuesCallback = setValuesCallback;
      this.getUpdateCallback = getUpdateCallback;
      this.setUpdateCallback = setUpdateCallback;
      this.getRemoveCallback = getRemoveCallback;
      this.setRemoveCallback = setRemoveCallback;
      this.getCustomCallback = getCustomCallback;
      this.setCustomCallback = setCustomCallback;
    }

    getValues(): any {
      return xlib.clone(this.getValuesCallback(), true);
    }

    setValues(values: any): void {
      this.setValuesCallback(xlib.clone(values, true));
    }

    isUpdate(): boolean {
      return !!this.getUpdateCallback();
    }

    setUpdate(value: boolean): void {
      this.setUpdateCallback(!!value);
      if (value) {
        this.setRemoveCallback(false);
        this.setCustomCallback(false);
      }
    }

    isRemove(): boolean {
      return !!this.getRemoveCallback();
    }

    setRemove(value: boolean): void {
      this.setRemoveCallback(!!value);
      if (value) {
        this.setUpdateCallback(false);
        this.setCustomCallback(false);
      }
    }

    isCustom(): boolean {
      return !!this.getCustomCallback();
    }

    setCustom(value: boolean): void {
      this.setCustomCallback(!!value);
      if (value) {
        this.setUpdateCallback(false);
        this.setCustomCallback(false);
      }
    }

    getContent(): HTMLTableRowElement {
      return this.content;
    }

    getPrimary(): any[] {
      return [];
    }

  }

}