/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/textarea/IElement.ts" />
/// <reference path="./../../../elements/textarea/IOptions.ts" />

module xlib.ui.element.adapters.browser.textarea {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.textarea.IElement<HTMLElement> {

    constructor(options?: element.elements.textarea.IOptions<HTMLElement>) {
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
      return true;
    }

    public allowHtml(): boolean {
      return false;
    }

    public allowTags(): string[] {
      return [];
    }

    public getTag(): string {
      return "textarea";
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

    public getAccessKey(): string {
      return null;
    }

    public setAccessKey(value: any): void {}

    public getTabIndex(): string {
      return null;
    }

    public setTabIndex(value: any): void {}

    public getName(): string {
      return null;
    }

    public setName(value: any): void {}

    public getRows(): string {
      return null;
    }

    public setRows(value: any): void {}

    public getCols(): string {
      return null;
    }

    public setCols(value: any): void {}

    public getDisabled(): string {
      return null;
    }

    public setDisabled(value: any): void {}

    public getReadonly(): string {
      return null;
    }

    public setReadonly(value: any): void {}

    public getAutoFocus(): string {
      return null;
    }

    public setAutoFocus(value: any): void {}

    public getForm(): string {
      return null;
    }

    public setForm(value: any): void {}

    public getMaxLength(): string {
      return null;
    }

    public setMaxLength(value: any): void {}

    public getPlaceholder(): string {
      return null;
    }

    public setPlaceholder(value: any): void {}

    public getRequired(): string {
      return null;
    }

    public setRequired(value: any): void {}

    public getWrap(): string {
      return null;
    }

    public setWrap(value: any): void {}

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

    public onSelect(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("select", listener);
    }

    public onChange(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("", listener);
    }

  }

}