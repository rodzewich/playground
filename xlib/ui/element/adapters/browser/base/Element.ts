/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/base/IElement.ts" />
/// <reference path="./../../../elements/base/IOptions.ts" />

module xlib.ui.element.adapters.browser.base {

  export class Element extends browser.Element implements element.elements.base.IElement<HTMLElement> {

    constructor(options?: element.elements.base.IOptions<HTMLElement>) {
      super(options);
    }

    public attributesDeny(): string[] {
      return super.attributesDeny().concat(["href", "target"]);
    }

    public attributesAllow(): string[] {
      return super.attributesAllow().concat(["href", "target"]);
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
      return "base";
    }

    public getHref(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("href") || "") || null;
    }

    public setHref(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("href");
      } else {
        element.setAttribute("href", temp);
      }
    }

    public getTarget(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("title") || "").replace(/^_/, "") || null;
    }

    public setTarget(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("target");
      } else {
        if (["blank", "self", "parent", "top"].indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("target", "_" + temp);
      }
    }

  }

}