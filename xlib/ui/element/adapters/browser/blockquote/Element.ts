/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/blockquote/IElement.ts" />
/// <reference path="./../../../elements/blockquote/IOptions.ts" />

module xlib.ui.element.adapters.browser.blockquote {

  import IEvent = elements.IEvent;

  export class Element extends browser.Element implements element.elements.blockquote.IElement<HTMLElement> {

    constructor(options?: element.elements.blockquote.IOptions<HTMLElement>) {
      super(options);
      if (options && xlib.typeOf(options.title) !== "undefined") {
        this.setTitle(options.title);
      }
      if (options && xlib.typeOf(options.lang) !== "undefined") {
        this.setLang(options.lang);
      }
      if (options && xlib.typeOf(options.xmlLang) !== "undefined") {
        this.setXmlLang(options.xmlLang);
      }
      if (options && xlib.typeOf(options.dir) !== "undefined") {
        this.setDir(options.dir);
      }
      if (options && xlib.typeOf(options.cite) !== "undefined") {
        this.setCite(options.cite);
      }
    }

    public attributesDeny(): string[] {
      // todo: adjust xml:lang
      return super.attributesDeny().concat(["title", "lang", "xml:lang", "dir", "cite"]);
    }

    public attributesAllow(): string[] {
      return super.attributesAllow().concat(["title", "lang", "xml:lang", "dir", "cite"]);
    }

    public allowChildren(): boolean {
      return true;
    }

    public allowText(): boolean {
      return true;
    }

    public allowHtml(): boolean {
      return true;
    }

    public allowTags(): string[] {
      return ["address", "blockquote", "del", "div", "dl", "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "ins", "noscript", "ol", "p", "pre", "script", "table", "ul"];
    }

    public getTag(): string {
      return "blockquote";
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

    public getLang(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("lang") || "") || null;
    }

    public setLang(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("lang");
      } else {
        element.setAttribute("lang", temp);
      }
    }

    public getXmlLang(): string {
      var element: HTMLElement = this.element();
      // todo: use element.getAttributeNs() !!!
      return String(element.getAttribute("xml:lang") || "") || null;
    }

    public setXmlLang(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        // todo: use element.removeAttributeNS() !!!
        element.removeAttribute("xml:lang");
      } else {
        // todo: use element.setAttributeNS() !!!
        element.setAttribute("xml:lang", temp);
      }
    }

    public getDir(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("dir") || "") || null;
    }

    public setDir(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("dir");
      } else {
        if (["ltr", "rtl"].indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("dir", temp);
      }
    }

    public getCite(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("cite") || "") || null;
    }

    public setCite(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("cite");
      } else {
        element.setAttribute("cite", temp);
      }
    }

    public onClick(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("click", listener);
    }

    public onDblClick(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("dblclick", listener);
    }

    public onMouseDown(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mousedown", listener);
    }

    public onMouseUp(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mouseup", listener);
    }

    public onMouseOver(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mouseover", listener);
    }

    public onMouseMove(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mousemove", listener);
    }

    public onMouseOut(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("mouseout", listener);
    }

    public onKeyPress(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keypress", listener);
    }

    public onKeyDown(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keydown", listener);
    }

    public onKeyUp(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keyup", listener);
    }

  }

}