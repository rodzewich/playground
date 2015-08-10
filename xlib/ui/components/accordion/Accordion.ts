/// <reference path="../../element/factory.ts" />
/// <reference path="../../element/elements/IElement.ts" />

module xlib.ui.components.accordion {

  import IElement = xlib.ui.element.elements.IElement;

  export class Accordion<T> implements accordion.IAccordion<T> {

    private _canvas: IElement<T>;
    
    private _theme: string;

    private _builder: accordion.builder.IComponent<T>;

    constructor(options) {
      var builder: accordion.builder.IComponent<T>;
      if (options && xlib.typeOf(options.theme) !== "undefined") {
        this.setTheme(options.theme);
      }
      if (options && xlib.typeOf(options.id) !== "undefined") {
        this.setId(options.id);
      }
      if (options && xlib.typeOf(options.classes) !== "undefined") {
        this.setClasses(options.classes);
      }
      builder = this.getBuilder();
      builder.createComponent(this.getId(), this.getClasses(), this.getText(), this.getIcon(), this.getComponents(), this.getItems());
      this._canvas = builder.getComponent();
    }

    // todo: convert values
    public setItems(value: any): void {

    }

    public getItems(): IElement<T>[] {

    }

    public setComponents(value: IElement<T>[]): void {

    }

    public getComponents(): IElement<T>[] {

    }

    public setIcon(value: string): void {

    }

    public getIcon(): string {

    }

    public setText(value: string): void {

    }

    public getText(): string {

    }

    private _classes: string[];

    public setClasses(value: string[]): void {

    }

    public getClasses(): string[] {
      if (xlib.typeOf(this._classes) !== "array") {
        this._classes = [];
      }
      return this._classes;
    }

    private _id: string;

    public setId(value: string): void {
      var temp: string = String(value || "");
      if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(temp)) {
        throw Error("bla bla bla");
      }
      this._id = temp;
    }

    public getId(): string {
      if (xlib.typeOf(this._id) !== "string") {
        throw new Error("bla bla bla");
      }
      return this._id;
    }
    
    public setTheme(value: string): void {
      var temp: string = String(value || "");
      if (!/^[a-z][a-z0-9]*$/.test(temp)) {
        throw new Error("bla bla bla");
      }
      this._theme = temp;
    }

    public getTheme(): string {
      if (xlib.typeOf(this._theme) !== "string") {
        this._theme = "simple";
      }
      return this._theme;
    }

    public createBuilder(): accordion.builder.IComponent<T> {
      return accordion.builder.IComponent<T>(new xlib.ui.themes[this.getTheme()].accordion.Component());
    }

    public getBuilder(): accordion.builder.IComponent<T> {
      if (xlib.typeOf(this._builder) === "undefined") {
        this._builder = this.createBuilder();
      }
      return this._builder;
    }

    public getCanvas(): IElement<T> {
      return this._canvas;
    }

  }

}