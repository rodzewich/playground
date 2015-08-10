/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/br/IElement.ts" />
/// <reference path="./../../../elements/br/IOptions.ts" />

module xlib.ui.element.adapters.browser.br {

  export class Element extends browser.Element implements element.elements.br.IElement<HTMLElement> {

    constructor(options?: element.elements.br.IOptions<HTMLElement>) {
      super(options);
      if (options && xlib.typeOf(options.title) !== "undefined") {
        this.setTitle(options.title);
      }
      if (options && xlib.typeOf(options.clear) !== "undefined") {
        this.setClear(options.clear);
      }
    }

    public attributesDeny(): string[] {
      return super.attributesDeny().concat(["title"]);
    }

    public attributesAllow(): string[] {
      return super.attributesAllow().concat(["title"]);
    }

    public allowChildren(): boolean {
      return false;
    }

    public allowText(): boolean {
      return false;
    }

    public allowHtml(): boolean {
      return false;
    }

    public allowTags(): string[] {
      return [];
    }

    public getTag(): string {
      return "br";
    }

    public getTitle(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("title") || "") || null;
    }

    public setTitle(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("title");
      } else {
        element.setAttribute("title", temp);
      }
    }

    public getClear(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("clear") || "") || null;
    }

    public setClear(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("clear");
      } else {
        if (["all", "left", "right", "none"].indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("clear", temp);
      }
    }

  }

}