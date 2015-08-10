/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/meta/IElement.ts" />
/// <reference path="./../../../elements/meta/IOptions.ts" />

module xlib.ui.element.adapters.browser.meta {

  import IEvent = element.elements.IEvent;

  export class Element extends browser.Element implements element.elements.meta.IElement<HTMLElement> {

    constructor(options?: element.elements.meta.IOptions<HTMLElement>) {
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
      return false;
    }

    public allowHtml(): boolean {
      return false;
    }

    public allowTags(): string[] {
      return [];
    }

    public getTag(): string {
      return "meta";
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

    public getDir(): string {
      return null;
    }

    public setDir(value: any): void {}

    public getHttpEquiv(): string {
      return null;
    }

    public setHttpEquiv(value: any): void {}

    public getName(): string {
      return null;
    }

    public setName(value: any): void {}

    public getContent(): string {
      return null;
    }

    public setContent(value: any): void {}

    public getScheme(): string {
      return null;
    }

    public setScheme(value: any): void {}


  }

}