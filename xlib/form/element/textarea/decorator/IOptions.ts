module form.element.textarea.decorator {

  export interface IOptions {
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    maxLength?: number;
    name?: string;
    id?: string;
    cols?: number;
    rows?: number;
    disabled?: boolean;
    value?: string;
  }

}