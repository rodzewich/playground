module xlib.ui.components.accordion {

  export interface IOptions<T> {
    id?: string;
    header?: accordion.IHeader;
    width?: number|string;
    height?: number|string;
    classes?: string|string[];
    closeable?: boolean;
    items: accordion.IItem<T>[];
  }

}