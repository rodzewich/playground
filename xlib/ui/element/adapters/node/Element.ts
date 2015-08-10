/// <reference path="../Element.ts" />
/// <reference path="../../elements/IElement.ts" />

module xlib.ui.element.adapters.node {

  // todo: add webkit and moz properties
  var cssProperties: any = {
    background: ["background"],
    backgroundColor: ["background-color"],
    backgroundImage: ["background-image"],
    backgroundPosition: ["background-position"],
    backgroundRepeat: ["background-repeat"],
    border: ["border"],
    borderBottom: ["border-bottom"],
    borderBottomColor: ["border-bottom-color"],
    borderBottomStyle: ["border-bottom-style"],
    borderBottomWidth: ["border-bottom-width"],
    borderColor: ["border-color"],
    borderLeft: ["border-left"],
    borderLeftColor: ["border-left-color"],
    borderLeftStyle: ["border-left-style"],
    borderLeftWidth: ["border-left-width"],

    borderRight: ["borderRight"],
    borderRightColor: ["borderRightColor"],
    borderRightStyle: ["borderRightStyle"],
    borderRightWidth: ["borderRightWidth"],
    borderStyle: ["borderStyle"],
    borderTop: ["borderTop"],
    borderTopColor: ["borderTopColor"],
    borderTopStyle: ["borderTopStyle"],
    borderTopWidth: ["borderTopWidth"],
    borderWidth: ["borderWidth"],
    clear: ["clear"],
    color: ["color"],
    display: ["display"],
    cssFloat: ["cssFloat"],
    font: ["font"],
    fontFamily: ["fontFamily"],
    fontSize: ["fontSize"],
    fontStyle: ["fontStyle"],
    fontVariant: ["fontVariant"],
    fontWeight: ["fontWeight"],
    height: ["height"],
    letterSpacing: ["letterSpacing"],
    lineHeight: ["lineHeight"],
    listStyle: ["listStyle"],
    listStyleImage: ["listStyleImage"],
    listStylePosition: ["listStylePosition"],
    listStyleType: ["listStyleType"],
    margin: ["margin"],
    marginBottom: ["marginBottom"],
    marginLeft: ["marginLeft"],
    marginRight: ["marginRight"],
    marginTop: ["marginTop"],
    padding: ["padding"],
    paddingBottom: ["paddingBottom"],
    paddingLeft: ["paddingLeft"],
    paddingRight: ["paddingRight"],
    paddingTop: ["paddingTop"],
    textAlign: ["textAlign"],
    textDecoration: ["textDecoration"],
    textIndent: ["textIndent"],
    textTransform: ["textTransform"],
    verticalAlign: ["verticalAlign"],
    whiteSpace: ["whiteSpace"],
    width: ["width"],
    wordSpacing: ["wordSpacing"],
    // css2
    borderCollapse: ["borderCollapse"],
    borderSpacing: ["borderSpacing"],
    bottom: ["bottom"],
    captionSide: ["captionSide"],
    clip: ["clip"],
    content: ["content"],
    counterIncrement: ["counterIncrement"],
    counterReset: ["counterReset"],
    cursor: ["cursor"],
    direction: ["direction"],
    emptyCells: ["emptyCells"],
    left: ["left"],
    maxHeight: ["maxHeight"],
    maxWidth: ["maxWidth"],
    minHeight: ["minHeight"],
    minWidth: ["minWidth"],
    orphans: ["orphans"],
    outline: ["outline"],
    outlineColor: ["outlineColor"],
    outlineStyle: ["outlineStyle"],
    outlineWidth: ["outlineWidth"],
    overflow: ["overflow"],
    pageBreakAfter: ["pageBreakAfter"],
    pageBreakBefore: ["pageBreakBefore"],
    pageBreakInside: ["pageBreakInside"],
    position: ["position"],
    quotes: ["quotes"],
    right: ["right"],
    tableLayout: ["tableLayout"],
    top: ["top"],
    unicodeBidi: ["unicodeBidi"],
    visibility: ["visibility"],
    widows: ["widows"],
    zIndex: ["zIndex"],
    // css3
    alignContent: ["alignContent"],
    alignItems: ["alignItems"],
    alignSelf: ["alignSelf"],
    animation: ["animation"],
    animationDelay: ["animationDelay"],
    animationDirection: ["animationDirection"],
    animationDuration: ["animationDuration"],
    animationFillMode: ["animationFillMode"],
    animationIterationCount: ["animationIterationCount"],
    animationName: ["animationName"],
    animationTimingFunction: ["animationTimingFunction"],
    animationPlayState: ["animationPlayState"],
    backgroundAttachment: ["backgroundAttachment"],
    backgroundClip: ["backgroundClip"],
    backgroundOrigin: ["backgroundOrigin"],
    backgroundSize: ["backgroundSize"],
    backfaceVisibility: ["backfaceVisibility"],
    borderBottomLeftRadius: ["borderBottomLeftRadius"],
    borderBottomRightRadius: ["borderBottomRightRadius"],
    borderImage: ["borderImage"],
    borderImageOutset: ["borderImageOutset"],
    borderImageRepeat: ["borderImageRepeat"],
    borderImageSlice: ["borderImageSlice"],
    borderImageSource: ["borderImageSource"],
    borderImageWidth: ["borderImageWidth"],
    // todo: this values for example, fix it
    borderRadius: ["-webkit-border-radius", "-khtml-border-radius", "-moz-border-radius", "-ms-border-radius", "-o-border-radius", "border-radius"],
    borderTopLeftRadius: ["borderTopLeftRadius"],
    borderTopRightRadius: ["borderTopRightRadius"],
    boxDecorationBreak: ["boxDecorationBreak"],
    boxShadow: ["boxShadow"],
    boxSizing: ["boxSizing"],
    columnCount: ["columnCount"],
    columnFill: ["columnFill"],
    columnGap: ["columnGap"],
    columnRule: ["columnRule"],
    columnRuleColor: ["columnRuleColor"],
    columnRuleStyle: ["columnRuleStyle"],
    columnRuleWidth: ["columnRuleWidth"],
    columns: ["columns"],
    columnSpan: ["columnSpan"],
    columnWidth: ["columnWidth"],
    flex: ["flex"],
    flexBasis: ["flexBasis"],
    flexDirection: ["flexDirection"],
    flexFlow: ["flexFlow"],
    flexGrow: ["flexGrow"],
    flexShrink: ["flexShrink"],
    flexWrap: ["flexWrap"],
    fontSizeAdjust: ["fontSizeAdjust"],
    fontStretch: ["fontStretch"],
    hangingPunctuation: ["hangingPunctuation"],
    hyphens: ["hyphens"],
    icon: ["icon"],
    imageOrientation: ["imageOrientation"],
    justifyContent: ["justifyContent"],
    navDown: ["navDown"],
    navIndex: ["navIndex"],
    navLeft: ["navLeft"],
    navRight: ["navRight"],
    navUp: ["navUp"],
    opacity: ["opacity"],
    order: ["order"],
    outlineOffset: ["outlineOffset"],
    overflowX: ["overflowX"],
    overflowY: ["overflowY"],
    perspective: ["perspective"],
    perspectiveOrigin: ["perspectiveOrigin"],
    resize: ["resize"],
    tabSize: ["tabSize"],
    textAlignLast: ["textAlignLast"],
    textDecorationColor: ["textDecorationColor"],
    textDecorationLine: ["textDecorationLine"],
    textDecorationStyle: ["textDecorationStyle"],
    textJustify: ["textJustify"],
    textOverflow: ["textOverflow"],
    textShadow: ["textShadow"],
    transform: ["transform"],
    transformOrigin: ["transformOrigin"],
    transformStyle: ["transformStyle"],
    transition: ["transition"],
    transitionProperty: ["transitionProperty"],
    transitionDuration: ["transitionDuration"],
    transitionTimingFunction: ["transitionTimingFunction"],
    transitionDelay: ["transitionDelay"],
    wordBreak: ["wordBreak"],
    wordWrap: ["wordWrap"]
  };

