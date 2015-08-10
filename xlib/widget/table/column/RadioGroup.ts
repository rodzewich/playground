/// <reference path="Column.ts"/>
/// <reference path="../mediator/Column.ts"/>
/// <reference path="IRadioGroupList.ts"/>
/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>

module widget.table.column {

  import mediator = widget.table.mediator;

  export class Type {
    public static VERTICAL: string = 'VERTICAL';
    public static HORIZONTAL: string = 'HORIZONTAL';
  }

  export class RadioGroup extends Column {

    private list: IRadioGroupList[] = [];

    private orientation: string = Type.VERTICAL;

    public getList(): IRadioGroupList[] {
      return this.list;
    }

    public getType(): string {
      return 'radioGroup';
    }

    public getOrientation(): string {
      return this.orientation;
    }

    constructor(options?: any) {
      super(options);
      var index   : number,
        length  : number,
        title   : string,
        value   : string,
        tooltip : string,
        element : any;
      if (options && xlib.typeOf(options.list) === 'array') {
        length = options.list.length;
        for (index = 0; index < length; index++) {
          title   = 'Unknown';
          value   = 'unknown';
          tooltip = null;
          element = options.list[index];
          if (element && xlib.typeOf(element.title) !== 'undefined') {
            title = String(element.title || '');
          }
          if (element && xlib.typeOf(element.value) !== 'undefined') {
            value = String(element.value || '');
          }
          if (element && xlib.typeOf(element.tooltip) !== 'undefined') {
            tooltip = String(element.tooltip || '');
          }
          this.list.push({
            title   : title,
            value   : value,
            tooltip : tooltip
          });
        }
      } else {
        throw new TypeError('bla bla bla');
      }
      if (!this.getList().length) {
        throw new TypeError('bla bla bla');
      }
      if (options && xlib.typeOf(options.orientation) !== 'undefined' &&
        String(options.orientation || '').toLowerCase() === Type.HORIZONTAL) {
        this.orientation = Type.HORIZONTAL;
      }
    }

    createContent(data?: any, position?: any): mediator.Column {
      var document  : Document  = this.getDocument(),
        element   : HTMLTableDataCellElement = super.createContent().getContent(),
        container : HTMLDivElement = dom.createElement(document, 'div'),
        table   : HTMLTableElement = dom.createElement(document, 'table'),
        tbody   : HTMLTableSectionElement = dom.createElement(document, 'tbody'),
        tr    : HTMLTableRowElement,
        td    : HTMLElement,
        index   : number,
        list    : IRadioGroupList[] = this.getList(),
        length  : number    = list.length,
        value   : any     = '',
        name    : string;
      if (xlib.typeOf(position) === 'array') {
        length = position.length;
        for (index = 0; index < length; index++) {
          if (xlib.typeOf(position[index]) !== 'string' ||
            /fix-me/.test(position[index])) {
            throw new TypeError('bla bla bla');
          }
        }
        name = this.getName() + '[' + position.join('][') + ']';
      } else {
        name = this.getName() + '[' + String(position || '') + ']';
      }
      if (data && typeof data[this.getName()] !== 'undefined') {
        value = String(data[this.getName()] || '');
      }
      dom.appendChild(element, container);
      dom.addClass(container, 'ui-container');
      dom.appendChild(container, table);
      dom.appendChild(table, tbody);

      function createElement(value: string, title: string, tooltip?: string): HTMLElement {
        var element: HTMLTableDataCellElement = dom.createElement(document, 'td'),
          input: HTMLInputElement = dom.createElement(document, 'input'),
          label: HTMLLabelElement = dom.createElement(document, 'label') ,
          span: HTMLSpanElement = dom.createElement(document, 'span') ,
          text: HTMLSpanElement = dom.createElement(document, 'span') ;
        dom.addClass(text, 'ui-text');
        dom.appendText(text, dom.createTextNode(document, title));
        input.type = 'radio';
        input.name = name;
        input.value = value;
        dom.appendChild(span, input);
        dom.appendChild(label, span);
        dom.appendChild(label, text);
        dom.appendChild(element, label);
        return element;
      }

      if (this.getOrientation() === Type.VERTICAL) {
        for (index = 0; index < length; index++) {
          var item: IRadioGroupList = list[index];
          tr = dom.createElement(document, 'tr');
          dom.appendChild(tbody, tr);
          td = createElement(item.value, item.title, item.tooltip);
          dom.appendChild(tr, td);
        }
      } else {
        for (index = 0; index < length; index++) {

        }
      }

      return new mediator.Column(
        element,
        () => {
          return '';
        },
        (values) => {
        }
      );
    }

  }


}