/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.head {

  export interface IElement<T> extends elements.IElement<T> {
    getLang(): string;
    setLang(value: string): void;
    getXmlLang(): string;
    setXmlLang(value: string): void;
    getDir(): string;
    setDir(value: string): void;
    getProfile(): string;
    setProfile(value: string): void;
  }

}