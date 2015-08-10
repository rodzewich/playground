/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.style {

  export interface IElement<T> extends elements.IElement<T> {
    getLang(): string;
    setLang(value: any): void;
    getXmlLang(): string;
    setXmlLang(value: any): void;
    getXmlSpace(): string;
    setXmlSpace(value: any): void;
    getDir(): string;
    setDir(value: any): void;
    getType(): string;
    setType(value: any): void;
    getMedia(): string;
    setMedia(value: any): void;
    getTitle(): string;
    setTitle(value: any): void;
  }

}