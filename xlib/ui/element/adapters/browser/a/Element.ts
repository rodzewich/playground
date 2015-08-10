/// <reference path="./../Element.ts" />
/// <reference path="./../../../elements/a/IElement.ts" />
/// <reference path="./../../../elements/a/IOptions.ts" />

module xlib.ui.element.adapters.browser.a {

  import IEvent = elements.IEvent;

  export class Element extends browser.Element implements element.elements.a.IElement<HTMLElement> {

    constructor(options?: element.elements.a.IOptions<HTMLElement>) {
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
      if (options && xlib.typeOf(options.accessKey) !== "undefined") {
        this.setAccessKey(options.accessKey);
      }
      if (options && xlib.typeOf(options.tabIndex) !== "undefined") {
        this.setTabIndex(options.tabIndex);
      }
      if (options && xlib.typeOf(options.charset) !== "undefined") {
        this.setCharset(options.charset);
      }
      if (options && xlib.typeOf(options.type) !== "undefined") {
        this.setType(options.type);
      }
      if (options && xlib.typeOf(options.name) !== "undefined") {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.href) !== "undefined") {
        this.setHref(options.href);
      }
      if (options && xlib.typeOf(options.hrefLang) !== "undefined") {
        this.setHrefLang(options.hrefLang);
      }
      if (options && xlib.typeOf(options.rel) !== "undefined") {
        this.setRel(options.rel);
      }
      if (options && xlib.typeOf(options.rev) !== "undefined") {
        this.setRev(options.rev);
      }
      if (options && xlib.typeOf(options.shape) !== "undefined") {
        this.setShape(options.shape);
      }
      if (options && xlib.typeOf(options.coords) !== "undefined") {
        this.setCoords(options.coords);
      }
      if (options && xlib.typeOf(options.target) !== "undefined") {
        this.setTarget(options.target);
      }
      if (options && xlib.typeOf(options.download) !== "undefined") {
        this.setDownload(options.download);
      }
    }

    public attributesDeny(): string[] {
      // todo: adjust xml:lang
      return super.attributesDeny().concat(["title", "lang", "xml:lang", "dir", "accesskey", "tabindex", "charset", "type", "name", "href", "hreflang", "rel", "rev", "shape", "coords"]);
    }

    public attributesAllow(): string[] {
      return super.attributesAllow().concat(["title", "lang", "xml:lang", "dir", "accesskey", "tabindex", "charset", "type", "name", "href", "hreflang", "rel", "rev", "shape", "coords"]);
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
      return ["abbr", "acronym", "b", "bdo", "big", "br", "button", "cite", "code", "del", "dfn", "em", "i", "img", "input", "ins", "kbd", "label", "map", "object", "q", "samp", "script", "select", "small", "span", "strong", "sub", "sup", "textarea", "tt", "var"];
    }

    public getTag(): string {
      return "a";
    }

    public getDownload(): boolean {
      var element: HTMLElement = this.element(),
        value: string = String(element.getAttribute("title") || "") || null;
      return element.hasAttribute("download") || value === "download";
    }

    public setDownload(value: boolean): void {
      var temp: boolean = xlib.isTrue(value),
        element: HTMLElement = this.element();
      if (!temp) {
        element.removeAttribute("download");
      } else {
        element.setAttribute("download", "download");
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

    public setXmlLang(value: string) {
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

    public setDir(value: string) {
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

    public getCharset(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("charset") || "") || null;
    }

    public setCharset(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("tabindex");
      } else {
        element.setAttribute("tabindex", temp);
      }
    }

    public getType(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("type") || "") || null;
    }

    public setType(value) {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("type");
      } else {
        element.setAttribute("type", temp);
      }
    }

    public getName(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("name") || "") || null;
    }

    public setName(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("name");
      } else {
        element.setAttribute("name", temp);
      }
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

    public getRel(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("rel") || "") || null;
    }

    public setRel(value: string): void {
      var temp: string = String(value || "").toLowerCase(),
        element: HTMLElement = this.element(),
        values: string[] = ["pronunciation", "accessibility", "acquaintance",
          "admin", "ajax", "alternate", "answer", "application-manifest",
          "archives", "author", "bookmark", "canonical", "canonical-domain",
          "canonical-first", "canonical-human", "canonical-organization",
          "canonical-wwwnone", "chapter", "child", "co-resident", "co-worker",
          "colleague", "contact", "contributor", "crush", "date",
          "dns-prefetch", "edit", "edituri", "enclosure", "enlarged",
          "external", "extension", "first", "friend", "gallery", "glossary",
          "help", "hub", "i18nrules", "icon", "index", "jump", "kin", "last",
          "latest-version", "license", "login", "logout", "longdesc", "map",
          "me", "met", "meta", "muse", "neighbor", "next", "next-archive",
          "nofollow", "noreferrer", "noprefetch", "note", "openid.delegate",
          "openid.server", "openid2.local_id", "openid2.provider", "parent",
          "payment", "pgpkey", "pingback", "prefetch", "prerender", "presentation",
          "prev", "prev-archive", "print", "profile", "question", "related",
          "reply", "resource-package", "resources", "reviewer", "script",
          "search", "self", "service", "shortlink", "sibling", "sidebar",
          "spouse", "statechart", "stylesheet", "subresource", "sweetheart",
          "tag", "technicalauthor", "thread", "timesheet", "topic", "translatedfrom",
          "translator", "up", "us", "webmaster", "widget", "wlwmanifest"];
      if (temp === "") {
        element.removeAttribute("hreflang");
      } else {
        if (values.indexOf(temp) === -1) {
          throw new Error("bla bla bla");
        }
        element.setAttribute("rel", temp);
      }
    }

    public getRev(): string {
      var element: HTMLElement = this.element();
      return String(element.getAttribute("rev") || "") || null;
    }

    public setRev(value: string): void {
      var temp: string = String(value || ""),
        element: HTMLElement = this.element();
      if (temp === "") {
        element.removeAttribute("rev");
      } else {
        element.setAttribute("rev", temp);
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
      this.on("mousepress", listener);
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