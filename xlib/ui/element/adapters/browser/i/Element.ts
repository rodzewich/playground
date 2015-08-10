/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/i/IElement.ts" />
/// <reference path="./../../../elements/i/IOptions.ts" />

module xlib.ui.element.adapters.browser.i {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.i.IElement<HTMLElement> {

    constructor(options?: element.elements.i.IOptions<HTMLElement>) {
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
      return "i";
    }

    // todo: fix this
    getTitle(): string {
      return null;
    }

    setTitle(value: string): void {}

    getLang(): string {
      return null;
    }

    setLang(value: string): void {}

    getXmlLang(): string {
      return null;
    }

    setXmlLang(value: string): void {}

    getDir(): string {
      return null;
    }

    setDir(value: string): void {}

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