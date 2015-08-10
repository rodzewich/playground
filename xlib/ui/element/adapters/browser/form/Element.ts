/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/form/IElement.ts" />
/// <reference path="./../../../elements/form/IOptions.ts" />

module xlib.ui.element.adapters.browser.form {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.form.IElement<HTMLElement> {

    constructor(options?: element.elements.form.IOptions<HTMLElement>) {
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
      return ["address", "blockquote", "del", "div", "dl", "fieldset", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "ins", "noscript", "ol", "p", "pre", "script", "table", "ul"];
    }

    public getTag(): string {
      return "form";
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
    public getAction(): string {
      return null;
    }
    public setAction(value: string): void {}
    public getMethod(): string {
      return null;
    }
    public setMethod(value: string): void {}
    public getEncType(): string {
      return null;
    }
    public setEncType(value: string): void {}
    public getAccept(): string {
      return null;
    }
    public setAccept(value: string): void {}
    public getAcceptCharset(): string {
      return null;
    }
    public setAcceptCharset(value: string): void {}
    public getAutoComplete(): string {
      return null;
    }
    public setAutoComplete(value: string): void {}
    public getName(): string {
      return null;
    }
    public setName(value: string): void {}
    public getNoValidate(): boolean {
      return null;
    }
    public setNoValidate(value: boolean): void {}
    public getTarget(): string {
      return null;
    }
    public setTarget(value: string): void {}

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
    public onSubmit(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("submit", listener);
    }
    public onReset(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("reset", listener);
    }

  }

}