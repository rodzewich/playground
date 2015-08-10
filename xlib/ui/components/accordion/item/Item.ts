/// <reference path="./IItem.ts" />

module xlib.ui.components.accordion.item {

  import IElement = xlib.ui.element.elements.IElement;

  export class Item<T> implements item.IItem<T> {

    constructor(options: item.IOptions) {
      if (options && xlib.typeOf(options.id) !== "undefined") {
        this.setId(options.id);
      }
      if (options && xlib.typeOf(options.classes) !== "undefined") {
        this.setClasses(options.classes);
      }
      if (options && xlib.typeOf(options.title) !== "undefined") {
        this.setTitle(options.title);
      }
      if (options && xlib.typeOf(options.icon) !== "undefined") {
        this.setIcon(options.icon);
      }
      if (options && xlib.typeOf(options.theme) !== "undefined") {
        this.setTheme(options.theme);
      }
      if (options && xlib.typeOf(options.even) !== "undefined") {
        this.setEven(options.even);
      }
      if (options && xlib.typeOf(options.first) !== "undefined") {
        this.setFirst(options.first);
      }
      if (options && xlib.typeOf(options.last) !== "undefined") {
        this.setLast(options.last);
      }
      if (options && xlib.typeOf(options.components) !== "undefined") {
        this.setComponents(options.components);
      }
      if (options && options.listeners &&
        xlib.typeOf(options.listeners.expand) === "function") {
        this.onExpand(options.listeners.expand);
      }
      if (options && options.listeners &&
        xlib.typeOf(options.listeners.collapse) === "function") {
        this.onCollapse(options.listeners.collapse);
      }
      if (options && !xlib.isTrue(options.collapsed)) {
        this.expand();
      }
      this.getBuilder().onClick(() => {
        this.toggle();
      });
    }

    private _collapseListeners: Array<(accordion: accordion.IAccordion, item: item.IItem) => void>;

    public onCollapse(listener: (accordion: accordion.IAccordion, item: item.IItem) => void): void {
      if (xlib.typeOf(this._collapseListeners) !== "array") {
        this._collapseListeners = [];
      }
      if (xlib.typeOf(listener) !== "function") {
        throw new Error("bla bla bla");
      }
      this._collapseListeners.push(listener);
    }

    private _expandListeners: Array<(accordion: accordion.IAccordion, item: item.IItem) => void>;

    public onExpand(listener: (accordion: accordion.IAccordion, item: item.IItem) => void): void {
      if (xlib.typeOf(this._expandListeners) !== "array") {
        this._expandListeners = [];
      }
      if (xlib.typeOf(listener) !== "function") {
        throw new Error("bla bla bla");
      }
      this._expandListeners.push(listener);
    }

    private _theme: string;

    public getTheme(): string {
      if (xlib.typeOf(this._theme) === "undefined") {
        this._theme = "simple";
      }
      return this._theme;
    }
    public setTheme(value: string): void {
      var temp: string = String(value || "");
      if (xlib.ui.themes && xlib.typeOf(xlib.ui.themes[temp]) !== "object") {
        throw new Error("bla bla bla");
      }
      this._theme = temp;
    }

    private _title: string;

    public getTitle(): string {
      return String(this._title || "");
    }

    public setTitle(value: any): void {
      var temp: string = xlib.trim(value || "");
      this._title = temp || null;
      this.getBuilder().getTitle().setText(temp);
    }

    private _icon: string;

    public getIcon(): string {
      return String(this._icon || "") || null;
    }

    public setIcon(value: any): void {
      var temp: string = xlib.trim(value || ""),
          element: ui.element.elements.IElement<T>;
      if (!/^[a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)*$/.test(temp) && temp !== "") {
        throw new Error("bla bla bla");
      }
      element = this.getBuilder().getText();
      if (temp) {
        element.addClass("xlib-icon");
        element.addClass("xlib-icon-" + temp);
        // todo: remove old icons
      } else {
        // todo: remove icon
      }
      this._icon = temp || null;
    }

    private _id: string;

    public getId(): string {
      return String(this._id || "") || null;
    }

    public setId(value: any): void {
      var temp: string = String(value || "");
      // todo: check value by regexp
      this._id = temp;
      // todo: set to element
    }

    private _classes: string[];

    public getClasses(): string[] {
      if (xlib.typeOf(this._classes) !== "array") {
        this._classes = [];
      }
      return this._classes.slice(0);
    }

    public setClasses(value: any): void {
      // todo: adjust method
    }

    private _even: boolean;

    public getEven(): boolean {
      return !!this._even;
    }

    public isEven(): boolean {
      return this.getEven();
    }

    public setEven(value: any): void {
      this._even = xlib.isTrue(value);
      this.getBuilder().setEven(this.isEven());
    }

    private _first: boolean;

    public getFirst(): boolean {
      return !!this._first;
    }

    public isFirst(): boolean {
      return this.getFirst();
    }

    public setFirst(value: any): void {
      this._first = xlib.isTrue(value);
      this.getBuilder().setFirst(this.isFirst());
    }

    private _last: boolean;

    public getLast(): boolean {
      return !!this._last;
    }

    public isLast(): boolean {
      return this.getLast();
    }

    public setLast(value: any): void {
      this._last = xlib.isTrue(value);
      this.getBuilder().setLast(this.getLast());
    }

    public collapse(): void {
      var index: number,
          length: number;
      if (!this.getCollapse()) {
        this.setCollapse(true);
        if (xlib.typeOf(this._collapseListeners) === "array") {
          length = this._collapseListeners.length;
          for (index = 0; index < length; index++) {
            // todo: call with accordion object
            this._collapseListeners[index](null, this);
          }
        }
      }
    }

    public expand(): void {
      var index: number,
          length: number;
      if (!this.getExpand()) {
        if (xlib.typeOf(this._expandListeners) === "array") {
          length = this._expandListeners.length;
          for (index = 0; index < length; index++) {
            // todo: call with accordion object
            this._expandListeners[index](null, this);
          }
        }
        this.setExpand(true);
      }
    }

    public toggle(): void {
      if (!this.getCollapse()) {
        this.collapse();
      } else {
        this.expand();
      }
    }

    private _collapse: boolean;

    public getCollapse(): boolean {
      return !!this._collapse;
    }

    public isCollapsed(): boolean {
      return this.getCollapse();
    }

    public setCollapse(value: any): void {
      this._collapse = xlib.isTrue(value);
      this._expand = !this._collapse;
      this.getBuilder().setCollapse(this.getCollapse());
    }

    private _expand: boolean;

    public getExpand(): boolean {
      return !!this._expand;
    }

    public isExpanded(): boolean {
      return this.getExpand();
    }

    public setExpand(value: any): void {
      this._expand = xlib.isTrue(value);
      this._collapse = !this._expand;
      this.getBuilder().setCollapse(this.getCollapse());
    }

    private _builder: accordion.builder.IItem;

    public getBuilder(): accordion.builder.IItem {
      if (xlib.typeOf(this._builder) === "undefined") {
        this._builder = <accordion.builder.IItem>(new xlib.ui.themes[this.getTheme()].accordion.Item());
      }
      return this._builder;
    }

    private _components: IElement<T>[];

    public getComponents(): IElement<T>[] {
      if (xlib.typeOf(this._components) !== "array") {
        this._components = [];
      }
      return this._components.slice(0);
    }

    public setComponents(value: IElement[]): void {
      if (xlib.typeOf(value) !== "array") {
        throw new Error("bla bla bla");
      }
      this._components = value;
      this.getBuilder().setComponents(value);
    }

  }

}