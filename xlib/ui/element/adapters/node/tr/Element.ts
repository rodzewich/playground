/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/div/IElement.ts" />
/// <reference path="./../../../elements/div/IOptions.ts" />

module xlib.ui.element.adapters.node.tr {

  export class Element extends node.Element implements element.elements.tr.IElement<string> {

    constructor(options?: element.elements.tr.IOptions<string>) {
      super(options);
    }

    public allowTags(): string[] {
      return ["td", "th"];
    }

    public getTag(): string {
      return "tr";
    }

  }

}