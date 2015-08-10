/// <reference path="Column.ts"/>
/// <reference path="../mediator/Column.ts"/>
/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>

module widget.table.column {

  import mediator = widget.table.mediator;

  export class View extends Column {

    getType(): string {
      return 'view';
    }

    createContent(data?: any): mediator.Column {
      var document  : Document  = this.getDocument(),
        element   : HTMLTableDataCellElement = super.createContent().getContent(),
        container : HTMLElement = dom.createElement(document, 'div'),
        text    : HTMLSpanElement = dom.createElement(document, 'span'),
        node    : Text,
        value   : string    = '';

      if (data && typeof data[this.getName()] !== 'undefined') {
        value = String(data[this.getName()] || '');
      }
      node = dom.createTextNode(document, value);
      dom.appendChild(element, container);
      dom.addClass(container, 'ui-container');
      dom.appendChild(container, text);
      dom.addClass(text, 'ui-text');
      dom.appendText(text, node);

      return new mediator.Column(
        element,
        () => {
          var values: any = {};
          values[this.getName()] = dom.getText(node);
          return values;
        },
        (values) => {
          values = values || {};
          var value: any = values[this.getName()];
          dom.setText(node, String(value || ''));
        }
      );
    }
  }

}