/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.th {

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
    getAbbr(): string;
    setAbbr(value: any): void;
    getAxis(): string;
    setAxis(value: any): void;
    getHeaders(): string;
    setHeaders(value: any): void;
    getScope(): string;
    setScope(value: any): void;
    getRowSpan(): string;
    setRowSpan(value: any): void;
    getColSpan(): string;
    setColSpan(value: any): void;
    getAlign(): string;
    setAlign(value: any): void;
    getChar(): string;
    setChar(value: any): void;
    getCharOff(): string;
    setCharOff(value: any): void;
    getVAlign(): string;
    setVAlign(value: any): void;
    getBackground(): string;
    setBackground(value: any): void;
    getBgColor(): string;
    setBgColor(value: any): void;
    getBorderColor(): string;
    setBorderColor(value: any): void;
    getHeight(): string;
    setHeight(value: any): void;
    getNoWrap(): string;
    setNoWrap(value: any): void;
    getWidth(): string;
    setWidth(value: any): void;
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