module dom {

  export interface IElement {
    (document: Document, tagName: 'a'): HTMLAnchorElement;
    (document: Document, tagName: 'abbr'): HTMLElement;
    (document: Document, tagName: 'address'): HTMLElement;
    (document: Document, tagName: 'area'): HTMLAreaElement;
    (document: Document, tagName: 'article'): HTMLElement;
    (document: Document, tagName: 'aside'): HTMLElement;
    (document: Document, tagName: 'audio'): HTMLAudioElement;
    (document: Document, tagName: 'b'): HTMLElement;
    (document: Document, tagName: 'base'): HTMLBaseElement;
    (document: Document, tagName: 'bdi'): HTMLElement;
    (document: Document, tagName: 'bdo'): HTMLElement;
    (document: Document, tagName: 'blockquote'): HTMLQuoteElement;
    (document: Document, tagName: 'body'): HTMLBodyElement;
    (document: Document, tagName: 'br'): HTMLBRElement;
    (document: Document, tagName: 'button'): HTMLButtonElement;
    (document: Document, tagName: 'canvas'): HTMLCanvasElement;
    (document: Document, tagName: 'caption'): HTMLTableCaptionElement;
    (document: Document, tagName: 'cite'): HTMLElement;
    (document: Document, tagName: 'code'): HTMLElement;
    (document: Document, tagName: 'col'): HTMLTableColElement;
    (document: Document, tagName: 'colgroup'): HTMLTableColElement;
    (document: Document, tagName: 'datalist'): HTMLDataListElement;
    (document: Document, tagName: 'dd'): HTMLElement;
    (document: Document, tagName: 'del'): HTMLModElement;
    (document: Document, tagName: 'dfn'): HTMLElement;
    (document: Document, tagName: 'div'): HTMLDivElement;
    (document: Document, tagName: 'dl'): HTMLDListElement;
    (document: Document, tagName: 'dt'): HTMLElement;
    (document: Document, tagName: 'em'): HTMLElement;
    (document: Document, tagName: 'embed'): HTMLEmbedElement;
    (document: Document, tagName: 'fieldset'): HTMLFieldSetElement;
    (document: Document, tagName: 'figcaption'): HTMLElement;
    (document: Document, tagName: 'figure'): HTMLElement;
    (document: Document, tagName: 'footer'): HTMLElement;
    (document: Document, tagName: 'form'): HTMLFormElement;
    (document: Document, tagName: 'h1'): HTMLHeadingElement;
    (document: Document, tagName: 'h2'): HTMLHeadingElement;
    (document: Document, tagName: 'h3'): HTMLHeadingElement;
    (document: Document, tagName: 'h4'): HTMLHeadingElement;
    (document: Document, tagName: 'h5'): HTMLHeadingElement;
    (document: Document, tagName: 'h6'): HTMLHeadingElement;
    (document: Document, tagName: 'head'): HTMLHeadElement;
    (document: Document, tagName: 'header'): HTMLElement;
    (document: Document, tagName: 'hgroup'): HTMLElement;
    (document: Document, tagName: 'hr'): HTMLHRElement;
    (document: Document, tagName: 'html'): HTMLHtmlElement;
    (document: Document, tagName: 'i'): HTMLElement;
    (document: Document, tagName: 'iframe'): HTMLIFrameElement;
    (document: Document, tagName: 'img'): HTMLImageElement;
    (document: Document, tagName: 'input'): HTMLInputElement;
    (document: Document, tagName: 'ins'): HTMLModElement;
    (document: Document, tagName: 'kbd'): HTMLElement;
    (document: Document, tagName: 'label'): HTMLLabelElement;
    (document: Document, tagName: 'legend'): HTMLLegendElement;
    (document: Document, tagName: 'li'): HTMLLIElement;
    (document: Document, tagName: 'link'): HTMLLinkElement;
    (document: Document, tagName: 'main'): HTMLElement;
    (document: Document, tagName: 'map'): HTMLMapElement;
    (document: Document, tagName: 'mark'): HTMLElement;
    (document: Document, tagName: 'menu'): HTMLMenuElement;
    (document: Document, tagName: 'meta'): HTMLMetaElement;
    (document: Document, tagName: 'nav'): HTMLElement;
    (document: Document, tagName: 'noscript'): HTMLElement;
    (document: Document, tagName: 'object'): HTMLObjectElement;
    (document: Document, tagName: 'ol'): HTMLOListElement;
    (document: Document, tagName: 'optgroup'): HTMLOptGroupElement;
    (document: Document, tagName: 'option'): HTMLOptionElement;
    (document: Document, tagName: 'p'): HTMLParagraphElement;
    (document: Document, tagName: 'param'): HTMLParamElement;
    (document: Document, tagName: 'pre'): HTMLPreElement;
    (document: Document, tagName: 'progress'): HTMLProgressElement;
    (document: Document, tagName: 'q'): HTMLQuoteElement;
    (document: Document, tagName: 'rp'): HTMLElement;
    (document: Document, tagName: 'rt'): HTMLElement;
    (document: Document, tagName: 'ruby'): HTMLElement;
    (document: Document, tagName: 's'): HTMLElement;
    (document: Document, tagName: 'samp'): HTMLElement;
    (document: Document, tagName: 'script'): HTMLScriptElement;
    (document: Document, tagName: 'section'): HTMLElement;
    (document: Document, tagName: 'select'): HTMLSelectElement;
    (document: Document, tagName: 'small'): HTMLElement;
    (document: Document, tagName: 'source'): HTMLSourceElement;
    (document: Document, tagName: 'span'): HTMLSpanElement;
    (document: Document, tagName: 'strong'): HTMLElement;
    (document: Document, tagName: 'style'): HTMLStyleElement;
    (document: Document, tagName: 'sub'): HTMLElement;
    (document: Document, tagName: 'summary'): HTMLElement;
    (document: Document, tagName: 'sup'): HTMLElement;
    (document: Document, tagName: 'table'): HTMLTableElement;
    (document: Document, tagName: 'tbody'): HTMLTableSectionElement;
    (document: Document, tagName: 'td'): HTMLTableDataCellElement;
    (document: Document, tagName: 'textarea'): HTMLTextAreaElement;
    (document: Document, tagName: 'tfoot'): HTMLTableSectionElement;
    (document: Document, tagName: 'th'): HTMLTableHeaderCellElement;
    (document: Document, tagName: 'thead'): HTMLTableSectionElement;
    (document: Document, tagName: 'title'): HTMLTitleElement;
    (document: Document, tagName: 'tr'): HTMLTableRowElement;
    (document: Document, tagName: 'track'): HTMLTrackElement;
    (document: Document, tagName: 'u'): HTMLElement;
    (document: Document, tagName: 'ul'): HTMLUListElement;
    (document: Document, tagName: 'var'): HTMLElement;
    (document: Document, tagName: 'video'): HTMLVideoElement;
    (document: Document, tagName: 'wbr'): HTMLElement;
    (document: Document, tagName: string): HTMLElement;
  }

