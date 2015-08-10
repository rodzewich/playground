/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/thead/IElement.ts" />
/// <reference path="./../../../elements/thead/IOptions.ts" />

module xlib.ui.element.adapters.browser.thead {

  export class Element extends browser.Element implements element.elements.thead.IElement<HTMLElement> {

    constructor(options?: element.elements.thead.IOptions<HTMLElement>) {
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
      return ["tr"];
    }

    public getTag(): string {
      return "thead";
    }

  }

}