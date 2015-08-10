/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/tr/IElement.ts" />
/// <reference path="./../../../elements/tr/IOptions.ts" />

module xlib.ui.element.adapters.browser.tr {

  export class Element extends browser.Element implements element.elements.tr.IElement<HTMLElement> {

    constructor(options?: element.elements.tr.IOptions<HTMLElement>) {
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
      return ["td", "th"];
    }

    public getTag(): string {
      return "tr";
    }

  }

}