/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/colgroup/IElement.ts" />
/// <reference path="./../../../elements/colgroup/IOptions.ts" />

module xlib.ui.element.adapters.browser.colgroup {

  import IEvent = elements.IEvent;

  export class Element extends browser.Element implements element.elements.colgroup.IElement<HTMLElement> {

    constructor(options?: element.elements.colgroup.IOptions<HTMLElement>) {
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
      if (options && xlib.typeOf(options.span) !== "undefined") {
        this.setSpan(options.span);
      }
      if (options && xlib.typeOf(options.width) !== "undefined") {
        this.setWidth(options.width);
      }
      if (options && xlib.typeOf(options.align) !== "undefined") {
        this.setAlign(options.align);
      }
      if (options && xlib.typeOf(options.char) !== "undefined") {
        this.setChar(options.char);
      }
      if (options && xlib.typeOf(options.charoff) !== "undefined") {
        this.setCharOff(options.charoff);
      }
      if (options && xlib.typeOf(options.valign) !== "undefined") {
        this.setVAlign(options.valign);
      }
    }

    public attributesDeny(): string[] {
      // todo: fix this xml:lang
      return super.attributesDeny().concat(["title", "lang", "xml:lang", "dir", "span", "width", "align", "char", "charoff", "valign"]);
    }

    public attributesAllow(): string[] {
      return super.attributesAllow().concat(["title", "lang", "xml:lang", "dir", "span", "width", "align", "char", "charoff", "valign"]);
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
      return ["col"];
    }

    public getTag(): string {
      return "colgroup";
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

    public getSpan(): number {
      var element: HTMLElement = this.element();
      return parseInt(element.getAttribute("span") || "0", 10) || null;
    }

    public setSpan(value: number): void {
      var temp: number = parseInt(String(value || ""), 10),
        element: HTMLElement = this.element();
      if (!temp) {
        element.removeAttribute("span");
      } else {
        // todo: check value
        element.setAttribute("span", String(temp));
      }
    }

    public getWidth(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("width") || "") || null;
    }

    public setWidth(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("width");
      } else {
        // todo: check value
        element.setAttribute("width", temp);
      }
    }

    public getAlign(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("align") || "") || null;
    }

    public setAlign(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("align");
      } else {
        if (["left", "center", "right", "justify"].indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("align", temp);
      }
    }

    public getChar(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("char") || "") || null;
    }

    public setChar(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("char");
      } else {
        // todo: check value
        element.setAttribute("char", temp);
      }
    }

    public getCharOff(): number {
      var element: HTMLElement = this.element();
      return parseInt(element.getAttribute("charoff") || "0", 10) || null;
    }

    public setCharOff(value: number): void {
      var temp: number = parseInt(String(value || ""), 10),
        element: HTMLElement = this.element();
      if (!temp) {
        element.removeAttribute("char");
      } else {
        // todo: check value
        element.setAttribute("char", String(temp));
      }
    }

    public getVAlign(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("valign") || "") || null;
    }

    public setVAlign(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("valign");
      } else {
        if (["baseline", "bottom", "middle", "top"].indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("valign", temp);
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