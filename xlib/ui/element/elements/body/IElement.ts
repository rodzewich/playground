/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.body {

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
    getALink(): string;
    setALink(value: string): void;
    getBackground(): string;
    setBackground(value: string): void;
    getBgColor(): string;
    setBgColor(value: string): void;
    getBgProperties(): string;
    setBgProperties(value: string): void;
    getBottomMargin(): number;
    setBottomMargin(value: number): void;
    getLeftMargin(): number;
    setLeftMargin(value: number): void;
    getLink(): string;
    setLink(value: string): void;
    getRightMargin(): number;
    setRightMargin(value: number): void;
    getScroll(): boolean;
    setScroll(value: boolean): void;
    getTextColor(): string;
    setTextColor(value: string): void;
    getTopMargin(): number;
    setTopMargin(value: number): void;
    getVLink(): string;
    setVLink(value: string): void;
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
    onLoad(listener: (event?: IEvent<T>) => void): void;
    onUnLoad(listener: (event?: IEvent<T>) => void): void;
  }

}