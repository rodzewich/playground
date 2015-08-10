/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.button {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: string;
    lang?: string;
    xmlLang?: string;
    dir?: string;
    name?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    accessKey?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    form?: string;
    formAction?: string;
    formEnctype?: string;
    formMethod?: string;
    formNovalidate?: boolean;
    formTarget?: string;
    listeners?: elements.button.IListeners<T>;
    items?: (
      elements.abbr.IElement<T> |
      elements.acronym.IElement<T> |
      elements.address.IElement<T> |
      elements.b.IElement<T> |
      elements.bdo.IElement<T> |
      elements.big.IElement<T> |
      elements.blockquote.IElement<T> |
      elements.br.IElement<T> |
      elements.cite.IElement<T> |
      elements.code.IElement<T> |
      elements.del.IElement<T> |
      elements.dfn.IElement<T> |
      elements.div.IElement<T> |
      elements.dl.IElement<T> |
      elements.em.IElement<T> |
      elements.h1.IElement<T> |
      elements.h2.IElement<T> |
      elements.h3.IElement<T> |
      elements.h4.IElement<T> |
      elements.h5.IElement<T> |
      elements.h6.IElement<T> |
      elements.hr.IElement<T> |
      elements.i.IElement<T> |
      elements.img.IElement<T> |
      elements.ins.IElement<T> |
      elements.kbd.IElement<T> |
      elements.map.IElement<T> |
      elements.noscript.IElement<T> |
      elements.object.IElement<T> |
      elements.ol.IElement<T> |
      elements.p.IElement<T> |
      elements.pre.IElement<T> |
      elements.q.IElement<T> |
      elements.samp.IElement<T> |
      elements.script.IElement<T> |
      elements.small.IElement<T> |
      elements.span.IElement<T> |
      elements.strong.IElement<T> |
      elements.sub.IElement<T> |
      elements.sup.IElement<T> |
      elements.table.IElement<T> |
      elements.tt.IElement<T> |
      elements.ul.IElement<T> |
      elements.variable.IElement<T>
    )[];
  }

}