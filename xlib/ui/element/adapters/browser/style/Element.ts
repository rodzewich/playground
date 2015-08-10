/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/style/IElement.ts" />
/// <reference path="./../../../elements/style/IOptions.ts" />

module xlib.ui.element.adapters.browser.style {

  export class Element extends browser.Element implements element.elements.style.IElement<HTMLElement> {

    constructor(options?: element.elements.style.IOptions<HTMLElement>) {
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
      return false;
    }

    public allowText(): boolean {
      return true;
    }

    public allowHtml(): boolean {
      return false;
    }

    public allowTags(): string[] {
      return [];
    }

    public getTag(): string {
      return "style";
    }

    // todo: fix it
    public getLang(): string {
      return null;
    }

    public setLang(value: any): void {}

    public getXmlLang(): string {
      return null;
    }

    public setXmlLang(value: any): void {}

    public getXmlSpace(): string {
      return null;
    }

    public setXmlSpace(value: any): void {}

    public getDir(): string {
      return null;
    }

    public setDir(value: any): void {}

    public getType(): string {
      return null;
    }

    public setType(value: any): void {}

    public getMedia(): string {
      return null;
    }

    public setMedia(value: any): void {}

    public getTitle(): string {
      return null;
    }

    public setTitle(value: any): void {}

  }

}