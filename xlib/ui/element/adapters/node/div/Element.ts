/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/div/IElement.ts" />
/// <reference path="./../../../elements/div/IOptions.ts" />

module xlib.ui.element.adapters.node.div {

  export class Element extends node.Element implements element.elements.div.IElement<string> {

    constructor(options?: element.elements.div.IOptions<string>) {
      super(options);
    }

    public getTag(): string {
      return "div";
    }

  }

}