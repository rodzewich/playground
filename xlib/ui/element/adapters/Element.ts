/// <reference path="../elements/IOptions.ts" />

module xlib.ui.element.adapters {

  import IElement = element.elements.IElement;
  import IEvent = element.elements.IEvent;

  // todo: add webkit and moz properties
  var cssProperties: any = {
    // css1
    background: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPosition: true,
    backgroundRepeat: true,
    border: true,
    borderBottom: true,
    borderBottomColor: true,
    borderBottomStyle: true,
    borderBottomWidth: true,
    borderColor: true,
    borderLeft: true,
    borderLeftColor: true,
    borderLeftStyle: true,
    borderLeftWidth: true,
    borderRight: true,
    borderRightColor: true,
    borderRightStyle: true,
    borderRightWidth: true,
    borderStyle: true,
    borderTop: true,
    borderTopColor: true,
    borderTopStyle: true,
    borderTopWidth: true,
    borderWidth: true,
    clear: true,
    color: true,
    display: true,
    cssFloat: true,
    font: true,
    fontFamily: true,
    fontSize: true,
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    height: true,
    letterSpacing: true,
    lineHeight: true,
    listStyle: true,
    listStyleImage: true,
    listStylePosition: true,
    listStyleType: true,
    margin: true,
    marginBottom: true,
    marginLeft: true,
    marginRight: true,
    marginTop: true,
    padding: true,
    paddingBottom: true,
    paddingLeft: true,
    paddingRight: true,
    paddingTop: true,
    textAlign: true,
    textDecoration: true,
    textIndent: true,
    textTransform: true,
    verticalAlign: true,
    whiteSpace: true,
    width: true,
    wordSpacing: true,
    // css2
    borderCollapse: true,
    borderSpacing: true,
    bottom: true,
    captionSide: true,
    clip: true,
    content: true,
    counterIncrement: true,
    counterReset: true,
    cursor: true,
    direction: true,
    emptyCells: true,
    left: true,
    maxHeight: true,
    maxWidth: true,
    minHeight: true,
    minWidth: true,
    orphans: true,
    outline: true,
    outlineColor: true,
    outlineStyle: true,
    outlineWidth: true,
    overflow: true,
    pageBreakAfter: true,
    pageBreakBefore: true,
    pageBreakInside: true,
    position: true,
    quotes: true,
    right: true,
    tableLayout: true,
    top: true,
    unicodeBidi: true,
    visibility: true,
    widows: true,
    zIndex: true,
    // css3
    alignContent: true,
    alignItems: true,
    alignSelf: true,
    animation: true,
    animationDelay: true,
    animationDirection: true,
    animationDuration: true,
    animationFillMode: true,
    animationIterationCount: true,
    animationName: true,
    animationTimingFunction: true,
    animationPlayState: true,
    backgroundAttachment: true,
    backgroundClip: true,
    backgroundOrigin: true,
    backgroundSize: true,
    backfaceVisibility: true,
    borderBottomLeftRadius: true,
    borderBottomRightRadius: true,
    borderImage: true,
    borderImageOutset: true,
    borderImageRepeat: true,
    borderImageSlice: true,
    borderImageSource: true,
    borderImageWidth: true,
    borderRadius: true,
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    boxDecorationBreak: true,
    boxShadow: true,
    boxSizing: true,
    columnCount: true,
    columnFill: true,
    columnGap: true,
    columnRule: true,
    columnRuleColor: true,
    columnRuleStyle: true,
    columnRuleWidth: true,
    columns: true,
    columnSpan: true,
    columnWidth: true,
    flex: true,
    flexBasis: true,
    flexDirection: true,
    flexFlow: true,
    flexGrow: true,
    flexShrink: true,
    flexWrap: true,
    fontSizeAdjust: true,
    fontStretch: true,
    hangingPunctuation: true,
    hyphens: true,
    icon: true,
    imageOrientation: true,
    justifyContent: true,
    navDown: true,
    navIndex: true,
    navLeft: true,
    navRight: true,
    navUp: true,
    opacity: true,
    order: true,
    outlineOffset: true,
    overflowX: true,
    overflowY: true,
    perspective: true,
    perspectiveOrigin: true,
    resize: true,
    tabSize: true,
    textAlignLast: true,
    textDecorationColor: true,
    textDecorationLine: true,
    textDecorationStyle: true,
    textJustify: true,
    textOverflow: true,
    textShadow: true,
    transform: true,
    transformOrigin: true,
    transformStyle: true,
    transition: true,
    transitionProperty: true,
    transitionDuration: true,
    transitionTimingFunction: true,
    transitionDelay: true,
    wordBreak: true,
    wordWrap: true
  };

  // todo: check properties by type and regexp
  function checkStyle(name: string, value: any): void {
  }

