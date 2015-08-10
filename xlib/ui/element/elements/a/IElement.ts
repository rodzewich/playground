/// <reference path="../IElement.ts" />
/// <reference path="../IEvent.ts" />

module xlib.ui.element.elements.a {

  import IEvent = elements.IEvent;

  export interface IElement<T> extends elements.IElement<T> {
    getTitle(): string;
    setTitle(value: string): void;
    getDownload(): boolean;
    setDownload(value: boolean): void;
    getTarget(): string;
    setTarget(value: string): void;
    getLang(): string;
    setLang(value: string): void;
    getXmlLang(): string;
    setXmlLang(value: string): void;
    getDir(): string;
    setDir(value: string): void;
    getAccessKey(): string;
    setAccessKey(value: string): void;
    getTabIndex(): number;
    setTabIndex(value: number): void;
    getCharset(): string;
    setCharset(value: string): void;
    getType(): string;
    setType(value: string): void;
    getName(): string;
    setName(value: string): void;
    getHref(): string;
    setHref(value: string): void;
    getHrefLang(): string;
    setHrefLang(value: string): void;
    getRel(): string;
    setRel(value: string): void;
    getRev(): string;
    setRev(value: string): void;
    getShape(): string;
    setShape(value: string): void;
    getCoords(): number[];
    setCoords(value: number[]): void;
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
    onFocus(listener: (event?: IEvent<T>) => void): void;
    onFocusIn(listener: (event?: IEvent<T>) => void): void;
    onFocusOut(listener: (event?: IEvent<T>) => void): void;
    onBlur(listener: (event?: IEvent<T>) => void): void;
  }

}