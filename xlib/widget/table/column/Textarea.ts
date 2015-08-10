/// <reference path="Column.ts"/>
/// <reference path="../mediator/Column.ts"/>
/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>

module widget.table.column {

  import mediator = widget.table.mediator;

  export class Textarea extends Column {

    getType(): string {
      return 'textarea';
    }

    createContent(data?: any): mediator.Column {
      var document  : Document      = this.getDocument(),
        element   : HTMLTableDataCellElement     = super.createContent().getContent(),
        container : HTMLElement     = dom.createElement(document, 'div'),
        input   : HTMLTextAreaElement = dom.createElement(document, 'textarea'),
        value   : string        = '';
      if (data && typeof data[this.getName()] !== 'undefined') {
        value = String(data[this.getName()] || '');
      }
      dom.appendChild(element, container);
      dom.addClass(container, 'ui-container');
      dom.appendChild(container, input);
      dom.addClass(input, 'ui-textarea');
      input.value = value;

      return new mediator.Column(
        element,
        () => {
          var values: Object = {};
          values[this.getName()] = String(input.value || '');
          return values;
        },
        (values) => {
          values = values || {};
          var value: any = values[this.getName()];
          input.value = String(value || '');
        }
      );
    }

  }

}