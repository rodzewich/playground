module xlib.ui.components.accordion.item {

  export interface IOptions<T> {
    id: any;
    classes: any|any[];
    theme: any;
    even: any;
    first: any;
    last: any;
    icon: any;
    title: any;
    collapsed: any;
    components: any[]; // todo: fix this
    listeners: IListeners;
  }

}