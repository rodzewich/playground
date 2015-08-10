/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.col {

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
    getSpan(): number;
    setSpan(value: number): void;
    getWidth(): string;
    setWidth(value: string): void;
    getAlign(): string;
    setAlign(value: string): void;
    getChar(): string;
    setChar(value: string): void;
    getCharOff(): number;
    setCharOff(value: number): void;
    getVAlign(): string;
    setVAlign(value: string): void;
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