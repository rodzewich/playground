/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/td/IElement.ts" />
/// <reference path="./../../../elements/td/IOptions.ts" />

module xlib.ui.element.adapters.browser.td {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.td.IElement<HTMLElement> {

    constructor(options?: element.elements.td.IOptions<HTMLElement>) {
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
      return ["a", "abbr", "acronym", "address", "b", "bdo", "big", "blockquote", "br", "button", "cite", "code", "del", "dfn", "div", "dl", "em", "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "input", "ins", "kbd", "label", "map", "noscript", "object", "ol", "p", "pre", "q", "samp", "script", "select", "small", "span", "strong", "sub", "sup", "table", "textarea", "tt", "ul", "var"];
    }

    public getTag(): string {
      return "td";
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

    public getBackground(): string {
      return null;
    }

    public setBackground(value: any): void {}

    public getBgColor(): string {
      return null;
    }

    public setBgColor(value: any): void {}

    public getBorderColor(): string {
      return null;
    }

    public setBorderColor(value: any): void {}

    public getAbbr(): string {
      return null;
    }

    public setAbbr(value: any): void {}

    public getAxis(): string {
      return null;
    }

    public setAxis(value: any): void {}

    public getHeaders(): string {
      return null;
    }

    public setHeaders(value: any): void {}

    public getScope(): string {
      return null;
    }

    public setScope(value: any): void {}

    public getHeight(): string {
      return null;
    }

    public setHeight(value: any): void {}

    public getRowSpan(): string {
      return null;
    }

    public setRowSpan(value: any): void {}

    public getNoWrap(): string {
      return null;
    }

    public setNoWrap(value: any): void {}

    public getWidth(): string {
      return null;
    }

    public setWidth(value: any): void {}

    public getColSpan(): string {
      return null;
    }

    public setColSpan(value: any): void {}

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