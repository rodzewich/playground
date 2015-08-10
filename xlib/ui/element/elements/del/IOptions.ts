/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.del {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    cite?: any;
    datetime?: any;
    listeners?: elements.del.IListeners<T>;
    items?: (
      elements.a.IElement<T> |
      elements.abbr.IElement<T> |
      elements.acronym.IElement<T> |
      elements.address.IElement<T> |
      elements.b.IElement<T> |
      elements.bdo.IElement<T> |
      elements.big.IElement<T> |
      elements.blockquote.IElement<T> |
      elements.br.IElement<T> |
      elements.button.IElement<T> |
      elements.cite.IElement<T> |
      elements.code.IElement<T> |
      elements.del.IElement<T> |
      elements.dfn.IElement<T> |
      elements.div.IElement<T> |
      elements.dl.IElement<T> |
      elements.em.IElement<T> |
      elements.fieldset.IElement<T> |
      elements.form.IElement<T> |
      elements.h1.IElement<T> |
      elements.h2.IElement<T> |
      elements.h3.IElement<T> |
      elements.h4.IElement<T> |
      elements.h5.IElement<T> |
      elements.h6.IElement<T> |
      elements.hr.IElement<T> |
      elements.i.IElement<T> |
      elements.img.IElement<T> |
      elements.input.IElement<T> |
      elements.ins.IElement<T> |
      elements.kbd.IElement<T> |
      elements.label.IElement<T> |
      elements.map.IElement<T> |
      elements.noscript.IElement<T> |
      elements.object.IElement<T> |
      elements.ol.IElement<T> |
      elements.p.IElement<T> |
      elements.pre.IElement<T> |
      elements.q.IElement<T> |
      elements.samp.IElement<T> |
      elements.script.IElement<T> |
      elements.select.IElement<T> |
      elements.small.IElement<T> |
      elements.span.IElement<T> |
      elements.strong.IElement<T> |
      elements.sub.IElement<T> |
      elements.sup.IElement<T> |
      elements.table.IElement<T> |
      elements.textarea.IElement<T> |
      elements.tt.IElement<T> |
      elements.ul.IElement<T> |
      elements.variable.IElement<T>
    )[];
  }

}