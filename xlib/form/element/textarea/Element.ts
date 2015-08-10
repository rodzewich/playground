/// <reference path="./IElement.ts" />
/// <reference path="./decorator/IDecorator.ts" />
/// <reference path="../Element.ts" />

module form.element.textarea {

  import element = form.element;
  import decorator = form.element.textarea.decorator;

  export class Element<C> extends element.Element<C, string> implements IElement<C> {

    private placeholder: decorator.IDecorator<C> = null;

    public getPlaceholder(): string {
      return null;
    }

    public setPlaceholder(value: string): void {

    }

    public getMaxLength(): number {
      return null;
    }

    public setMaxLength(value: number): void {

    }

    public getCols(): number {
      return null;
    }

    setCols(value: number): void {

    }

    getRows(): number {
      return null;
    }

    setRows(value: number): void {

    }

  }

}