/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.table {

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
    getAlign(): string;
    setAlign(value: any): void;
    getBackground(): string;
    setBackground(value: any): void;
    getBgColor(): string;
    setBgColor(value: any): void;
    getCols(): string;
    setCols(value: any): void;
    getHeight(): string;
    setHeight(value: any): void;
    getSummary(): string;
    setSummary(value: any): void;
    getWidth(): string;
    setWidth(value: any): void;
    getBorder(): string;
    setBorder(value: any): void;
    getBorderColor(): string;
    setBorderColor(value: any): void;
    getFrame(): string;
    setFrame(value: any): void;
    getRules(): string;
    setRules(value: any): void;
    getCellSpacing(): string;
    setCellSpacing(value: any): void;
    getCellPadding(): string;
    setCellPadding(value: any): void;
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