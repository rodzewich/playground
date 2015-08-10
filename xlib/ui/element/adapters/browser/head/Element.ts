/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/head/IElement.ts" />
/// <reference path="./../../../elements/head/IOptions.ts" />

module xlib.ui.element.adapters.browser.head {

  export class Element extends browser.Element implements element.elements.head.IElement<HTMLElement> {

    constructor(options?: element.elements.head.IOptions<HTMLElement>) {
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
      return ["base", "link", "meta", "object", "script", "style", "title"];
    }

    public getTag(): string {
      return "head";
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
    public getProfile(): string {
      return null;
    }

    public setProfile(value: string): void {}

  }

}