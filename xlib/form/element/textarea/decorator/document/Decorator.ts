/// <reference path="../../../../../utils/core.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="./IDecorator.ts" />

module form.element.textarea.decorator.document {

  export class Decorator implements IDecorator {

    private document: Document;

    private element: HTMLTextAreaElement;

    private content: HTMLElement;

    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.document) !== 'undefined') {
        this.setDocument(options.document);
      }
      if (options && xlib.typeOf(options.placeholder) !== 'undefined') {
        this.setPlaceholder(options.placeholder);
      }
      if (options && xlib.typeOf(options.readonly) !== 'undefined') {
        this.setReadonly(options.readonly);
      }
      if (options && xlib.typeOf(options.required) !== 'undefined') {
        this.setRequired(options.required);
      }
      if (options && xlib.typeOf(options.maxLength) !== 'undefined') {
        this.setMaxLength(options.maxLength);
      }
      if (options && xlib.typeOf(options.name) !== 'undefined') {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.id) !== 'undefined') {
        this.setId(options.id);
      }
      if (options && xlib.typeOf(options.cols) !== 'undefined') {
        this.setCols(options.cols);
      }
      if (options && xlib.typeOf(options.rows) !== 'undefined') {
        this.setRows(options.rows);
      }
      if (options && xlib.typeOf(options.disabled) !== 'undefined') {
        this.setDisabled(options.disabled);
      }
      if (options && xlib.typeOf(options.value) !== 'undefined') {
        this.setValue(options.value);
      }
    }

    public createElement(): HTMLTextAreaElement {
      return this.getDocument().createElement('textarea');
    }

    public getElement(): HTMLTextAreaElement {
      if (!this.element) {
        this.element = this.createElement();
      }
      return this.element;
    }

    public createContent(): HTMLElement {
      return <HTMLElement>this.getElement();
    }

    public getContent(): HTMLElement {
      if (!this.content) {
        this.content = this.createContent();
      }
      return this.content;
    }

    public getDocument(): Document {
      return this.document;
    }

    public setDocument(value: Document) {
      this.document = value;
    }

    public getPlaceholder(): string {
      return String(this.getElement().placeholder || '') || null;
    }

    public setPlaceholder(value: string): void {
      this.getElement().placeholder = String(value || '');
    }

    public isReadonly(): boolean {
      return !!this.getElement().readOnly;
    }

    public setReadonly(value: boolean): void {
      this.getElement().readOnly = !!value;
    }

    public isRequired(): boolean {
      return !!this.getElement().required;
    }

    public setRequired(value: boolean): void {
      this.getElement().required = !!value;
    }

    public getMaxLength(): number {
      return Math.max(0, parseInt(String(this.getElement().maxLength), 10) || 0) || null;
    }

    public setMaxLength(value: number): void {
      this.getElement().maxLength = Math.max(0, parseInt(String(value), 10)) || null;
    }

    public getName(): string {
      return String(this.getElement().name || '') || null;
    }

    public setName(value: string) {
      this.getElement().name = String(value || '');
    }

    public getId(): string {
      return String(this.getElement().id || '') || null;
    }

    public setId(value: string): void {
      this.getElement().id = String(value || '');
    }

    public getCols(): number {
      return Math.max(0, parseInt(String(this.getElement().cols), 10) || 0) || null;
    }

    public setCols(value: number): void {
      this.getElement().cols = Math.max(0, parseInt(String(value), 10)) || null;
    }

    public getRows(): number {
      return Math.max(0, parseInt(String(this.getElement().rows), 10) || 0) || null;
    }

    public setRows(value: number): void {
      this.getElement().rows = Math.max(0, parseInt(String(value), 10)) || null;
    }

    public setDisabled(value: boolean): void {
      this.getElement().disabled = !!value;
    }

    public isDisabled(): boolean {
      return !!this.getElement().disabled
    }

    public setValue(value: string): void {
      this.getElement().value = String(value || '');
    }

    public getValue(): string {
      return String(this.getElement().value || '');
    }

  }

}