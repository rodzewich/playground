module xlib.ui.components.accordion.item {

  export interface IListeners<T> {
    expand: (accordion, item) => void;
    collapse: (accordion, item) => void;
  }

}