  function checkExistsStyle(name: string): void {
    if (xlib.typeOf(cssProperties[String(name || "")]) === "undefined") {
      throw new Error("bla bla bla");
    }
  }

  function checkClass(name: string): void {
    if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)) {
      throw new Error("bla bla bla");
    }
  }

  function checkAttribute(element: IElement<any>, name: string): void {
    var temp: string = String(name || ""),
      attributesDeny: string[] = element.attributesDeny(),
      attributesAllow: string[] = element.attributesAllow();
    if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(temp)) {
      throw new Error("bla bla bla");
    }
    if (attributesDeny.indexOf(temp) !== -1) {
      throw new Error("bla bla bla");
    }
    if (attributesAllow.indexOf(temp) === -1) {
      throw new Error("bla bla bla");
    }
  }

  function checkAppend(element: IElement<any>): void {
    var length: number = element.children().length;
    if (length === 0 && element.allowText() && element.getText()) {
      throw new Error("bla bla bla");
    }
    if (length === 0 && element.allowHtml() && element.getHtml()) {
      throw new Error("bla bla bla");
    }
  }

  function checkText(element: IElement<any>): void {
    if (!element.allowText()) {
      throw new Error("bla bla bla");
    }
    if (element.children().length > 0) {
      throw new Error("bla bla bla");
    }
  }

  function checkHtml(element: IElement<any>): void {
    if (!element.allowHtml()) {
      throw new Error("bla bla bla");
    }
    if (element.children().length > 0) {
      throw new Error("bla bla bla");
    }
  }

  export class Element<T> implements IElement<T> {

    private _parent: Element<T>;

    private _listeners: any;

    protected listeners(): any {
      if (xlib.typeOf(this._listeners) !== "object") {
        this._listeners = {};
      }
      return this._listeners;
    }

    public attributesDeny(): string[] {
      return ["id", "class", "style"];
    }

    public attributesAllow(): string[] {
      return [];
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
      return [];
    }

    constructor (options?: element.elements.IOptions<T>) {
      var listener: string,
        length: number,
        style: string,
        index: number,
        temp: string[];
      if (options && xlib.typeOf(options.id) !== "undefined") {
        this.setId(String(options.id || ""));
      }
      if (options && xlib.typeOf(options.classes) === "array") {
        length = options.classes.length;
        for (index = 0; index < length; index++) {
          this.addClass(options.classes[index]);
        }
      } else if (options && xlib.typeOf(options.classes) === "string") {
        temp = (<string>options.classes).split(/\s+/);
        length = temp.length;
        for (index = 0; index < length; index++) {
          this.addClass(temp[index]);
        }
      } else if (options && xlib.typeOf(options.classes) !== "undefined") {
        throw new Error("bla bla bla");
      }
      if (options && xlib.typeOf(options.styles) === "object") {
        Object.keys(options.styles).forEach((key: string) => {
          this.setStyle(key, options.styles[key]);
        });
      } else if (options && xlib.typeOf(options.styles) !== "undefined") {
        throw new Error("bla bla bla");
      }
      if (options && xlib.typeOf(options.items) === "array") {
        length = (<IElement<T>[]>options.items).length;
        for (index = 0; index < length; index++) {
          this.append(<Element<T>>options.items[index]);
        }
      } else if (options && xlib.typeOf(options.items) !== "undefined") {
        throw new Error("bla bla bla");
      }
      if (options && xlib.typeOf(options.listeners) === "object") {
        for (listener in options.listeners) {
          if (!options.listeners.hasOwnProperty(listener)) {
            continue;
          }
          if (xlib.typeOf(options.listeners[listener]) !== "function") {
            throw new Error("bla bla bla");
          }
          this.bind(listener, options.listeners[listener]);
        }
      } else if (options && xlib.typeOf(options.listeners) !== "undefined") {
        throw new Error("bla bla bla");
      }
      if (options && xlib.typeOf(options.styles) === "object") {
        for (style in options.styles) {
          if (!options.styles.hasOwnProperty(style)) {
            continue;
          }
          this.setStyle(style, options.styles[style]);
        }
      } else if (options && xlib.typeOf(options.styles) !== "undefined") {
        throw new Error("bla bla bla");
      }
      if (options && xlib.typeOf(options.text) !== "undefined") {
        this.setText(options.text);
      }
      if (options && xlib.typeOf(options.html) !== "undefined") {
        this.setHtml(options.html);
      }
      if (options && xlib.typeOf(options.map) === "object" && xlib.typeOf(options.local) === "string") {
        options.map[options.local] = this;
      } else if (options && xlib.typeOf(options.map) !== "undefined") {
        throw new Error("bla bla bla");
      } else if (options && xlib.typeOf(options.local) !== "undefined") {
        throw new Error("bla bla bla");
      }
    }

    public getTag(): string {
      return null;
    }

    public getParent(): Element<T> {
      return this._parent;
    }

    public setParent(value: Element<T>): void {
      this._parent = value;
    }

    public getText(): string {
      checkText(this);
      return null;
    }

    public setText(value: string): void {
      checkText(this);
    }

    public getHtml(): string {
      checkHtml(this);
      return null;
    }

    public setHtml(value: string): void {
      checkHtml(this);
    }

    public setAttribute(name: string, value: string): void {
      checkAttribute(this, name);
    }

    public getAttribute(name: string): string {
      checkAttribute(this, name);
      return null;
    }

    public hasAttribute(name: string): boolean {
      checkAttribute(this, name);
      return false;
    }

    public removeAttribute(name: string): void {
      checkAttribute(this, name);
    }

    public getAttributes(): any {
      return {};
    }

    public removeId(): void {
    }

    public setId(value: string): void {
      if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(String(value || ""))) {
        throw new Error("bla bla bla");
      }
    }

    public getId(): string {
      return null;
    }

    public addClass(name: string): void {
      checkClass(name);
    }

    public hasClass(name: string): boolean {
      checkClass(name);
      return false;
    }

    public toggleClass(name: string): void {
      checkClass(name);
    }

    public removeClass(name: string): void {
      checkClass(name);
    }

    public getClasses(): string[] {
      return [];
    }

    public removeAllClasses(): void {
      var index: number,
          classes: string[] = this.getClasses(),
          length: number = classes.length;
      for (index = 0; index < length; index++) {
        this.removeClass(classes[index]);
      }
    }

    public setStyle(name: string, value: string): void {
      var temp: string = name;
      checkExistsStyle(temp);
      checkStyle(temp, value);
    }

    public getStyle(name: string): string {
      checkExistsStyle(name);
      return null;
    }

    public removeStyle(name: string): void {
      checkExistsStyle(name);
    }

    public getStyles(): any {
      return {};
    }

    public on(name: string, listener: (event: IEvent<T>) => void): void {
      this.bind(name, listener);
    }

    public bind(name: string, listener: (event: IEvent<T>) => void): void {
      var temp: string = String(name || ""),
        listeners: any;
      if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(temp)) {
        throw new Error("bla bla bla");
      }
      if (xlib.typeOf(listener) !== "function") {
        throw new Error("bla bla bla");
      }
      listeners = this.listeners();
      if (xlib.typeOf(listeners[temp]) !== "array") {
        listeners[temp] = [];
      }
      (<Array<(event: IEvent<T>) => void>>listeners[temp]).push(listener);
    }

    public unbind(name: string, listener?: (event: IEvent<T>) => void): void {
      var temp: string = String(name || ""),
        listeners: any,
        index: number;
      if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(temp)) {
        throw new Error("bla bla bla");
      }
      if (["undefined", "function"].indexOf(xlib.typeOf(listener)) === -1) {
        throw new Error("bla bla bla");
      }
      listeners = this.listeners();
      if (xlib.typeOf(listeners[temp]) === "array" && listener) {
        index = (<Array<(event: IEvent<T>) => void>>listener[temp]).indexOf(listener);
        if (index !== -1) {
          (<Array<(event: IEvent<T>) => void>>listeners[temp]).splice(index, 1);
        }
      } else if (xlib.typeOf(listeners[temp]) === "array") {
        (<Array<(event: IEvent<T>) => void>>listeners[temp]).splice(0, (<Array<(event: IEvent<T>) => void>>listeners[temp]).length);
      } else {
        listeners[temp] = [];
      }
    }

    public emit(name: string, ...args: any[]): void {
      var temp: string = String(name || ""),
        listeners: any,
        length: number,
        index: number;
      if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(temp)) {
        throw new Error("bla bla bla");
      }
      listeners = this.listeners();
      if (xlib.typeOf(listeners[temp]) === "array") {
        length = (<Array<(event: IEvent<T>) => void>>listeners[temp]).length;
        for (index = 0; index < length; index++) {
          (<(...args: any[]) => void>(<Array<(event: IEvent<T>) => void>>listeners[temp])[index]).apply(this, args);
        }
      }
    }

    public append(element: Element<T>): void {
      checkAppend(this);
    }

    public appendTop(element: Element<T>): void {
      checkAppend(this);
    }

    public appendBottom(element: Element<T>): void {
      checkAppend(this);
    }

    public appendAfter(element1: Element<T>, element2: Element<T>): void {
      checkAppend(this);
    }

    public appendBefore(element1: Element<T>, element2: Element<T>): void {
      checkAppend(this);
    }

    public children(): Element<T>[] {
      return [];
    }

    public remove(element: Element<T>): void {
    }

    public content(): T {
      return null;
    }

  }

}