/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/ul/IElement.ts" />
/// <reference path="./../../../elements/ul/IOptions.ts" />

module xlib.ui.element.adapters.browser.ul {

  export class Element extends browser.Element implements element.elements.ul.IElement<HTMLElement> {

    constructor(options?: element.elements.ul.IOptions<HTMLElement>) {
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
      return ["li"];
    }

    public getTag(): string {
      return "ul";
    }

  }

}