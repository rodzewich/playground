/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.form {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    action?: any;
    method?: any;
    encType?: any;
    accept?: any;
    acceptCharset?: any;
    autoComplete?: any;
    name?: any;
    noValidate?: any;
    target?: any;
    listeners?: elements.form.IListeners<T>;
    items?: (
      elements.address.IElement<T> |
      elements.blockquote.IElement<T> |
      elements.del.IElement<T> |
      elements.div.IElement<T> |
      elements.dl.IElement<T> |
      elements.fieldset.IElement<T> |
      elements.h1.IElement<T> |
      elements.h2.IElement<T> |
      elements.h3.IElement<T> |
      elements.h4.IElement<T> |
      elements.h5.IElement<T> |
      elements.h6.IElement<T> |
      elements.hr.IElement<T> |
      elements.ins.IElement<T> |
      elements.noscript.IElement<T> |
      elements.ol.IElement<T> |
      elements.p.IElement<T> |
      elements.pre.IElement<T> |
      elements.script.IElement<T> |
      elements.table.IElement<T> |
      elements.ul.IElement<T>
    )[];
  }

}