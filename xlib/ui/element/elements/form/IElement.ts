/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.form {

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
    getAction(): string;
    setAction(value: string): void;
    getMethod(): string;
    setMethod(value: string): void;
    getEncType(): string;
    setEncType(value: string): void;
    getAccept(): string;
    setAccept(value: string): void;
    getAcceptCharset(): string;
    setAcceptCharset(value: string): void;
    getAutoComplete(): string;
    setAutoComplete(value: string): void;
    getName(): string;
    setName(value: string): void;
    getNoValidate(): boolean;
    setNoValidate(value: boolean): void;
    getTarget(): string;
    setTarget(value: string): void;
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
    onSubmit(listener: (event?: IEvent<T>) => void): void;
    onReset(listener: (event?: IEvent<T>) => void): void;
  }

}