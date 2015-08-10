/// <reference path="IColumn.ts"/>
/// <reference path="../mediator/Column.ts"/>
/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>

module widget.table.column {

  import mediator = widget.table.mediator;

  export class Column implements IColumn {

    private type: string = 'unknown';

    private name: string = 'unknown';

    private title: string = 'unknown';

    private document: Document = document;

    private align: string = 'left';

    private verticalAlign: string = 'top';

    getAlign(): string {
      return this.align;
    }

    getVerticalAlign(): string {
      return this.verticalAlign;
    }

    getName(): string {
      return this.name;
    }

    getType(): string {
      return this.type;
    }

    getTitle(): string {
      return this.title;
    }

    getDocument(): Document {
      return this.document;
    }

    constructor(options?: any) {
      if (options && xlib.typeOf(options.name) !== 'undefined') {
        this.name  = String(options.name || '');
        this.title = this.name;
      }
      if (options && xlib.typeOf(options.title) !== 'undefined') {
        this.title = String(options.title || '');
      }
      if (options && xlib.typeOf(options.type) !== 'undefined') {
        this.type = String(options.type || '');
      }
      if (options && xlib.typeOf(options.align) !== 'undefined') {
        if (['left', 'center', 'right'].indexOf(String(options.align).toLowerCase()) === -1) {
          throw new TypeError('bla bla bla');
        }
        this.align = String(options.align).toLowerCase();
      }
      if (options && xlib.typeOf(options.verticalAlign) !== 'undefined') {
        if (['top', 'middle', 'bottom'].indexOf(String(options.verticalAlign).toLowerCase()) === -1) {
          throw new TypeError('bla bla bla');
        }
        this.verticalAlign = String(options.verticalAlign).toLowerCase();
      }
      if (options && xlib.typeOf(options.document) !== 'undefined') {
        this.document = options.document;
      }
    }

    createContent(data?: any): mediator.IColumn {
      var document : Document         = this.getDocument(),
        element  : HTMLTableDataCellElement = dom.createElement(document, 'td');
      dom.addClass(element, 'ui-element');
      dom.addClass(element, 'ui-' + this.getAlign());
      dom.addClass(element, 'ui-' + this.getVerticalAlign());
      dom.attachEvent(element, 'mouseover', function () {
        dom.addClass(element, 'ui-over');
      });
      dom.attachEvent(element, 'mouseout', function () {
        dom.removeClass(element, 'ui-over');
      });
      return new mediator.Column(element, () => {}, (value: any) => {});
    }

    createHeader(): HTMLElement {
      var document  : Document = this.getDocument(),
        element   : HTMLElement = dom.createElement(document, 'th'),
        container : HTMLElement = dom.createElement(document, 'div'),
        text    : HTMLSpanElement = dom.createElement(document, 'span') ;
      dom.addClass(element, 'ui-title');
      dom.addClass(element, 'ui-' + this.getAlign());
      if (this.getType()) {
        dom.addClass(element, 'ui-' + this.getType());
      }
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
      dom.appendText(text, dom.createTextNode(document, this.getTitle()));
      return element;
    }

  }

}