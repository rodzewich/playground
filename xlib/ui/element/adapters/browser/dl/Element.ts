/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/dl/IElement.ts" />
/// <reference path="./../../../elements/dl/IOptions.ts" />

module xlib.ui.element.adapters.browser.dl {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.dl.IElement<HTMLElement> {

    constructor(options?: element.elements.dl.IOptions<HTMLElement>) {
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
      return ["dt", "dd"];
    }

    public getTag(): string {
      return "dl";
    }

    // todo: fix this methods
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