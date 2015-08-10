/// <reference path="IEmpty.ts"/>
/// <reference path="../../utils/dom.ts"/>

module widget.table {

  export class Empty implements IEmpty {

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
      var document : Document  = this.getDocument(),
        element  : HTMLElement = dom.createElement(document, 'th');
      dom.addClass(element, 'ui-title');
      dom.addClass(element, 'ui-empty');
      dom.attachEvent(element, 'mouseover', function () {
        dom.addClass(element, 'ui-over');
      });
      dom.attachEvent(element, 'mouseout', function () {
        dom.removeClass(element, 'ui-over');
      });
      return element;
    }

    createContent(): HTMLTableDataCellElement {
      var document : Document  = this.getDocument(),
        element  : HTMLTableDataCellElement = dom.createElement(document, 'td');
      dom.addClass(element, 'ui-element');
      dom.addClass(element, 'ui-empty');
      dom.attachEvent(element, 'mouseover', function () {
        dom.addClass(element, 'ui-over');
      });
      dom.attachEvent(element, 'mouseout', function () {
        dom.removeClass(element, 'ui-over');
      });
      return element;
    }

  }


}