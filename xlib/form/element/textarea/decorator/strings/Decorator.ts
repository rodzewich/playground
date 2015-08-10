/// <reference path="./IOptions.ts" />
/// <reference path="./IDecorator.ts" />
/// <reference path="../../../../../utils/core.ts" />

module form.element.textarea.decorator.strings {

  export class Decorator implements IDecorator {

    private placeholder: string = null;

    private readonly: boolean = false;

    private required: boolean = false;

    private maxLength: number = null;

    private name: string = null;

    private id: string = null;

    private cols: number = null;

    private rows: number = null;

    private disabled: boolean = false;

    private value: string = '';

    private strict: boolean = false;

    constructor(options?: IOptions) {
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
      if (options && xlib.typeOf(options.strict) !== 'undefined') {
        this.setStrict(options.strict);
      }
    }

    public getContent(): string {
      var attributes: string[] = [];

      if (this.isDisabled()) {
        if (this.isStrict()) {
          attributes.push(' disabled="disabled"');
        } else {
          attributes.push(' disabled');
        }
      }

      if (this.isReadonly()) {
        if (this.isStrict()) {
          attributes.push(' readonly="readonly"');
        } else {
          attributes.push(' readonly');
        }
      }

      if (this.isRequired()) {
        if (this.isStrict()) {
          attributes.push(' required="required"');
        } else {
          attributes.push(' required');
        }
      }

      if (this.getCols() !== null) {
        attributes.push(' cols="' + String(this.getCols()) + '"');
      }

      if (this.getRows() !== null) {
        attributes.push(' rows="' + String(this.getRows()) + '"');
      }

      if (this.getMaxLength() !== null) {
        attributes.push(' maxlength="' + String(this.getMaxLength()) + '"');
      }


      if (this.getPlaceholder() !== null) {
        attributes.push(' placeholder="' + this.getPlaceholder() + '"'); /* todo: escape */
      }

      if (this.getName() !== null) {
        attributes.push(' name="' + this.getName() + '"'); /* todo: escape */
      }

      if (this.getId() !== null) {
        attributes.push(' id="' + this.getId() + '"'); /* todo: escape */
      }

      return '<textarea' + attributes.join('') + '>' + this.getValue() /* todo: escape value */ + '</textarea>';
    }

    public isStrict(): boolean {
      return !!this.strict;
    }

    public setStrict(value: boolean): void {
      this.strict = !!value;
    }

    public getPlaceholder(): string {
      return this.placeholder;
    }

    public setPlaceholder(value: string): void {
      this.placeholder = String(value || '') || null;
    }


    public isReadonly(): boolean {
      return !!this.readonly;
    }

    public setReadonly(value: boolean): void {
      this.readonly = !!value;
    }

    public isRequired(): boolean {
      return !!this.required;
    }

    public setRequired(value: boolean): void {
      this.required = !!value;
    }

    public getMaxLength(): number {
      return this.maxLength;
    }

    public setMaxLength(value: number): void {
      this.maxLength = Math.max(0, parseInt(String(value), 10)) || null;
    }


    public getName(): string {
      return this.name;
    }

    public setName(value: string) {
      this.name = String(value || '') || null;
    }


    public getId(): string {
      return this.id;
    }

    public setId(value: string): void {
      this.id = String(value || '') || null;
    }



    public getCols(): number {
      return this.cols;
    }

    public setCols(value: number): void {
      this.cols = Math.max(0, parseInt(String(value), 10)) || null;
    }



    public getRows(): number {
      return this.rows;
    }

    public setRows(value: number): void {
      this.rows = Math.max(0, parseInt(String(value), 10)) || null;
    }



    public setDisabled(value: boolean): void {
      this.disabled = !!value;
    }

    public isDisabled(): boolean {
      return !!this.disabled;
    }


    public setValue(value: string): void {
      this.value = String(value || '');
    }

    public getValue(): string {
      return this.value;
    }



  }

}