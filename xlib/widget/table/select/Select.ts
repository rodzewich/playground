/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>
/// <reference path="ISelect.ts"/>
/// <reference path="IOptions.ts"/>

module widget.table.select {

  export class Select implements ISelect{

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

    createContent(callback?: () => void): HTMLTableDataCellElement {
      var checked   : boolean          = false,
        document  : Document         = this.getDocument(),
        element   : HTMLTableDataCellElement = dom.createElement(document, 'td'),
        container : HTMLDivElement       = dom.createElement(document, 'div'),
        checkbox  : HTMLInputElement     = dom.createElement(document, 'input'),
        label   : HTMLLabelElement     = dom.createElement(document, 'label') ,
        text    : HTMLSpanElement      = dom.createElement(document, 'span') ;
      dom.addClass(element, 'ui-element');
      dom.addClass(element, 'ui-select');
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
      dom.appendChild(container, label);
      dom.addClass(label, 'ui-label');
      dom.appendChild(label, checkbox);
      dom.appendChild(label, text);
      dom.attachEvent(label, 'mouseover', function () {
        dom.addClass(label, 'ui-over');
      });
      dom.attachEvent(label, 'mouseout', function () {
        dom.removeClass(label, 'ui-over');
      });
      checkbox.type = 'checkbox';
      dom.attachEvent(checkbox, 'click', function () {
        if (checkbox.checked !== checked) {
          checked = checkbox.checked;
          if (checked) {
            dom.addClass(label, 'ui-checked');
            dom.addClass(element, 'ui-checked');
          } else {
            dom.removeClass(label, 'ui-checked');
            dom.removeClass(element, 'ui-checked');
          }
          if (typeof callback === 'function') {
            callback();
          }
        }
      });
      dom.attachEvent(checkbox, 'change', function () {
        if (checkbox.checked !== checked) {
          checked = checkbox.checked;
          if (checked) {
            dom.addClass(label, 'ui-checked');
            dom.addClass(element, 'ui-checked');
          } else {
            dom.removeClass(label, 'ui-checked');
            dom.removeClass(element, 'ui-checked');
          }
          if (typeof callback === 'function') {
            callback();
          }
        }
      });
      dom.addClass(text, 'ui-text');
      dom.appendText(text, dom.createTextNode(document, this.getName()));
      return element;
    }

    createHeader(callback?: () => void): HTMLTableHeaderCellElement {
      function handler() {
        if (checkbox.checked !== checked) {
          checked = checkbox.checked;
          if (checked) {
            dom.addClass(label, 'ui-checked');
            dom.addClass(element, 'ui-checked');
          } else {
            dom.removeClass(label, 'ui-checked');
            dom.removeClass(element, 'ui-checked');
          }
          if (typeof callback === 'function') {
            callback();
          }
        }
      }
      var checked   : boolean          = false,
        document  : Document           = this.getDocument(),
        element   : HTMLTableHeaderCellElement = dom.createElement(document, 'th'),
        container : HTMLDivElement       = dom.createElement(document, 'div'),
        checkbox  : HTMLInputElement       = dom.createElement(document, 'input'),
        label   : HTMLLabelElement       = dom.createElement(document, 'label'),
        text    : HTMLSpanElement      = dom.createElement(document, 'span');
      dom.addClass(element, 'ui-title');
      dom.addClass(element, 'ui-select');
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
      dom.appendChild(container, label);
      dom.addClass(label, 'ui-label');
      dom.appendChild(label, checkbox);
      dom.appendChild(label, text);
      dom.attachEvent(label, 'mouseover', function () {
        dom.addClass(label, 'ui-over');
      });
      dom.attachEvent(label, 'mouseout', function () {
        dom.removeClass(label, 'ui-over');
      });
      checkbox.type = 'checkbox';
      dom.attachEvent(checkbox, 'click', handler);
      dom.attachEvent(checkbox, 'change', handler);
      dom.addClass(text, 'ui-text');
      dom.appendText(text, dom.createTextNode(document, this.getTitle()));
      return element;
    }

  }


}