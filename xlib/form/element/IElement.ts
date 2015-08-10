/// <reference path="../../core.ts" />
/// <reference path="./IDecorator.ts" />

module form.element {

  export interface IElement<C, T> extends xlib.IUsesDisabled, xlib.IUsesDecorator<IDecorator<C, T>, C>, xlib.IUsedValue<T> {

    getName(): string;
    setName(value: string): void;

    getId(): string;
    setId(value: string): void;

    isDisabled(): boolean;
    setDisabled(value: boolean): void;

    isRequired(): boolean;
    setRequired(value: boolean): void;

    isReadonly(): boolean;
    setReadonly(value: boolean): void;

  }

}