  function createStyles(style: any): string {
    var temp: string[] = [];
    Object.keys(style).forEach((key: string) => {
      if (xlib.typeOf(cssProperties[key]) !== "array") {
        throw new Error("bla bla bla");
      }
      cssProperties[key].forEach((property: string) => {
        temp.push(property + ": " + String(style[key]));
      });
    });
    return temp.join("; ");
  }

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

  export class Element extends adapters.Element<string> implements element.elements.IElement<string> {

    private _attributes: any;

    private _items: Element[];

    private _text: string;

    private _html: string;

    private _style: any;

    protected escape(value: string): string {
      // todo: implements all symbols http://www.theukwebdesigncompany.com/articles/entity-escape-characters.php?PHPSESSID=8cbbddde9a9c9825467546f1c98fe119
      return String(value || "").
        replace(/&/g,  "&amp;").
        replace(/\r\n/g, "&#10;").
        replace(/\n/g,   "&#10;").
        replace(/\r/g,   "").
        replace(/"/g,  "&quot;").
        replace(/</g,  "&lt;").
        replace(/>/g,  "&gt;");
    }

    protected style(): any {
      if (xlib.typeOf(this._style) !==  "object") {
        this._style = {};
      }
      return this._style;
    }

    protected attributes(): any {
      if (xlib.typeOf(this._attributes) !== "object") {
        this._attributes = {};
      }
      return this._attributes;
    }

    protected items(): Element[] {
      if (xlib.typeOf(this._items) !== "array") {
        this._items = [];
      }
      return this._items;
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
      super.getText();
      return this._text || null;
    }

    public setText(value: string): void {
      super.setText(value);
      this._text = String(value || "") || null;
    }

    public getHtml(): string {
      super.getHtml();
      return this._html || null;
    }

    public setHtml(value: string): void {
      super.setHtml(value);
      this._html = String(value || "") || null;
    }

    public setAttribute(name: string, value: string): void {
      var temp: string = String(name || ""),
        attributes: any;
      super.setAttribute(temp, value);
      attributes = this.attributes();
      attributes[name] = String(value || "");
    }

    public getAttribute(name: string): string {
      var temp: string = String(name || ""),
        attributes: any;
      super.getAttribute(temp);
      if (this.hasAttribute(temp)) {
        attributes = this.attributes();
        return attributes[temp];
      }
      return null;
    }

    public hasAttribute(name: string): boolean {
      var temp: string = String(name || ""),
        attributes: any;
      super.hasAttribute(temp);
      attributes = this.attributes();
      return xlib.typeOf(attributes[name]) === "string";
    }

    public removeAttribute(name: string): void {
      var temp: string = String(name || ""),
        attributes: any;
      super.removeAttribute(temp);
      if (this.hasAttribute(temp)) {
        attributes = this.attributes();
        delete attributes[temp];
      }
    }

    public getAttributes(): any {
      var attributes: any = this.attributes(),
        result: any = {},
        property: string;
      for (property in attributes) {
        if (!attributes.hasOwnProperty(property)) {
          continue;
        }
        if (!this.hasAttribute(property)) {
          continue;
        }
        result[property] = this.getAttribute(property);
      }
      return result;
    }

    public removeId(): void {
      var attributes: any = this.attributes();
      if (xlib.typeOf(attributes["id"]) !== "undefined") {
        delete attributes["id"];
      }
    }

    public setId(value: string): void {
      var attributes: any = this.attributes(),
        temp: string = String(value || "");
      super.setId(value);
      attributes["id"] = temp;
    }

    public getId(): string {
      var attributes: any = this.attributes();
      return attributes["id"] || null;
    }

    public addClass(name: string): void {
      var temp: string = String(name || ""),
        attributes: any,
        result: string[];
      super.addClass(temp);
      attributes = this.attributes();
      result = String(attributes["class"] || "").split(/\s+/).
        filter((element: string) => { return !!element; });
      if (result.indexOf(temp) === -1) {
        result.push(temp);
        attributes["class"] = result.join(" ");
      }
    }

    public hasClass(name: string): boolean {
      var temp: string = String(name || ""),
        attributes: any;
      super.hasClass(temp);
      attributes = this.attributes();
      return String(attributes["class"] || "").
          split(/\s+/).indexOf(temp) !== -1;
    }

    public toggleClass(name: string): void {
      var temp: string = String(name || "");
      super.toggleClass(temp);
      if (this.hasClass(temp)) {
        this.removeClass(temp);
      } else {
        this.addClass(temp);
      }
    }

    public removeClass(name: string): void {
      var temp: string = String(name || ""),
        attributes: any;
      super.removeClass(temp);
      attributes = this.attributes();
      attributes["class"] = String(attributes["class"] || "").split(/\s+/).
        filter((element: string) => { return !!element && element !== temp; }).join(" ");
    }

    public getClasses(): string[] {
      var attributes: any = this.attributes();
      return String(attributes["class"] || "").split(/\s+/).
        filter((element: string) => { return !!element; });
    }

    public setStyle(name: string, value: string): void {
      var temp: string = String(name || ""),
        attributes: any,
        properties: string,
        style: any;
      super.setStyle(temp, value);
      attributes = this.attributes();
      style = this.style();
      if (xlib.typeOf(cssProperties[temp]) !== "array") {
        throw new Error("bla bla bla");
      }
      // todo: remove style if empty value
      style[temp] = String(value || "");
      properties = createStyles(style);
      if (properties !== "") {
        attributes["style"] = properties;
      } else {
        delete attributes["style"];
      }
    }

    public getStyle(name: string): string {
      var temp: string = String(name || ""),
        style: any;
      super.getStyle(temp);
      style = this.style();
      if (xlib.typeOf(style[temp]) !== "undefined") {
        return String(style[temp] || "");
      }
      return null;
    }

    public removeStyle(name: string): void {
      var temp: string = String(name || ""),
        attributes: any,
        properties: string,
        style: any;
      super.removeStyle(temp);
      attributes = this.attributes();
      style = this.style();
      if (xlib.typeOf(cssProperties[temp]) !== "array") {
        throw new Error("bla bla bla");
      }
      if (xlib.typeOf(style[temp]) !== "undefined") {
        delete style[temp];
      }
      properties = createStyles(style);
      if (properties !== "") {
        attributes["style"] = properties;
      } else {
        delete attributes["style"];
      }
    }

    public getStyles(): any {
      super.getStyles();
      // todo: clone object
      return this.style();
    }

    public on(name: string, listener: any): void {
      this.bind(name, listener);
    }

    public bind(name: string, listener: any): void {
    }

    public unbind(name: string, listener?: any): void {

    }

    public emit(name: string, ...args: string[]): void {

    }

    public append(element: Element): void {
      var parent: Element,
        items: Element[];
      super.append(element);
      checkAppend(this, element);
      parent = element.getParent();
      items = this.items();
      if (parent) {
        parent.remove(element);
      }
      element.setParent(this);
      items.push(element);
    }

    public appendTop(element: Element): void {
      var parent: Element,
        items: Element[];
      super.appendTop(element);
      checkAppend(this, element);
      parent = element.getParent();
      items = this.items();
      if (parent) {
        parent.remove(element);
      }
      element.setParent(this);
      items.unshift(element);
    }

    public appendBottom(element: Element): void {
      var parent: Element,
        items: Element[];
      super.appendBottom(element);
      checkAppend(this, element);
      parent = element.getParent();
      items = this.items();
      if (parent) {
        parent.remove(element);
      }
      element.setParent(this);
      items.push(element);
    }

    public appendAfter(element1: Element, element2: Element): void {
      var parent: Element,
        index: number,
        items: Element[];
      super.appendAfter(element1, element2);
      checkAppend(this, element1);
      checkAppend(this, element2);
      parent = element1.getParent();
      items = this.items();
      index = items.indexOf(element2);
      if (index !== -1) {
        if (parent) {
          parent.remove(element1);
        }
        element1.setParent(this);
        items.splice(index + 1, 0, element1);
      }
    }

    public appendBefore(element1: Element, element2: Element): void {
      var parent: Element,
        index: number,
        items: Element[];
      super.appendBefore(element1, element2);
      checkAppend(this, element1);
      checkAppend(this, element2);
      parent = element1.getParent();
      items = this.items();
      index = items.indexOf(element2);
      if (index !== -1) {
        if (parent) {
          parent.remove(element1);
        }
        element1.setParent(this);
        items.splice(index, 0, element1);
      }
    }

    public children(): Element[] {
      return this.items().slice(0);
    }

    public remove(element: Element): void {
      var index: number,
        items: Element[];
      if (!(element instanceof Element)) {
        throw new Error("bla bla bla");
      }
      items = this.items();
      index = items.indexOf(element);
      if (index !== -1) {
        element.setParent(null);
        items.splice(index, 1);
      }
    }

    public content(): string {
      var attributes: any = this.attributes(),
        result: string[] = Object.keys(attributes).map((key: string) => { return " " + key + "=\"" + this.escape(attributes[key]) + "\"" }),
        length: number = this.children().length,
        items: Element[] = this.items();
      if (!this.allowChildren() && !this.allowText() && !this.allowHtml()) {
        return "<" + this.getTag() + result.join("") + " />";
      }
      if (this.allowText() && length === 0 && this.getText()) {
        return "<" + this.getTag() + result.join("") + ">" +
          this.escape(this.getText()) + "</" + this.getTag() + ">";
      }
      if (this.allowHtml() && length === 0 && this.getHtml()) {
        return "<" + this.getTag() + result.join("") + ">" +
          this.getHtml() + "</" + this.getTag() + ">";
      }
      return "<" + this.getTag() + result.join("") + ">" +
        items.map((element: Element) => { return element.content(); }).join("") +
        "</" + this.getTag() + ">";
    }

  }

}