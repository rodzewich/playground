module widget.table.mediator {

  export interface IExistsRecord {

    getValues(): any;

    setValues(values: any): void;

    isUpdate(): boolean;

    setUpdate(value: boolean): void;

    isRemove(): boolean;

    setRemove(value: boolean): void;

    isCustom(): boolean;

    setCustom(value: boolean): void;

    getContent(): HTMLTableRowElement;

  }

}