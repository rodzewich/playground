/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.meta {

  import IEvent = elements.IEvent;

  export interface IElement<T> extends elements.IElement<T> {
    getLang(): string;
    setLang(value: any): void;
    getXmlLang(): string;
    setXmlLang(value: any): void;
    getDir(): string;
    setDir(value: any): void;
    getHttpEquiv(): string;
    setHttpEquiv(value: any): void;
    getName(): string;
    setName(value: any): void;
    getContent(): string;
    setContent(value: any): void;
    getScheme(): string;
    setScheme(value: any): void;
  }

}