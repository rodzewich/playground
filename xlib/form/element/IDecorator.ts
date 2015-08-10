/// <reference path="../../core.ts" />

module form.element {

  export interface IDecorator<C, V> extends xlib.IUsedValue<V> {
    getContent(): C;

    getName(): string;
    setName(value: string);

    getId(): string;
    setId(value: string): void;

    isReadonly(): boolean;
    setReadonly(value: boolean): void;

    isRequired(): boolean;
    setRequired(value: boolean): void;

    isDisabled(): boolean;
    setDisabled(value: boolean): void;
  }

}
