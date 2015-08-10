/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/div/IElement.ts" />
/// <reference path="./../../../elements/div/IOptions.ts" />

module xlib.ui.element.adapters.node.tbody {

  export class Element extends node.Element implements element.elements.tbody.IElement<string> {

    constructor(options?: element.elements.tbody.IOptions<string>) {
      super(options);
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
      return "tbody";
    }

  }

}