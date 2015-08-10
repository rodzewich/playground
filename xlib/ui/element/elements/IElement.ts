/// <reference path="IEvent.ts" />

module xlib.ui.element.elements {

  export interface IElement<T> {
    getTag(): string;
    getText(): string;
    setText(value: string): void;
    getHtml(): string;
    setHtml(value: string): void;
    getParent(): IElement<T>;
    setParent(value: IElement<T>): void;
    allowChildren(): boolean;
    allowTags(): string[];
    allowText(): boolean;
    allowHtml(): boolean;
    attributesDeny(): string[];
    attributesAllow(): string[];
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string;
    hasAttribute(name: string): boolean;
    removeAttribute(name: string): void;
    getAttributes(): any;
    removeId(): void;
    setId(value: string): void;
    getId(): string;
    addClass(name: string): void;
    hasClass(name: string): boolean;
    toggleClass(name: string): void;
    removeClass(name: string): void;
    removeAllClasses(): void;
    getClasses(): string[];
    setStyle(name: string, value: string): void;
    getStyle(name: string): string;
    removeStyle(name: string): void;
    getStyles(): any;
    on(name: string, listener: (event: IEvent<T>) => void): void;
    bind(name: string, listener: (event: IEvent<T>) => void): void;
    unbind(name: string, listener?: (event: IEvent<T>) => void): void;
    emit(name: string, ...args: any[]): void;
    append(element: IElement<T>): void;
    appendTop(element: IElement<T>): void;
    appendBottom(element: IElement<T>): void;
    appendAfter(element1: IElement<T>, element2: IElement<T>): void;
    appendBefore(element1: IElement<T>, element2: IElement<T>): void;
    children(): IElement<T>[];
    remove(element: IElement<T>): void;
    content(): T;
  }

}