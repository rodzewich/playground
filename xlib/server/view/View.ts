/// <reference path="../../core.ts" />
/// <reference path="IView.ts" />

module xlib.server.view {

  export class View implements IView {
    private _name: string = null;
    private _items: any = {};
    constructor(name: string, data: any) {
      if (xlib.typeOf(name) !== 'undefined') {
        this.setName(name);
      }
    }
    public getName(): string {
      return this._name;
    }
    public setName(name: string): void {
      // todo: check name
      this._name = name;
    }
    public getItem(name: string): any {
      return this._items;
    }
    setItem(name: string, item: any): void {
      // todo: check name
      this._items[name] = item;
    }
    getItems(): any {
      return this._items;
    }
    setItems(items: any) {
      this._items = items;
    }
    fetch(): string {
      return '';
    }
  }

}
