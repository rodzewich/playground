/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/input/IElement.ts" />
/// <reference path="./../../../elements/input/IOptions.ts" />

module xlib.ui.element.adapters.browser.input {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.input.IElement<HTMLElement> {

    constructor(options?: element.elements.input.IOptions<HTMLElement>) {
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
      return "input";
    }

    // todo: fix this
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

    public getAccessKey(): string {
      return null;
    }

    public setAccessKey(value: string): void {}

    public getTabIndex(): string {
      return null;
    }

    public setTabIndex(value: string): void {}

    public getType(): string {
      return null;
    }

    public setType(value: string): void {}

    public getName(): string {
      return null;
    }

    public setName(value: string): void {}

    public getValue(): string {
      return null;
    }

    public setValue(value: string): void {}

    public getChecked(): boolean {
      return null;
    }

    public isChecked(): boolean {
      return null;
    }

    public setChecked(value: string): void {}

    public getDisabled(): boolean {
      return null;
    }

    public isDisabled(): boolean {
      return null;
    }

    public setDisabled(value: string): void {}

    public getReadonly(): boolean {
      return null;
    }

    public isReadonly(): boolean {
      return null;
    }

    public setReadonly(value: string): void {}

    public getSize(): string {
      return null;
    }

    public setSize(value: string): void {}

    public getMaxLength(): string {
      return null;
    }

    public setMaxLength(value: string): void {}

    public getSrc(): string {
      return null;
    }

    public setSrc(value: string): void {
      return null;
    }

    public getAlt(): string {
      return null;
    }

    public setAlt(value: string): void {}

    public getUseMap(): string {
      return null;
    }

    public setUseMap(value: string): void {}

    public getAccept(): string {
      return null;
    }

    public setAccept(value: string): void {}

    public getAlign(): string {
      return null;
    }

    public setAlign(value: string): void {}

    public getAutoComplete(): boolean {
      return null;
    }

    public isAutoComplete(): boolean {
      return null;
    }

    public setAutoComplete(value: string): void {}

    public getAutoFocus(): boolean {
      return null;
    }

    public isAutoFocus(): boolean {
      return null;
    }

    public setAutoFocus(value: string): void {}

    public getBorder(): string {
      return null;
    }

    public setBorder(value: string): void {}

    public getForm(): string {
      return null;
    }

    public setForm(value: string): void {}

    public getFormAction(): string {
      return null;
    }

    public setFormAction(value: string): void {}

    public getFormEncType(): string {
      return null;
    }

    public setFormEncType(value: string): void {}

    public getFormMethod(): string {
      return null;
    }

    public setFormMethod(value: string): void {}

    public getFormNoValidate(): string {
      return null;
    }

    public setFormNoValidate(value: string): void {}

    public getFormTarget(): string {
      return null;
    }

    public setFormTarget(value: string): void {}

    public getList(): string {
      return null;
    }

    public setList(value: string): void {}

    public getMax(): string {
      return null;
    }

    public setMax(value: string): void {}

    public getMin(): string {
      return null;
    }

    public setMin(value: string): void {}

    public getMultiple(): boolean {
      return null;
    }

    public isMultiple(): boolean {
      return null;
    }

    public setMultiple(value: string): void {}

    public getPattern(): string {
      return null;
    }

    public setPattern(value: string): void {}

    public getPlaceholder(): string {
      return null;
    }

    public setPlaceholder(value: string): void {}

    public getRequired(): boolean {
      return null;
    }

    public isRequired(): boolean {
      return null;
    }

    public setRequired(value: string): void {}

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
      this.on("change", listener);
    }

  }

}