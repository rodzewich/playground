/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/area/IElement.ts" />
/// <reference path="./../../../elements/area/IOptions.ts" />

module xlib.ui.element.adapters.browser.area {

  import IEvent = elements.IEvent;

  export class Element extends browser.Element implements element.elements.area.IElement<HTMLElement> {

    constructor(options?: element.elements.area.IOptions<HTMLElement>) {
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
      if (options && xlib.typeOf(options.shape) !== "undefined") {
        this.setShape(options.shape);
      }
      if (options && xlib.typeOf(options.coords) !== "undefined") {
        this.setCoords(options.coords);
      }
      if (options && xlib.typeOf(options.href) !== "undefined") {
        this.setHref(options.href);
      }
      if (options && xlib.typeOf(options.noHref) !== "undefined") {
        this.setNoHref(options.noHref);
      }
      if (options && xlib.typeOf(options.hrefLang) !== "undefined") {
        this.setHrefLang(options.hrefLang);
      }
      if (options && xlib.typeOf(options.alt) !== "undefined") {
        this.setAlt(options.alt);
      }
      if (options && xlib.typeOf(options.tabIndex) !== "undefined") {
        this.setTabIndex(options.tabIndex);
      }
      if (options && xlib.typeOf(options.accessKey) !== "undefined") {
        this.setAccessKey(options.accessKey);
      }
      if (options && xlib.typeOf(options.target) !== "undefined") {
        this.setTarget(options.target);
      }
      if (options && xlib.typeOf(options.type) !== "undefined") {
        this.setType(options.type);
      }
    }

    public attributesDeny(): string[] {
      // todo: adjust xml:lang
      return super.attributesDeny().concat(["title", "lang", "xml:lang", "dir", "shape", "coords", "href", "nohref", "hreflang", "alt", "tabindex", "accesskey", "target", "type"]);
    }

    public attributesAllow(): string[] {
      return super.attributesAllow().concat(["title", "lang", "xml:lang", "dir", "shape", "coords", "href", "nohref", "hreflang", "alt", "tabindex", "accesskey", "target", "type"]);
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
      return "area";
    }

    public getTitle(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("title") || "").replace(/^_/, "") || null;
    }

    public setTitle(value: string): void {
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

    public getShape(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("shape") || "") || null;
    }

    public setShape(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("hreflang");
      } else {
        if (["circle", "default", "poly", "rect"].indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("rel", temp);
      }
    }

    public getCoords(): number[] {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("coords") || "").split(/\s*,\s*/).
        map((element: string) => {
          var value: number = parseFloat(element);
          if (isNaN(value)) {
            throw new Error("bla bla bla");
          }
          return parseFloat(element);
        });
    }

    public setCoords(value: number[]): void {
      var result: string[] = [],
        shape: string = this.getShape(),
        element: HTMLElement = this.element();
      // todo: adjust empty/null value
      if (xlib.typeOf(value) !== "array") {
        throw new Error("bla bla bla");
      }
      if (!element.hasAttribute("shape")) {
        throw new Error("bla bla bla");
      }
      if (["default", "rect"].indexOf(shape) !== -1 && value.length !== 4) {
        throw new Error("bla bla bla");
      }
      if (shape === "circle" && value.length !== 3) {
        throw new Error("bla bla bla");
      }
      if (shape === "poly" && !(value.length > 5 && value.length % 2 === 0)) {
        throw new Error("bla bla bla");
      }
      if (["circle", "default", "poly", "rect"].indexOf(shape) === -1) {
        throw new Error("bla bla bla");
      }
      value.forEach((element: number) => {
        var value: number = parseFloat(String(element));
        if (isNaN(value)) {
          throw new Error("bla bla bla");
        }
        result.push(String(value));
      });
      element.setAttribute("coords", result.join(", "));
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

    public getNoHref(): boolean {
      var element: HTMLElement = this.element(),
        value: string = String(element.getAttribute("title") || "") || null;
      return element.hasAttribute("nohref") || value === "nohref";
    }

    public setNoHref(value: boolean): void {
      var temp: boolean = xlib.isTrue(value),
        element: HTMLElement = this.element();
      if (!temp) {
        element.removeAttribute("nohref");
      } else {
        element.setAttribute("nohref", "nohref");
      }
    }

    public getHrefLang(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("hreflang") || "") || null;
    }

    public setHrefLang(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("hreflang");
      } else {
        element.setAttribute("hreflang", temp);
      }
    }

    public getAlt(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("alt") || "") || null;
    }

    public setAlt(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("alt");
      } else {
        element.setAttribute("alt", temp);
      }
    }

    public getTabIndex(): number {
      var element: HTMLElement = this.element();
      return parseInt(element.getAttribute("tabindex") || "0", 10) || 0;
    }

    public setTabIndex(value: number): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("tabindex");
      } else {
        if (!/^\d+$/.test(temp)) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("tabindex", temp);
      }
    }

    public getAccessKey(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("accesskey") || "") || null;
    }

    public setAccessKey(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("accesskey");
      } else {
        if (!/^[a-z0-9]$/.test(temp)) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("accesskey", temp);
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

    public getType(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("type") || "") || null;
    }

    public setType(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("type");
      } else {
        element.setAttribute("type", temp);
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

    public onFocus(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("keydown", listener);
    }

    public onFocusIn(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("focusin", listener);
    }

    public onFocusOut(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("focusout", listener);
    }

    public onBlur(listener: (event?: IEvent<HTMLElement>) => void): void {
      this.on("blur", listener);
    }

  }

}