module xlib.ui.components.accordion.builder {

  import IElement = xlib.ui.element.elements.IElement;

  export interface IComponent<T> {
    setId(value: string): void;
    setClasses(value: string[]): void;
    setIcon(value: string): void;
    setTitle(value: string): void;
    setItems(value: builder.IItem<T>): void;
    setComponents(value: IElement<T>[]): void;
    getComponent(): IElement<T>;
  }

}