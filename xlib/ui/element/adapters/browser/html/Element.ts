/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/html/IElement.ts" />
/// <reference path="./../../../elements/html/IOptions.ts" />

module xlib.ui.element.adapters.browser.html {

  export class Element extends browser.Element implements element.elements.html.IElement<HTMLElement> {

    constructor(options?: element.elements.html.IOptions<HTMLElement>) {
      super(options);
    }

    public attributesDeny(): string[] {
      // todo: fix this
      return super.attributesDeny();
    }

    public attributesAllow(): string[] {
      // todo: fix this
      return super.attributesAllow();
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
      return ["head", "body"];
    }

    public getTag(): string {
      return "html";
    }

    // todo: fix this
    public getLang(): string {
      return null;
    }

    public setLang(value: string): void {}

    public getXmlLang(): string {
      return null;
    }

    public setXmlLang(value: string): void {}

    public getDir(): string {
      return null;
    }

    public setDir(value: string): void {}

    public getXmlNS(): string {
      return null;
    }

    public setXmlNS(value: string): void {}

  }

}