/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/title/IElement.ts" />
/// <reference path="./../../../elements/title/IOptions.ts" />

module xlib.ui.element.adapters.browser.title {

  export class Element extends browser.Element implements element.elements.title.IElement<HTMLElement> {

    constructor(options?: element.elements.title.IOptions<HTMLElement>) {
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
      return true;
    }

    public allowHtml(): boolean {
      return false;
    }

    public allowTags(): string[] {
      return [];
    }

    public getTag(): string {
      return "title";
    }

  }

}