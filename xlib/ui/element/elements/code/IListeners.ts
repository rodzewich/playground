/// <reference path="../IListeners.ts" />

module xlib.ui.element.elements.code {

  import IEvent = elements.IEvent;

  export interface IListeners<T> extends elements.IListeners<T> {
    click?: (event?: IEvent<T>) => void;
    dblclick?: (event?: IEvent<T>) => void;
    mousedown?: (event?: IEvent<T>) => void;
    mouseup?: (event?: IEvent<T>) => void;
    mouseover?: (event?: IEvent<T>) => void;
    mousemove?: (event?: IEvent<T>) => void;
    mouseout?: (event?: IEvent<T>) => void;
    keypress?: (event?: IEvent<T>) => void;
    keydown?: (event?: IEvent<T>) => void;
    keyup?: (event?: IEvent<T>) => void;
  }

}