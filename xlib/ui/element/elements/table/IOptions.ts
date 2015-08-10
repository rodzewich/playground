/// <reference path="../IOptions.ts" />
/// <reference path="IElement.ts" />
/// <reference path="IListeners.ts" />

module xlib.ui.element.elements.table {

  export interface IOptions<T> extends elements.IOptions<T> {
    title?: any;
    lang?: any;
    xmlLang?: any;
    dir?: any;
    align?: any;
    background?: any;
    bgColor?: any;
    cols?: any;
    height?: any;
    summary?: any;
    width?: any;
    border?: any;
    borderColor?: any;
    frame?: any;
    rules?: any;
    cellSpacing?: any;
    cellPadding?: any;
    listeners?: elements.table.IListeners<T>;
    items?: (
      elements.caption.IElement<T> |
      elements.col.IElement<T> |
      elements.colgroup.IElement<T> |
      elements.tbody.IElement<T> |
      elements.tfoot.IElement<T> |
      elements.thead.IElement<T> |
      elements.tr.IElement<T>
    )[];
  }

}