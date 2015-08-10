/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/div/IElement.ts" />
/// <reference path="./../../../elements/div/IOptions.ts" />

module xlib.ui.element.adapters.node.th {

  export class Element extends node.Element implements element.elements.th.IElement<string> {

    constructor(options?: element.elements.th.IOptions<string>) {
      super(options);
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

    public getTag(): string {
      return "th";
    }

  }

}