/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/select/IElement.ts" />
/// <reference path="./../../../elements/select/IOptions.ts" />

module xlib.ui.element.adapters.browser.select {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.select.IElement<HTMLElement> {

    constructor(options?: element.elements.select.IOptions<HTMLElement>) {
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
      return ["optgroup", "option"];
    }

    public getTag(): string {
      return "select";
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

    public getName(): string {
      return null;
    }

    public setName(value: any): void {}

    public getSize(): string {
      return null;
    }

    public setSize(value: any): void {}

    public getMultiple(): string {
      return null;
    }

    public setMultiple(value: any): void {}

    public getDisabled(): string {
      return null;
    }

    public setDisabled(value: any): void {}

    public getTabIndex(): string {
      return null;
    }

    public setTabIndex(value: any): void {}

    public getAccessKey(): string {
      return null;
    }

    public setAccessKey(value: any): void {}

    public getAutoFocus(): string {
      return null;
    }

    public setAutoFocus(value: any): void {}

    public getForm(): string {
      return null;
    }

    public setForm(value: any): void {}

    public getRequired(): string {
      return null;
    }

    public setRequired(value: any): void {}


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

    public onFocus(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("focus", listener);
    }

    public onFocusIn(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("focusin", listener);
    }

    public onFocusOut(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("focusout", listener);
    }

    public onBlur(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("blur", listener);
    }

    public onChange(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("change", listener);
    }

  }

}