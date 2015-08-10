/// <reference path="Column.ts"/>
/// <reference path="../mediator/Column.ts"/>
/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>

module widget.table.column {

  import mediator = widget.table.mediator;

  export class Checkbox extends Column {

    getType(): string {
      return 'checkbox';
    }

    createContent(data?: any): mediator.Column {
      var document  : Document     = this.getDocument(),
        element   : HTMLTableDataCellElement    = super.createContent().getContent(),
        container : HTMLElement    = dom.createElement(document, 'div'),
        input   : HTMLInputElement = dom.createElement(document, 'input'),
        value   : any        = '';
      if (data && typeof data[this.getName()] !== 'undefined') {
        value = String(data[this.getName()] || '');

      }
      dom.appendChild(element, container);
      dom.addClass(container, 'ui-container');
      dom.appendChild(container, input);
      input.type = 'checkbox';
      dom.addClass(input, 'ui-text');
      input.checked = !!value;

      return new mediator.Column(
        element,
        () => {
          var values: Object = {};
          values[this.getName()] = !!input.checked;
          return values;
        },
        (values) => {
          values = values || {};
          var value: any = values[this.getName()];
          if (xlib.typeOf(value) === 'string') {
            input.checked = ['false', 'off', 'no', '0'].indexOf(String(value).toLowerCase()) === -1;
          } else {
            input.checked = !!value;
          }
        }
      );
    }

  }

}