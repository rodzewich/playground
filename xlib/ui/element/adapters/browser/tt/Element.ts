/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/tt/IElement.ts" />
/// <reference path="./../../../elements/tt/IOptions.ts" />

module xlib.ui.element.adapters.browser.tt {

  export class Element extends browser.Element implements element.elements.tt.IElement<HTMLElement> {

    constructor(options?: element.elements.tt.IOptions<HTMLElement>) {
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
      return true;
    }

    public allowHtml(): boolean {
      return true;
    }

    public allowTags(): string[] {
      return ["a", "abbr", "acronym", "b", "bdo", "big", "br", "button", "cite", "code", "del", "dfn", "em", "i", "img", "input", "ins", "kbd", "label", "map", "object", "q", "samp", "script", "select", "small", "span", "strong", "sub", "sup", "textarea", "tt", "var"];
    }

    public getTag(): string {
      return "tt";
    }

  }

}