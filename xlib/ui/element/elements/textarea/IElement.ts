/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.textarea {

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
    getAccessKey(): string;
    setAccessKey(value: any): void;
    getTabIndex(): string;
    setTabIndex(value: any): void;
    getName(): string;
    setName(value: any): void;
    getRows(): string;
    setRows(value: any): void;
    getCols(): string;
    setCols(value: any): void;
    getDisabled(): string;
    setDisabled(value: any): void;
    getReadonly(): string;
    setReadonly(value: any): void;
    getAutoFocus(): string;
    setAutoFocus(value: any): void;
    getForm(): string;
    setForm(value: any): void;
    getMaxLength(): string;
    setMaxLength(value: any): void;
    getPlaceholder(): string;
    setPlaceholder(value: any): void;
    getRequired(): string;
    setRequired(value: any): void;
    getWrap(): string;
    setWrap(value: any): void;
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
    onSelect(listener: (event?: IEvent<T>) => void): void;
    onChange(listener: (event?: IEvent<T>) => void): void;
  }

}