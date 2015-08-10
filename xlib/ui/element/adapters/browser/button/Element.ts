/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/button/IElement.ts" />
/// <reference path="./../../../elements/button/IOptions.ts" />

module xlib.ui.element.adapters.browser.button {

  import IEvent = elements.IEvent;

  export class Element extends browser.Element implements element.elements.button.IElement<HTMLElement> {

    constructor(options?: element.elements.button.IOptions<HTMLElement>) {
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
      if (options && xlib.typeOf(options.name) !== "undefined") {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.value) !== "undefined") {
        this.setValue(options.value);
      }
      if (options && xlib.typeOf(options.type) !== "undefined") {
        this.setType(options.type);
      }
      if (options && xlib.typeOf(options.disabled) !== "undefined") {
        this.setDisabled(options.disabled);
      }
      if (options && xlib.typeOf(options.accessKey) !== "undefined") {
        this.setAccessKey(options.accessKey);
      }
      if (options && xlib.typeOf(options.tabIndex) !== "undefined") {
        this.setTabIndex(options.tabIndex);
      }
      if (options && xlib.typeOf(options.autoFocus) !== "undefined") {
        this.setAutoFocus(options.autoFocus);
      }
      if (options && xlib.typeOf(options.form) !== "undefined") {
        this.setForm(options.form);
      }
      if (options && xlib.typeOf(options.formAction) !== "undefined") {
        this.setFormAction(options.formAction);
      }
      if (options && xlib.typeOf(options.formEnctype) !== "undefined") {
        this.setFormEnctype(options.formEnctype);
      }
      if (options && xlib.typeOf(options.formMethod) !== "undefined") {
        this.setFormMethod(options.formMethod);
      }
      if (options && xlib.typeOf(options.formNovalidate) !== "undefined") {
        this.setFormNovalidate(options.formNovalidate);
      }
      if (options && xlib.typeOf(options.formTarget) !== "undefined") {
        this.setFormTarget(options.formTarget);
      }
    }

    public attributesDeny(): string[] {
      // todo: fix xml:lang
      return super.attributesDeny().concat(["title", "lang", "xml:lang", "dir", "name", "value", "type", "disabled", "accesskey", "tabindex", "autofocus", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"]);
    }

    public attributesAllow(): string[] {
      return super.attributesAllow().concat(["title", "lang", "xml:lang", "dir", "name", "value", "type", "disabled", "accesskey", "tabindex", "autofocus", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"]);
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
      return ["abbr", "acronym", "address", "b", "bdo", "big", "blockquote", "br", "cite", "code", "del", "dfn", "div", "dl", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "map", "noscript", "object", "ol", "p", "pre", "q", "samp", "script", "small", "span", "strong", "sub", "sup", "table", "tt", "ul", "var"];
    }

    public getTag(): string {
      return "button";
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

    public getName(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("name") || "") || null;
    }

    public setName(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("name");
      } else {
        element.setAttribute("name", temp);
      }
    }

    public getValue(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("value") || "") || null;
    }

    public setValue(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("value");
      } else {
        element.setAttribute("value", temp);
      }
    }

    public getType(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("type") || "") || null;
    }

    public setType(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("type");
      } else {
        if (["button", "reset", "submit"].indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("type", temp);
      }
    }

    public getDisabled(): boolean {
      var element: HTMLElement = this.element(),
        value: string = String(element.getAttribute("disabled") || "") || null;
      return element.hasAttribute("disabled") || value === "disabled";
    }

    public setDisabled(value: boolean): void {
      var temp: boolean = xlib.isTrue(value),
        element: HTMLElement = this.element();
      if (!temp) {
        element.removeAttribute("disabled");
      } else {
        element.setAttribute("disabled", "disabled");
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

    public getAutoFocus(): boolean {
      var element: HTMLElement = this.element(),
        value: string = String(element.getAttribute("autofocus") || "") || null;
      return element.hasAttribute("autofocus") || value === "autofocus";
    }

    public setAutoFocus(value: boolean): void {
      var temp: boolean = xlib.isTrue(value),
        element: HTMLElement = this.element();
      if (!temp) {
        element.removeAttribute("autofocus");
      } else {
        element.setAttribute("autofocus", "autofocus");
      }
    }

    public getForm(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("form") || "") || null;
    }

    public setForm(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("form");
      } else {
        element.setAttribute("form", temp);
      }
    }

    public getFormAction(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("formaction") || "") || null;
    }

    public setFormAction(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("formaction");
      } else {
        element.setAttribute("formaction", temp);
      }
    }

    public getFormEnctype(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("formenctype") || "") || null;
    }

    public setFormEnctype(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element(),
        values: string[] = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
      if (temp === "") {
        element.removeAttribute("formenctype");
      } else {
        if (values.indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("formenctype", temp);
      }
    }

    public getFormMethod(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("formmethod") || "") || null;
    }

    public setFormMethod(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element(),
        values: string[] = ["post", "get"];
      if (temp === "") {
        element.removeAttribute("formmethod");
      } else {
        if (values.indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("formmethod", temp);
      }
    }

    public getFormNovalidate(): boolean {
      var element: HTMLElement = this.element(),
        value: string = String(element.getAttribute("novalidate") || "") || null;
      return element.hasAttribute("novalidate") || value === "novalidate";
    }

    public setFormNovalidate(value: boolean): void {
      var temp: boolean = xlib.isTrue(value),
        element: HTMLElement = this.element();
      if (!temp) {
        element.removeAttribute("novalidate");
      } else {
        element.setAttribute("novalidate", "novalidate");
      }
    }

    public getFormTarget(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("formtarget") || "") || null;
    }

    public setFormTarget(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element(),
        values: string[] = ["blank", "self", "parent", "top"];
      if (temp === "") {
        element.removeAttribute("formtarget");
      } else {
        if (values.indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("formtarget", "_" + temp);
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
      this.on("focus", listener);
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