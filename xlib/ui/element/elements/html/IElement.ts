/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.html {

  export interface IElement<T> extends elements.IElement<T> {
    getLang(): string;
    setLang(value: string): void;
    getXmlLang(): string;
    setXmlLang(value: string): void;
    getDir(): string;
    setDir(value: string): void;
    getXmlNS(): string;
    setXmlNS(value: string): void;
  }

}