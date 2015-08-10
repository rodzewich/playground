/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/div/IElement.ts" />
/// <reference path="./../../../elements/div/IOptions.ts" />

module xlib.ui.element.adapters.node.table {

  export class Element extends node.Element implements element.elements.table.IElement<string> {

    constructor(options?: element.elements.table.IOptions<string>) {
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
      return ["thead", "tbody", "tfoot"];
    }

    public getTag(): string {
      return "table";
    }

  }

}