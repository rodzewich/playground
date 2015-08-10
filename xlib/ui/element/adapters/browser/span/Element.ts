/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/span/IElement.ts" />
/// <reference path="./../../../elements/span/IOptions.ts" />

module xlib.ui.element.adapters.browser.span {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.span.IElement<HTMLElement> {

    constructor(options?: element.elements.span.IOptions<HTMLElement>) {
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
      return ["a", "abbr", "acronym", "b", "bdo", "big", "br", "button", "cite", "code", "del", "dfn", "em", "i", "img", "input", "ins", "kbd", "label", "map", "object", "q", "samp", "script", "select", "small", "span", "strong", "sub", "sup", "textarea", "tt", "var"];
    }

    public getTag(): string {
      return "span";
    }

    // todo: fix it
    getTitle(): string {
      return null;
    }

    setTitle(value: any): void {}

    getLang(): string {
      return null;
    }

    setLang(value: any): void {}

    getXmlLang(): string {
      return null;
    }

    setXmlLang(value: any): void {}

    getDir(): string {
      return null;
    }

    setDir(value: any): void {}

    onClick(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("click", listener);
    }

    onDblClick(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("dblclick", listener);
    }

    onMouseDown(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mousedown", listener);
    }

    onMouseUp(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mouseup", listener);
    }

    onMouseOver(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mouseover", listener);
    }

    onMouseMove(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mousemove", listener);
    }

    onMouseOut(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mouseout", listener);
    }

    onKeyPress(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keypress", listener);
    }

    onKeyDown(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keydown", listener);
    }

    onKeyUp(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keyup", listener);
    }

  }

}