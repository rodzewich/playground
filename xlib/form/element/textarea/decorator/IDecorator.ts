/// <reference path="../../IDecorator.ts" />

module form.element.textarea.decorator {

  import element = form.element;

  export interface IDecorator<C> extends element.IDecorator<C, string> {

    getPlaceholder(): string;
    setPlaceholder(value: string): void;

    getMaxLength(): number;
    setMaxLength(value: number): void;

    getCols(): number;
    setCols(value: number): void;

    getRows(): number;
    setRows(value: number): void;

  }

}