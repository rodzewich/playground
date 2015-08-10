/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/script/IElement.ts" />
/// <reference path="./../../../elements/script/IOptions.ts" />

module xlib.ui.element.adapters.browser.script {

  export class Element extends browser.Element implements element.elements.script.IElement<HTMLElement> {

    constructor(options?: element.elements.script.IOptions<HTMLElement>) {
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
      return "script";
    }

    // todo: fix it
    public getCharset(): string {
      return null;
    }

    public setCharset(value: any): void {}

    public getType(): string {
      return null;
    }

    public setType(value: any): void {}

    public getSrc(): string {
      return null;
    }

    public setSrc(value: any): void {}

    public getDefer(): string {
      return null;
    }

    public setDefer(value: any): void {}

    public getXmlSpace(): string {
      return null;
    }

    public setXmlSpace(value: any): void {}

    public getAsync(): string {
      return null;
    }

    public setAsync(value: any): void {}

    public getLanguage(): string {
      return null;
    }

    public setLanguage(value: any): void {}

  }

}