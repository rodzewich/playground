module xlib.server.view {

  export interface IView {
    getName(): string;
    setName(name: string): void;
    getItem(name: string): any;
    setItem(name: string, item: any): void;
    getItems(): any;
    setItems(items: any): void;
    fetch(): string;
  }

}
