/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/param/IElement.ts" />
/// <reference path="./../../../elements/param/IOptions.ts" />

module xlib.ui.element.adapters.browser.param {

  export class Element extends browser.Element implements element.elements.param.IElement<HTMLElement> {

    constructor(options?: element.elements.param.IOptions<HTMLElement>) {
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
      return "param";
    }

    // todo: fix this
    getName(): string {
      return null;
    }

    setName(value: any): void {}

    getValue(): string {
      return null;
    }

    setValue(value: any): void {}

    getValueType(): string {
      return null;
    }

    setValueType(value: any): void {}

    getType(): string {
      return null;
    }

    setType(value: any): void {}

  }

}