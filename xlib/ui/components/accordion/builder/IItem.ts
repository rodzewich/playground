module xlib.ui.components.accordion.builder {

  import IElement = xlib.ui.element.elements.IElement;

  export interface IItem<T> {
    onClick(listener: () => void): void;
    setEven(value: boolean): void;
    setFirst(value: boolean): void;
    setLast(value: boolean): void;
    setCollapse(value: boolean): void;
    setTitle(value: string): void;
    setId(value: string): void;
    setIcon(value: string): void;
    setClasses(value: string[]): void;
    setComponents(components: IElement<T>[]): void;
    getMap(): any;
    getComponent(): IElement<T>;
    getHeader(): IElement<T>;
    getText(): IElement<T>;
    getTitle(): IElement<T>;
    getContainer(): IElement<T>;
    getContent(): IElement<T>;
    createComponent(): void;
    createHeader(): void;
    createText(): void;
    createTitle(): void;
    createContainer(): void;
    createContent(): void;
  }

}