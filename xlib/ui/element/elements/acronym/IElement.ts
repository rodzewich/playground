/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.acronym {

  import IEvent = elements.IEvent;

  export interface IElement<T> extends elements.IElement<T> {
    setTitle(value: string): void;
    getTitle(): string;
    setLang(value: string): void;
    getLang(): string;
    setXmlLang(value: string): void;
    getXmlLang(): string;
    setDir(value: string): void;
    getDir(): string;
    onClick(listener: (event?: IEvent<T>) => void): void;
    onDblClick(listener: (event?: IEvent<T>) => void): void;
    onMouseDown(listener: (event?: IEvent<T>) => void): void;
    onMouseUp(listener: (event?: IEvent<T>) => void): void;
    onMouseOver(listener: (event?: IEvent<T>) => void): void;
    onMouseMove(listener: (event?: IEvent<T>) => void): void;
    onMouseOut(listener: (event?: IEvent<T>) => void): void;
    onKeyPress(listener: (event?: IEvent<T>) => void): void;
    onKeyDown(listener: (event?: IEvent<T>) => void): void;
    onKeyUp(listener: (event?: IEvent<T>) => void): void;
  }

}