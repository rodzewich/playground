/// <reference path="../Element.ts" />
/// <reference path="../../elements/IOptions.ts" />
/// <reference path="../../elements/IElement.ts" />

module xlib.ui.element.adapters.browser {

  function checkAppend(self: Element, element: Element): void {
    if (!(element instanceof Element)) {
      throw new Error("bla bla bla");
    }
    if (!self.allowChildren()) {
      throw new Error("bla bla bla");
    }
    if (self.allowTags().indexOf(element.getTag()) === -1) {
      throw new Error("bla bla bla");
    }
  }

  import IEvent = element.elements.IEvent;

  // todo: see http://htmlbook.ru/html/attr/common

  export class Element extends adapters.Element<HTMLElement> implements element.elements.IElement<HTMLElement> {

    private _document: Document;

    private _element: HTMLElement;

    private _items: Element[];

    private _realListeners: any;

    protected realListeners(): any {
      if (xlib.typeOf(this._realListeners) !== "object") {
        this._realListeners = {};
      }
      return this._realListeners;
    }

    protected items(): Element[] {
      if (xlib.typeOf(this._items) !== "array") {
        this._items = [];
      }
      return this._items;
    }

    protected element(): HTMLElement {
      if (xlib.typeOf(this._element) === "undefined") {
        this._element = this.getDocument().createElement(this.getTag());
      }
      return this._element;
    }

    public getDocument(): Document {
      return this._document || document;
    }

    public setDocument(value: Document): void {
      this._document = value || document;
    }

    public getParent(): Element {
      return <Element>super.getParent();
    }

    public setParent(value: Element): void {
      if (!(value instanceof Element) && value !== null) {
        throw new Error("bla bla bla");
      }
      super.setParent(value);
    }

    public getText(): string {
      var elements: NodeList;
      super.getText();
      elements = this.element().childNodes;
      if (elements.length === 1 && elements.item(0).nodeType === 3) {
        return String(elements.item(0).nodeValue || "")
      } else if (elements.length !== 0) {
        throw new Error("bla bla bla");
      }
      return null;
    }

    public setText(value: string): void {
      var elements: NodeList,
        document: Document,
        element: HTMLElement,
        length: number;
      super.setText(value);
      document = this.getDocument();
      element = this.element();
      elements = element.childNodes;
      length = elements.length;
      if (length === 0) {
        element.appendChild(document.createTextNode(String(value || "")));
      } else if (length === 1 && elements.item(0).nodeType === 3) {
        elements.item(0).nodeValue = String(value || "");
      } else {
        throw new Error("bla bla bla");
      }
    }

    public getHtml(): string {
      super.getHtml();
      return String(this.element().innerHTML || "") || null;
    }

    public setHtml(value: string): void {
      super.setHtml(value);
      this.element().innerHTML = String(value || "");
    }

    public getTag(): string {
      return null;
    }

    public setAttribute(name: string, value: string): void {
      var temp: string = String(name || "");
      super.setAttribute(temp, value);
      this.element().setAttribute(temp, String(value || ""));
    }

    public getAttribute(name: string): string {
      var temp: string = String(name || "");
      super.getAttribute(temp);
      if (this.hasAttribute(temp)) {
        return this.element().getAttribute(temp) || "";
      }
      return null;
    }

    public hasAttribute(name: string): boolean {
      var temp: string = String(name || "");
      super.hasAttribute(temp);
      return !!this.element().hasAttribute(temp);
    }

    public removeAttribute(name: string): void {
      var temp: string = String(name || "");
      super.removeAttribute(temp);
      if (this.hasAttribute(temp)) {
        this.element().removeAttribute(temp);
      }
    }

    public getAttributes(): any {
      var attributes: any = {},
        index: number,
        value: string,
        name: string,
        length: number = this.element().attributes.length;
      for (index = 0; index < length; index++) {
        name  = this.element().attributes[index].name;
        value = this.getAttribute(name);
        if (xlib.typeOf(value) === "string") {
          attributes[name] = value;
        }
      }
      return attributes;
    }

    public removeId(): void {
      var element: HTMLElement = this.element();
      if (element.hasAttribute("id")) {
        element.removeAttribute("id");
      }
    }

    public setId(value: string): void {
      var temp: string = String(value || "");
      super.setId(temp);
      this.element().id = temp;
    }

    public getId(): string {
      return this.element().id || null;
    }

    public addClass(name: string): void {
      var temp: string = String(name || ""),
        element: HTMLElement,
        result: string[],
        index: number,
        length: number;
      super.addClass(temp);
      element = this.element();
      if (element && element.classList) {
        element.classList.add(temp);
      } else {
        result = String(element.className || "").split(/\s+/).
          filter((element: string) => { return !!element; });
        if (result.indexOf(temp) === -1) {
          result.push(temp);
          element.className = result.join(" ");
        }
      }
    }

    public hasClass(name: string): boolean {
      var temp: string = String(name || ""),
        element: HTMLElement;
      super.hasClass(temp);
      element = this.element()
      if (element && element.classList) {
        return !!element.classList.contains(temp);
      }
      return String(element.className || "").split(/\s+/).indexOf(temp) !== -1;
    }

