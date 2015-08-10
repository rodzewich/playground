/// <reference path="ISequence.ts"/>
/// <reference path="../../utils/dom.ts"/>

module widget.table {

  export class Sequence implements ISequence {

    private document: Document;

    public getDocument(): Document {
      if (!this.document) {
        this.document = document;
      }
      return this.document;
    }

    constructor(document: Document) {
      if (document) {
        this.document = document;
      }
    }

    createHeader(): HTMLElement {
      var document: Document = this.getDocument(),
        head: HTMLElement = dom.createElement(document, 'th'),
        container: HTMLDivElement = dom.createElement(document, 'div'),
        text: HTMLSpanElement = dom.createElement(document, 'span') ;
      dom.addClass(head, 'ui-title');
      dom.addClass(head, 'ui-sequence');
      dom.attachEvent(head, 'mouseover', function () {
        dom.addClass(head, 'ui-over');
      });
      dom.attachEvent(head, 'mouseout', function () {
        dom.removeClass(head, 'ui-over');
      });
      dom.appendChild(head, container);
      dom.addClass(container, 'ui-container');
      dom.appendChild(container, text);
      dom.addClass(text, 'ui-text');
      dom.appendText(text, dom.createTextNode(document, '#'));
      return head;
    }

    createContent(value: any): HTMLTableDataCellElement {
      var document: Document = this.getDocument(),
        element: HTMLTableDataCellElement = dom.createElement(document, 'td'),
        container: HTMLElement = dom.createElement(document, 'div'),
        text: HTMLSpanElement = dom.createElement(document, 'span') ;
      dom.addClass(element, 'ui-element');
      dom.addClass(element, 'ui-sequence');
      dom.attachEvent(element, 'mouseover', function () {
        dom.addClass(element, 'ui-over');
      });
      dom.attachEvent(element, 'mouseout', function () {
        dom.removeClass(element, 'ui-over');
      });
      dom.appendChild(element, container);
      dom.addClass(container, 'ui-container');
      dom.appendChild(container, text);
      dom.addClass(text, 'ui-text');
      dom.appendText(text, dom.createTextNode(document, String(value)));
      return element;
    }
  }

}