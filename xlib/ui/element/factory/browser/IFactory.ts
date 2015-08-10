/// <reference path="../IFactory.ts" />

module xlib.ui.element.factory.browser {

  export interface IFactory extends factory.IFactory<HTMLElement> {
    setDocument(value: Document): void;
    getDocument(): Document;
  }

}