/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.button {

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
    getName(): string;
    setName(value: string): void;
    getValue(): string;
    setValue(value: string): void;
    getType(): string;
    setType(value: string): void;
    getDisabled(): boolean;
    setDisabled(value: boolean): void;
    getAccessKey(): string;
    setAccessKey(value: string): void;
    getTabIndex(): number;
    setTabIndex(value: number): void;
    getAutoFocus(): boolean;
    setAutoFocus(value: boolean): void;
    getForm(): string;
    setForm(value: string): void;
    getFormAction(): string;
    setFormAction(value: string): void;
    getFormEnctype(): string;
    setFormEnctype(value: string): void;
    getFormMethod(): string;
    setFormMethod(value: string): void;
    getFormNovalidate(): boolean;
    setFormNovalidate(value: boolean): void;
    getFormTarget(): string;
    setFormTarget(value: string): void;
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