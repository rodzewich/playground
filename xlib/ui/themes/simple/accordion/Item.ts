module xlib.ui.themes.simple.accordion {

  import element  = ui.element;
  import IElement = element.elements.IElement;
  import IItem    = components.accordion.builder.IItem;

  export class Item<T> implements IItem<T> {

    private _map: any;

    public getMap(): any {
      if (xlib.typeOf(this._map) === "undefined") {
        this._map = {};
      }
      return this._map;
    }

    public onClick(listener: () => void): void {
      if (xlib.typeOf(listener) !== "function") {
        throw new Error("bla bla bla");
      }
      this.getHeader().on("click", () => {
        listener();
      });
    }

    public setId(value: string): void {
      this.getComponent().setId(value);
      this.getHeader().setId(value + "-header");
      this.getText().setId(value + "-text");
      this.getTitle().setId(value + "-title");
      this.getContainer().setId(value + "-container");
      this.getContent().setId(value + "-content");
    }

    public setEven(value: boolean): void {
      var temp: boolean = xlib.isTrue(value),
          component: IElement<T> = this.getComponent();
      if (temp) {
        component.addClass("xlib-even");
      } else {
        component.removeClass("xlib-even");
      }
    }

    public setFirst(value: boolean): void {
      var temp: boolean = xlib.isTrue(value),
          component: IElement<T> = this.getComponent();
      if (temp) {
        component.addClass("xlib-first");
      } else {
        component.removeClass("xlib-first");
      }
    }

    public setLast(value: boolean): void {
      var temp: boolean = xlib.isTrue(value),
          component: IElement<T> = this.getComponent();
      if (temp) {
        component.addClass("xlib-last");
      } else {
        component.removeClass("xlib-last");
      }
    }

    public setCollapse(value: boolean): void {
      var temp: boolean = xlib.isTrue(value),
          container: IElement<T> = this.getContainer();
      if (temp) {
        container.addClass("xlib-collapse");
      } else {
        container.removeClass("xlib-collapse");
      }
    }

    public setTitle(value: string): void {
      this.getTitle().setText(value);
    }

    public setIcon(value: string): void {
      var index: number,
          element: IElement<T> = this.getText(),
          classes: string[] = element.getClasses(),
          length: number = classes.length,
          check: string[] = [];
      if (value) {
        element.addClass("xlib-icon");
        element.addClass("xlib-icon-" + value);
        check = ["xlib-icon", "xlib-icon-" + value];
      }
      for (index = 0; index < length; index++) {
        if (check.indexOf(classes[index]) === -1) {
          element.removeClass(classes[index]);
        }
      }
    }

    public setComponents(components: IElement<T>[]): void {
      // todo: adjust it
    }

    public setClasses(value: string[]): void {
      var index: number,
          length: number = value.length,
          component: IElement<T> = this.getComponent();
      for (index = 0; index < length; index++) {
        component.addClass(value[index]);
      }
    }

    public getComponent(): IElement<T> {
      return <IElement<T>>this.getMap().component;
    }

    public getHeader(): IElement<T> {
      return <IElement<T>>this.getMap().header;
    }

    public getText(): IElement<T> {
      return <IElement<T>>this.getMap().text;
    }

    public getTitle(): IElement<T> {
      return <IElement<T>>this.getMap().title;
    }

    public getContainer(): IElement<T> {
      return <IElement<T>>this.getMap().container;
    }

    public getContent(): IElement<T> {
      return <IElement<T>>this.getMap().content;
    }

    public createComponent(): void {
      var component: IElement<T>;
      this.createHeader();
      this.createContainer();
      element.li<T>({
        map: this.getMap(),
        local: "component",
        classes: ["xlib-item"],
        items: [
          this.getHeader(),
          this.getContainer()
        ]
      });
    }

    public createHeader(): void {
      var header: IElement<T>,
          tr: IElement<T>;
      this.createText();
      tr = element.tr<T>({
        items: [
          element.th<T>({
            classes: ["xlib-header"],
            items: [
              this.getText()
            ]
          })
        ]
      });
    }

    public createText(): void {
      var el: IElement<T>;
      this.createTitle();
      el = element.h3<T>({
        map: this.getMap(),
        local: "text",
        items: [
          this.getTitle()
        ]
      });
    }

    public createTitle(): void {
      element.span<T>({
        map: this.getMap(),
        local: "title"
      });
    }

    public createContainer(): void {
      var container: IElement<T>;
      this.createContent();
      container = element.div<T>({
        map: this.getMap(),
        local: "container",
        classes: ["xlib-container"],
        items: [
          this.getContent()
        ]
      });
    }

    public createContent(): void {
      element.div<T>({
        map: this.getMap(),
        local: "content",
        classes: ["xlib-content"]
      });
    }

  }

}