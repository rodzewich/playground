module xlib.ui.themes.simple.accordion {

  import element    = ui.element;
  import IElement   = element.elements.IElement;
  import IComponent = components.accordion.builder.IComponent;

  export class Component<T> implements IComponent<T> {

    private map: any;

    setId(value: string): void {
      this.getComponent();
      <IElement<T>>(this.map.component).setId(value);
    }

    setClasses(value: string[]): void {
      var index: number,
          length: number,
          component: IElement<T>;
      this.getComponent();
      component = <IElement<T>>this.map.component;
      length = value.length;
      component.removeAllClasses();
      for (index = 0; index < length; index++) {
        component.addClass(value[index]);
      }
    }

    setIcon(value: string): void {
      this.getComponent();

    }

    setTitle(value: string): void {
      this.getComponent();

    }

    setComponents(value: IElement<T>[]): void {

    }

    setItems(value: builder.IItem<T>[]): void {
      this.getComponent();

    }

    getComponent(): IElement<T> {
      if (xlib.typeOf(this.map) === "undefined") {
        element.ul<T>({

        });
      }
      return <IElement<T>>this.map.component;
    }

  }

}
