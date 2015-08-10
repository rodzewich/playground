/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.img {

  import IEvent = elements.IEvent;

  export interface IElement<T> extends elements.IElement<T> {
    getTitle(): string;
    setTitle(value: string): void;
    getLang(): string;
    setLang(value: string): void;
    getXmlLang(): string;
    setXmlLang(value: string): void;
    getDir(): string;
    setDir(value: string): void;
    getSrc(): string;
    setSrc(value: string): void;
    getAlt(): string;
    setAlt(value: string): void;
    getLongDesc(): string;
    setLongDesc(value: string): void;
    getHeight(): string;
    setHeight(value: string): void;
    getWidth(): string;
    setWidth(value: string): void;
    getUseMap(): string;
    setUseMap(value: string): void;
    getIsMap(): string;
    setIsMap(value: string): void;
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