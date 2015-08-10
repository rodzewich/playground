/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/table/IElement.ts" />
/// <reference path="./../../../elements/table/IOptions.ts" />

module xlib.ui.element.adapters.browser.table {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.table.IElement<HTMLElement> {

    constructor(options?: element.elements.table.IOptions<HTMLElement>) {
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
      return ["caption", "col", "colgroup", "tbody", "tfoot", "thead", "tr"];
    }

    public getTag(): string {
      return "table";
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

    public getBackground(): string {
      return null;
    }

    public setBackground(value: any): void {}

    public getBgColor(): string {
      return null;
    }

    public setBgColor(value: any): void {}

    public getCols(): string {
      return null;
    }

    public setCols(value: any): void {}

    public getHeight(): string {
      return null;
    }

    public setHeight(value: any): void {}

    public getSummary(): string {
      return null;
    }

    public setSummary(value: any): void {}

    public getWidth(): string {
      return null;
    }

    public setWidth(value: any): void {}

    public getBorder(): string {
      return null;
    }

    public setBorder(value: any): void {}

    public getBorderColor(): string {
      return null;
    }

    public setBorderColor(value: any): void {}

    public getFrame(): string {
      return null;
    }

    public setFrame(value: any): void {}

    public getRules(): string {
      return null;
    }

    public setRules(value: any): void {}

    public getCellSpacing(): string {
      return null;
    }

    public setCellSpacing(value: any): void {}

    public getCellPadding(): string {
      return null;
    }

    public setCellPadding(value: any): void {}


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