/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/tbody/IElement.ts" />
/// <reference path="./../../../elements/tbody/IOptions.ts" />

module xlib.ui.element.adapters.browser.tbody {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.tbody.IElement<HTMLElement> {

    constructor(options?: element.elements.tbody.IOptions<HTMLElement>) {
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
      return ["tr"];
    }

    public getTag(): string {
      return "tbody";
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

    public getAlign(): string {
      return null;
    }

    public setAlign(value: any): void {}

    public getChar(): string {
      return null;
    }

    public setChar(value: any): void {}

    public getCharOff(): string {
      return null;
    }

    public setCharOff(value: any): void {}

    public getVAlign(): string {
      return null;
    }

    public setVAlign(value: any): void {}

    public getBgColor(): string {
      return null;
    }

    public setBgColor(value: any): void {}

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