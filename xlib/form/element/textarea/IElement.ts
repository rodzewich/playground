/// <reference path="../IElement.ts" />

module form.element.textarea {

  import element = form.element;

  export interface IElement<C> extends element.IElement<C, string> {

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