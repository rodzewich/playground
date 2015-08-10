/// <reference path="../IOptions.ts" />

module form.element.textarea.decorator.document {

  import decorator = form.element.textarea.decorator;

  export interface IOptions extends decorator.IOptions {
    document?: Document;
  }

}