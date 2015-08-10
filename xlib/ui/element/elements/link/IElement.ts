/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.link {

  import IEvent = elements.IEvent;

  export interface IElement<T> extends elements.IElement<T> {
    getTitle(): string;
    setTitle(value: any): void;
    getLang(): string;
    setLang(value: any): void;
    getXmlLang(): string;
    setXmlLang(value: any): void;
    getDir(): string;
    setDir(value: any): void;
    getCharset(): string;
    setCharset(value: any): void;
    getHref(): string;
    setHref(value: any): void;
    getHrefLang(): string;
    setHrefLang(value: any): void;
    getType(): string;
    setType(value: any): void;
    getRel(): string;
    setRel(value: any): void;
    getRev(): string;
    setRev(value: any): void;
    getMedia(): string;
    setMedia(value: any): void;
    getSizes(): string;
    setSizes(value: any): void;
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