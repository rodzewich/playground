/// <reference path="../../../../../core.ts" />
/// <reference path="../IDecorator.ts" />

module form.element.textarea.decorator.document {

  import decorator = form.element.textarea.decorator;

  export interface IDecorator extends decorator.IDecorator<HTMLElement>, xlib.IUsedDocument {
    createContent(): HTMLElement;
    createElement(): HTMLElement;
    getElement(): HTMLElement;
  }

}