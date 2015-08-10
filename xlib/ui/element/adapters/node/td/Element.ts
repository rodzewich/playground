/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/div/IElement.ts" />
/// <reference path="./../../../elements/div/IOptions.ts" />

module xlib.ui.element.adapters.node.td {

  export class Element extends node.Element implements element.elements.td.IElement<string> {

    constructor(options?: element.elements.td.IOptions<string>) {
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
      return "td";
    }

  }

}