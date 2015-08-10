/// <reference path="Css3Properties.ts" />

module xlib.ui.element.elements {

  export interface IOptions<T> {
    id?: string;
    classes?: string|string[];
    text?: string;
    html?: string;
    items?: IElement<T>[];
    listeners?: any;
    styles?: Css3Properties;
    map?: any;
    local?: string;
  }

}