    public toggleClass(name: string): void {
      var temp: string = String(name || ""),
        element: HTMLElement;
      super.toggleClass(temp);
      element = this.element();
      if (element && element.classList) {
        element.classList.toggle(temp);
      } else if (this.hasClass(temp)) {
        this.removeClass(temp);
      } else {
        this.addClass(temp);
      }
    }

    public removeClass(name: string): void {
      var temp: string = String(name || ""),
        element: HTMLElement,
        length: number,
        index: number,
        temp1: string[],
        temp2: string[] = [];
      super.removeClass(temp);
      element = this.element();
      if (element && element.classList) {
        element.classList.remove(temp);
      } else {
        element.className = String(element.className || "").split(/\s+/).
          filter((element: string) => { return !!element && element !== temp; }).join(" ");
      }
    }

    public getClasses(): string[] {
      var element: HTMLElement = this.element();
      return String(element.className || "").split(/\s+/).
        filter((element: string) => { return !!element; });
    }

    public setStyle(name: string, value: string): void {
      var temp: string = String(name || ""),
        element: HTMLElement,
        result: string = String(value);
      if (["null", "undefined"].indexOf(xlib.typeOf(value)) !== -1) {
        result = "";
      }
      super.setStyle(temp, result);
      // todo: set for webkit and moz browsers
      element = this.element();
      element.style[temp] = result;
    }

    public getStyle(name: string): string {
      var temp: string = String(name || ""),
        element: HTMLElement;
      super.getStyle(temp);
      // todo: set for webkit and moz browsers
      element = this.element();
      if (xlib.typeOf(element.style[temp]) !== "undefined") {
        return element.style[temp] || null;
      }
      return null;
    }

    public removeStyle(name: string): void {
      var temp: string = String(name || ""),
        element: HTMLElement;
      super.removeStyle(temp);
      // todo: set for webkit and moz browsers
      element = this.element();
      if (xlib.typeOf(element.style[temp]) !== "undefined") {
        element.style[temp] = "";
      }
    }

    public getStyles(): any {
      var style: any = {},
        temp: string = String(name || ""),
        element: HTMLElement;
      super.getStyles();
      // todo: set for webkit and moz browsers
      element = this.element();
      Object.keys(element.style).forEach((key: string) => {
        if (element.style[key] &&
          xlib.typeOf(element.style[key]) === "string") {
          style[key] = element.style[key];
        }
      });
      return style;
    }

    public on(name: string, listener: (event: IEvent<HTMLElement>) => void): void {
      this.bind(name, listener);
    }

    public bind(name: string, listener: (event: IEvent<HTMLElement>) => void): void {
      var temp: string = String(name || ""),
        element: HTMLElement,
        listeners: any;
      super.bind(temp, listener);
      element = this.element();
      listeners = this.realListeners();
      if (xlib.typeOf(listeners[temp]) !== "function") {
        listeners[temp] = () => {
          // todo: use crossbrowser events !!!
          super.emit(temp);
        };
        if (element.addEventListener) {
          element.addEventListener(temp, listeners[temp]);
        } else {
          element.attachEvent('on' + temp, listeners[temp]);
        }
      }
    }

    public unbind(name: string, listener?: (event: IEvent<HTMLElement>) => void): void {
      var temp: string = String(name || ""),
        listeners: any = this.listeners(),
        realListeners: any = this.realListeners(),
        element: HTMLElement;
      super.unbind(name, listener);
      if (xlib.typeOf(listeners[temp]) === "array" &&
        xlib.typeOf(realListeners[temp] === "function") &&
        (<Array<(event: IEvent<HTMLElement>) => void>>listeners[temp]).length === 0) {
        element = this.element();
        if (element.removeEventListener) {
          element.removeEventListener(temp, realListeners[temp]);
        } else {
          element.detachEvent('on' + temp, realListeners[temp]);
        }
        delete realListeners[temp];
      }
    }

    public emit(name: string, ...args: any[]): void {
      var event: any,
        temp: string = String(name + ""),
        element: HTMLElement = this.element(),
        document: Document = this.getDocument();
      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(temp, true, true);
      } else {
        event = document.createEventObject();
        event.eventType = temp;
      }
      event.data = args; // todo: fix this !!!
      event.eventName = temp;
      if (document.createEvent) {
        element.dispatchEvent(event);
      } else {
        element.fireEvent("on" + temp, event);
      }

    }


    public append(element: Element): void {
      checkAppend(this, element);
      if (this.getDocument() !== element.getDocument()) {
        throw new Error("bla bla bla");
      }
      if (element.getParent()) {
        element.getParent().remove(element);
      }
      if (element.content().parentNode) {
        element.content().parentNode.removeChild(element.content());
      }
      this.items().push(element);
      this.content().appendChild(element.content());
    }

    public appendTop(element: Element): void {}

    public appendBottom(element: Element): void {
      if (this.getDocument() !== element.getDocument()) {
        throw new Error("bla bla bla");
      }
      if (element.getParent()) {
        element.getParent().remove(element);
      }
      if (element.content().parentNode) {
        element.content().parentNode.removeChild(element.content());
      }
      this.items().push(element);
      this.content().appendChild(element.content());
    }

    public appendAfter(element1: Element, element2: Element): void {}

    public appendBefore(element1: Element, element2: Element): void {}

    public remove(element: Element): void {}

    public content(): HTMLElement {
      return this.element();
    }

  }

}