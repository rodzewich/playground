/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.h1 {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    listeners?: elements.h1.IListeners<T>;
    items?: (
      elements.a.IElement<T> |
      elements.abbr.IElement<T> |
      elements.acronym.IElement<T> |
      elements.b.IElement<T> |
      elements.bdo.IElement<T> |
      elements.big.IElement<T> |
      elements.br.IElement<T> |
      elements.button.IElement<T> |
      elements.cite.IElement<T> |
      elements.code.IElement<T> |
      elements.del.IElement<T> |
      elements.dfn.IElement<T> |
      elements.em.IElement<T> |
      elements.i.IElement<T> |
      elements.img.IElement<T> |
      elements.input.IElement<T> |
      elements.ins.IElement<T> |
      elements.kbd.IElement<T> |
      elements.label.IElement<T> |
      elements.map.IElement<T> |
      elements.object.IElement<T> |
      elements.q.IElement<T> |
      elements.samp.IElement<T> |
      elements.script.IElement<T> |
      elements.select.IElement<T> |
      elements.small.IElement<T> |
      elements.span.IElement<T> |
      elements.strong.IElement<T> |
      elements.sub.IElement<T> |
      elements.sup.IElement<T> |
      elements.textarea.IElement<T> |
      elements.tt.IElement<T> |
      elements.variable.IElement<T>
    )[];
  }

}