/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/body/IElement.ts" />
/// <reference path="./../../../elements/body/IOptions.ts" />

module xlib.ui.element.adapters.browser.body {

  import IEvent = elements.IEvent;

  export class Element extends browser.Element implements element.elements.body.IElement<HTMLElement> {

    constructor(options?: element.elements.body.IOptions<HTMLElement>) {
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
      if (options && xlib.typeOf(options.aLink) !== "undefined") {
        this.setALink(options.aLink);
      }
      if (options && xlib.typeOf(options.background) !== "undefined") {
        this.setBackground(options.background);
      }
      if (options && xlib.typeOf(options.bgColor) !== "undefined") {
        this.setBgColor(options.bgColor);
      }
      if (options && xlib.typeOf(options.bgProperties) !== "undefined") {
        this.setBgProperties(options.bgProperties);
      }
      if (options && xlib.typeOf(options.bottomMargin) !== "undefined") {
        this.setBottomMargin(options.bottomMargin);
      }
      if (options && xlib.typeOf(options.leftMargin) !== "undefined") {
        this.setLeftMargin(options.leftMargin);
      }
      if (options && xlib.typeOf(options.rightMargin) !== "undefined") {
        this.setRightMargin(options.rightMargin);
      }
      if (options && xlib.typeOf(options.topMargin) !== "undefined") {
        this.setTopMargin(options.topMargin);
      }
      if (options && xlib.typeOf(options.link) !== "undefined") {
        this.setLink(options.link);
      }
      if (options && xlib.typeOf(options.scroll) !== "undefined") {
        this.setScroll(options.scroll);
      }
      if (options && xlib.typeOf(options.textColor) !== "undefined") {
        this.setTextColor(options.textColor);
      }
      if (options && xlib.typeOf(options.vLink) !== "undefined") {
        this.setVLink(options.vLink);
      }
    }

    public attributesDeny(): string[] {
      // todo: adjust xml:lang
      return super.attributesDeny().concat(["title", "lang", "xml:lang", "dir"]);
    }

    public attributesAllow(): string[] {
      return super.attributesAllow().concat(["title", "lang", "xml:lang", "dir"]);
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
      return ["a", "abbr", "acronym", "address", "b", "bdo", "big", "blockquote", "br", "button", "cite", "code", "del", "dfn", "div", "dl", "em", "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "input", "ins", "kbd", "label", "map", "noscript", "object", "ol", "p", "pre", "q", "samp", "script", "select", "small", "span", "strong", "sub", "sup", "table", "textarea", "tt", "ul", "var"];
    }

    public getTag(): string {
      return "body";
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

    public getALink(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("alink") || "") || null;
    }

    public setALink(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("alink");
      } else {
        // todo: check color !!!
        element.setAttribute("alink", temp);
      }
    }

    public getBackground(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("background") || "") || null;
    }

    public setBackground(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("background");
      } else {
        element.setAttribute("background", temp);
      }
    }

    public getBgColor(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("bgcolor") || "") || null;
    }

    public setBgColor(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("bgcolor");
      } else {
        // todo: check color
        element.setAttribute("bgcolor", temp);
      }
    }

    public getBgProperties(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("bgproperties") || "") || null;
    }

    public setBgProperties(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("bgproperties");
      } else {
        if (temp !== "fixed") {
          throw new Error("bla bla bla");
        }
        element.setAttribute("bgproperties", temp);
      }
    }

    public getBottomMargin(): number {
      var element: HTMLElement = this.element();
      return parseInt(element.getAttribute("bottommargin") || "0", 10) || null;
    }

    public setBottomMargin(value: number): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("bottommargin");
      } else {
        // todo: check number
        element.setAttribute("bottommargin", temp);
      }
    }

    public getLeftMargin(): number {
      var element: HTMLElement = this.element();
      return parseInt(element.getAttribute("leftmargin") || "0", 10) || null;
    }

    public setLeftMargin(value: number): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("leftmargin");
      } else {
        // todo: check number
        element.setAttribute("leftmargin", temp);
      }
    }

    public getLink(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("link") || "") || null;
    }

    public setLink(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("link");
      } else {
        // todo: check color
        element.setAttribute("link", temp);
      }
    }

    public getRightMargin(): number {
      var element: HTMLElement = this.element();
      return parseInt(element.getAttribute("rightmargin") || "0", 10) || null;
    }

    public setRightMargin(value: number): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("rightmargin");
      } else {
        // todo: check number
        element.setAttribute("rightmargin", temp);
      }
    }

    public getScroll(): boolean {
      var element: HTMLElement = this.element(),
        value: string = String(element.getAttribute("text") || "").toLowerCase() || null;
      return value === "yes";
    }

    public setScroll(value: boolean): void {
      var temp: boolean = !!value, // todo: check multitype values
        element: HTMLElement = this.element();
      element.setAttribute("scroll", temp ? "yes" : "no");
    }

    public getTextColor(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("text") || "") || null;
    }

    public setTextColor(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("text");
      } else {
        // todo: check color
        element.setAttribute("text", temp);
      }
    }

    public getTopMargin(): number {
      var element: HTMLElement = this.element();
      return parseInt(element.getAttribute("topmargin") || "0", 10) || null;
    }

    public setTopMargin(value: number): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("topmargin");
      } else {
        // todo: check number
        element.setAttribute("topmargin", temp);
      }
    }

    public getVLink(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("vlink") || "") || null;
    }

    public setVLink(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("vlink");
      } else {
        // todo: check color
        element.setAttribute("vlink", temp);
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

    public onLoad(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("load", listener);
    }

    public onUnLoad(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("unload", listener);
    }

  }

}