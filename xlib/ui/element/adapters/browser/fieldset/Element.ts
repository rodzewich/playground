/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/fieldset/IElement.ts" />
/// <reference path="./../../../elements/fieldset/IOptions.ts" />

module xlib.ui.element.adapters.browser.fieldset {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.fieldset.IElement<HTMLElement> {

    constructor(options?: element.elements.IOptions<HTMLElement>) {
      super(options);
    }

    public attributesDeny(): string[] {
      // todo: fix this
      return super.attributesDeny();
    }

    public attributesAllow(): string[] {
      // todo: fix this
      return super.attributesAllow();
    }

    public allowChildren(): boolean {
      return true;
    }

    public allowText(): boolean {
      return true;
    }

    public allowHtml(): boolean {
      return true;
    }

    public allowTags(): string[] {
      return ["a", "abbr", "acronym", "address", "b", "bdo", "big", "blockquote", "br", "button", "cite", "code", "del", "del", "dfn", "div", "dl", "em", "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "input", "ins", "ins", "kbd", "label", "legend", "map", "noscript", "object", "ol", "p", "pre", "q", "samp", "script", "script", "select", "small", "span", "strong", "sub", "sup", "table", "textarea", "tt", "ul", "var"];
    }

    public getTag(): string {
      return "fieldset";
    }

    // todo: fix this
    public getTitle(): string {
      return null;
    }

    public setTitle(value: string): void {}

    public getLang(): string {
      return null;
    }

    public setLang(value: string): void {}

    public getXmlLang(): string {
      return null;
    }

    public setXmlLang(value: string): void {}

    public getDir(): string {
      return null;
    }

    public setDir(value: string): void {}

    public getDisabled(): boolean {
      return null;
    }

    public setDisabled(value: boolean): void {}

    public isDisabled(): boolean {
      return null;
    }

    public getForm(): string {
      return null;
    }

    public setForm(value: string): void {}


    public onClick(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("click", listener);
    }

    public onDblClick(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("dblclick", listener);
    }

    public onMouseDown(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mousedown", listener);
    }

    public onMouseUp(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mouseup", listener);
    }

    public onMouseOver(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mouseover", listener);
    }

    public onMouseMove(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mousemove", listener);
    }

    public onMouseOut(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mouseout", listener);
    }

    public onKeyPress(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keypress", listener);
    }

    public onKeyDown(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keydown", listener);
    }

    public onKeyUp(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keyup", listener);
    }

  }

}