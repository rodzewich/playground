/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/link/IElement.ts" />
/// <reference path="./../../../elements/link/IOptions.ts" />

module xlib.ui.element.adapters.browser.link {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.link.IElement<HTMLElement> {

    constructor(options?: element.elements.link.IOptions<HTMLElement>) {
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
      return false;
    }

    public allowText(): boolean {
      return false;
    }

    public allowHtml(): boolean {
      return false;
    }

    public allowTags(): string[] {
      return [];
    }

    public getTag(): string {
      return "link";
    }

    // todo: fix it
    public getTitle(): string {
      return null;
    }

    public setTitle(value: any): void {}

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

    public getCharset(): string {
      return null;
    }

    public setCharset(value: any): void {}

    public getHref(): string {
      return null;
    }

    public setHref(value: any): void {}

    public getHrefLang(): string {
      return null;
    }

    public setHrefLang(value: any): void {}

    public getType(): string {
      return null;
    }

    public setType(value: any): void {}

    public getRel(): string {
      return null;
    }

    public setRel(value: any): void {}

    public getRev(): string {
      return null;
    }

    public setRev(value: any): void {}

    public getMedia(): string {
      return null;
    }

    public setMedia(value: any): void {}

    public getSizes(): string {
      return null;
    }

    public setSizes(value: any): void {}

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