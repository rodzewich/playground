/// <reference path="IButton.ts"/>
/// <reference path="IOptions.ts"/>
/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>

module widget.table.button {

  export class Button implements IButton {

    private type: string = 'unknown';

    private name: string = 'Unknown';

    private title: string = 'Unknown';

    private document: Document = document;

    public getType(): string {
      return this.type;
    }

    public getName(): string {
      return this.name;
    }

    public getTitle(): string {
      return this.title;
    }

    public getDocument(): Document {
      return this.document;
    }

    constructor(options: IOptions) {
      if (options && typeof options.name !== 'undefined') {
        this.name = String(options.name || '');
      }
      if (options && typeof options.type !== 'undefined') {
        this.type = String(options.type || '');
      }
      if (options && typeof options.title !== 'undefined') {
        this.title = String(options.title || '');
      }
      if (options && typeof options.document !== 'undefined') {
        this.document = options.document;
      }
    }

    public createContent(callback?: () => void): HTMLTableDataCellElement {
      var document:  Document         = this.getDocument(),
        element:   HTMLTableDataCellElement = dom.createElement(document, 'td'),
        container: HTMLDivElement       = dom.createElement(document, 'div'),
        link:    HTMLAnchorElement    = dom.createElement(document, 'a'),
        text:    HTMLSpanElement      = dom.createElement(document, 'span') ;
      dom.addClass(element, 'ui-element');
      dom.addClass(element, 'ui-button');
      if (this.getType()) {
        dom.addClass(element, 'ui-' + this.getType());
      }
      dom.appendChild(element, container);
      dom.attachEvent(element, 'mouseover', function () {
        dom.addClass(element, 'ui-over');
      });
      dom.attachEvent(element, 'mouseout', function () {
        dom.removeClass(element, 'ui-over');
      });
      dom.addClass(container, 'ui-container');
      dom.appendChild(container, link);
      link.href = 'javascript: void(0);';
      dom.addClass(link, 'ui-button');
      dom.appendChild(link, text);
      dom.attachEvent(link, 'click', function () {
        if (typeof callback === 'function') {
          callback();
        }
      });
      dom.attachEvent(link, 'mouseover', function () {
        dom.addClass(link, 'ui-over');
      });
      dom.attachEvent(link, 'mouseout', function () {
        dom.removeClass(link, 'ui-over');
      });
      dom.addClass(text, 'ui-text');
      dom.appendText(text, dom.createTextNode(document, this.getName()));
      return element;
    }

    public createHeader(): HTMLElement {
      var document  : Document  = this.getDocument(),
        element   : HTMLElement = dom.createElement(document, 'th'),
        container : HTMLElement = dom.createElement(document, 'div'),
        text    : HTMLSpanElement = dom.createElement(document, 'span') ;
      dom.addClass(element, 'ui-title');
      dom.addClass(element, 'ui-button');
      if (this.getType()) {
        dom.addClass(element, 'ui-' + this.getType());
      }
      dom.appendChild(element, container);
      dom.attachEvent(element, 'mouseover', function () {
        dom.addClass(element, 'ui-over');
      });
      dom.attachEvent(element, 'mouseout', function () {
        dom.removeClass(element, 'ui-over');
      });
      dom.addClass(container, 'ui-container');
      dom.appendChild(container, text);
      dom.addClass(text, 'ui-text');
      dom.appendText(text, dom.createTextNode(document, this.getTitle()));
      return element;
    }

  }

}