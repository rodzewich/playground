/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/map/IElement.ts" />
/// <reference path="./../../../elements/map/IOptions.ts" />

module xlib.ui.element.adapters.browser.map {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.map.IElement<HTMLElement> {

    constructor(options?: element.elements.map.IOptions<HTMLElement>) {
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
      return false;
    }

    public allowHtml(): boolean {
      return false;
    }

    public allowTags(): string[] {
      return ["address", "area", "blockquote", "del", "div", "dl", "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "ins", "noscript", "ol", "p", "pre", "script", "table", "ul"];
    }

    public getTag(): string {
      return "map";
    }

    // todo: fix it
    public getLang(): string {
      return null;
    }

    public setLang(value: any): void {}

    public getXmlLang(): string {
      return null;
    }

    public setXmlLang(value: any): void {}

    public getDir(): string {
      return null;
    }

    public setDir(value: any): void {}

    public getTitle(): string {
      return null;
    }

    public setTitle(value: any): void {}

    public getName(): string {
      return null;
    }

    public setName(value: any): void {}

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