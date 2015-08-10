/// <reference path="Column.ts"/>
/// <reference path="../mediator/Column.ts"/>
/// <reference path="IRadioGroupList.ts"/>
/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>

module widget.table.column {

  import mediator = widget.table.mediator;

  export class Select extends Column {

    private list: IRadioGroupList[] = [];

    public getList(): IRadioGroupList[] {
      return this.list;
    }

    public getType(): string {
      return 'select';
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
    }

    createContent(data?: any, position?: any): mediator.Column {
      var document : Document      = this.getDocument(),
        element  : HTMLTableDataCellElement     = super.createContent(data).getContent(),
        container : HTMLDivElement = dom.createElement(document, 'div'),
        select   : HTMLSelectElement = dom.createElement(document, 'select'),
        option   : HTMLOptionElement,
        list   : IRadioGroupList[] = this.getList(),
        length   : number    = list.length,
        value  : any     = '',
        index  : number,
        name   : string;
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

      select = dom.createElement(document, 'select');
      dom.appendChild(container, select);

      length = list.length;
      for (index = 0; index < length; index++) {
        option = dom.createElement(document, 'option');
        option.value = list[index].value;
        dom.appendText(option, dom.createTextNode(document, list[index].title));
        dom.appendChild(select, option);
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