  export var createElement: IElement = function createElement(document: Document, tagName: string) {
    return document.createElement(tagName);
  };

  export function insertBefore(parent: HTMLElement, element: HTMLElement, next: HTMLElement) {
    parent.insertBefore(element, next);
  }

  export function appendChild(parent: HTMLElement, child: HTMLElement): void {
    parent.appendChild(child);
  }

  export function appendText(parent: HTMLElement, text: Text): void {
    parent.appendChild(text);
  }

  export function createTextNode(document: Document, text: string): Text {
    return document.createTextNode(text || '');
  }

  export function getText(node: Text): string {
    return String(node.nodeValue || '');
  }

  export function setText(node: Text, text: string): void {
    node.nodeValue = String(text || '');
  }

  export function attachEvent(element: HTMLElement, event: string, callback: (...any) => void) {
    if (element.addEventListener) {
      element.addEventListener(event, function () {
        callback.apply(element, arguments)
      }, false);
    } else {
      element.attachEvent('on' + event, function () {
        callback.apply(element, arguments)
      });
    }
  }

  export function addClass(element: HTMLElement, name: string): void {
    if (element.classList) {
      element.classList.add(name);
    } else {
      if (!existsClass(element, name)) {
        element.className += element.className ? ' ' + name : name;
      }
    }
  }

  export function removeElement(element: HTMLElement): void {
    if (element.parentElement) {
      // todo: сделать кроссбраузерно
      element.parentElement.removeChild(element);
    }
  }

  export function removeClass(element: HTMLElement, name: string): void {
    var classes: string[];
    if (element.classList) {
      element.classList.remove(name);
    } else {
      if (existsClass(element, name)) {
        classes = name.split(/\s+/);
        classes.splice(classes.indexOf(name), 1);
        element.className = classes.join(' ');
      }
    }
  }

  export function existsClass(element: HTMLElement, name: string): boolean {
    if (element.classList) {
      return element.classList.contains(name);
    } else {
      return String(element.className || '').split(/\s+/).indexOf(name) !== -1;
    }
  }

}