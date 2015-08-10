/// <reference path="../../utils/dom.ts"/>
/// <reference path="../../utils/core.ts"/>

module widget {

  export class Menu {

    document: Document;

    tbody: HTMLTableSectionElement;

    getDocument(): Document {
      if (!this.document) {
        this.document = document;
      }
      return this.document;
    }

    public addItem(item: IItem): void {

    }

    public getContent(): HTMLTableElement {
      var document: Document = this.getDocument(),
        element: HTMLTableElement = dom.createElement(document, 'table');
      dom.addClass(element, 'ui-menu');
      this.tbody = dom.createElement(document, 'tbody');

      return element;
    }

  }

  export interface IItem {}

  export class Item implements IItem {

    private text: string = '';

    public getText(): string {
      return this.text;
    }

    constructor(text: string, callback: () => void) {
      this.text = String(text || '');
      if (!this.text) {
        throw new TypeError('bla bla bla');
      }
    }

    /*items: Item[] = [];

    addItem(item: Item): void {}

    getItems(): Item[] {

    }*/

  }

}