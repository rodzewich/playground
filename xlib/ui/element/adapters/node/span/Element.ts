/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/div/IElement.ts" />
/// <reference path="./../../../elements/div/IOptions.ts" />

module xlib.ui.element.adapters.node.span {

  export class Element extends node.Element implements element.elements.span.IElement<string> {

    constructor(options?: element.elements.span.IOptions<string>) {
      super(options);
    }

    public getTag(): string {
      return "span";
    }

  }

}