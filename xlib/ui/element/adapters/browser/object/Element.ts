/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/object/IElement.ts" />
/// <reference path="./../../../elements/object/IOptions.ts" />

module xlib.ui.element.adapters.browser.object {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.object.IElement<HTMLElement> {

    constructor(options?: element.elements.object.IOptions<HTMLElement>) {
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
      return ["a", "abbr", "acronym", "address", "b", "bdo", "big", "blockquote", "br", "button", "cite", "code", "del", "del", "dfn", "div", "dl", "em", "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "input", "ins", "ins", "kbd", "label", "map", "noscript", "object", "ol", "p", "param", "pre", "q", "samp", "script", "script", "select", "small", "span", "strong", "sub", "sup", "table", "textarea", "tt", "ul", "var"];
    }

    public getTag(): string {
      return "object";
    }

    // todo: fix this
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

    public getClassId(): string {
      return null;
    }

    public setClassId(value: any): void {}

    public getCode(): string {
      return null;
    }

    public setCode(value: any): void {}

    public getCodeBase(): string {
      return null;
    }

    public setCodeBase(value: any): void {}

    public getHSpace(): string {
      return null;
    }

    public setHSpace(value: any): void {}

    public getVSpace(): string {
      return null;
    }

    public setVSpace(value: any): void {}

    public getDeclare(): string {
      return null;
    }

    public setDeclare(value: any): void {}

    public getClassCodeBase(): string {
      return null;
    }

    public setClassCodeBase(value: any): void {}

    public getData(): string {
      return null;
    }

    public setData(value: any): void {}

    public getType(): string {
      return null;
    }

    public setType(value: any): void {}

    public getCodeType(): string {
      return null;
    }

    public setCodeType(value: any): void {}

    public getArchive(): string {
      return null;
    }

    public setArchive(value: any): void {}

    public getStandby(): string {
      return null;
    }

    public setStandby(value: any): void {}

    public getHeight(): string {
      return null;
    }

    public setHeight(value: any): void {}

    public getWidth(): string {
      return null;
    }

    public setWidth(value: any): void {}

    public getUseMap(): string {
      return null;
    }

    public setUseMap(value: any): void {}

    public getName(): string {
      return null;
    }

    public setName(value: any): void {}

    public getTabIndex(): string {
      return null;
    }

    public setTabIndex(value: any): void {}


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