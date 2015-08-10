/// <reference path="./IOptions.ts" />
/// <reference path="./../IElement.ts" />

module form.element.checkbox {

  export class Element {

    private element: HTMLInputElement;

    private document: Document;

    getDocument(): Document {
      return this.document;
    }

    setDocument(value: Document): void {
      this.document = value;
    }

    getElement(): HTMLInputElement {
      return this.element;
    }

    constructor(options?: IOptions) {
      this.element = this.getDocument().createElement("input");

    }

    setValue(value: boolean): void {

    }

  }

}