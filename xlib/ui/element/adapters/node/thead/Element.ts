/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/div/IElement.ts" />
/// <reference path="./../../../elements/div/IOptions.ts" />

module xlib.ui.element.adapters.node.thead {

  export class Element extends node.Element implements element.elements.thead.IElement<string> {

    constructor(options?: element.elements.thead.IOptions<string>) {
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
      return "thead";
    }

  }

}