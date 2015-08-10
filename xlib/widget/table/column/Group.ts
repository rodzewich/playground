/// <reference path="Column.ts"/>
/// <reference path="../mediator/Column.ts"/>
/// <reference path="../factory/Column.ts"/>
/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>

module widget.table.column {

  import factory = widget.table.factory;
  import mediator = widget.table.mediator;


  export class Group extends Column {

    private orientation: string = 'vertical';

    private useTitle: boolean = false;

    private columnFactory: factory.IColumn;

    public getType(): string {
      return 'group';
    }

    public getOrientation(): string {
      return this.orientation;
    }

    public isUseTitle(): boolean {
      return this.useTitle;
    }

    private columns: any;

    public getColumns(): any {
      return this.columns;
    }

    constructor(options?: any) {
      super(options);
      if (options && xlib.typeOf(options.orientation) !== 'undefined' &&
        String(options.orientation || '').toLowerCase() === 'horizontal') {
        this.orientation = 'horizontal';
      }
      if (options && xlib.typeOf(options.useTitle) === 'string') {
        this.useTitle = ['false', 'off', 'no', '0'].indexOf(options.useTitle.toLowerCase()) === -1;
      } else {
        this.useTitle = !!options.useTitle;
      }
      if (options && xlib.typeOf(options.columns) !== 'undefined') {
        this.columns = options.columns;
        this.columnFactory = this.createColumnFactory();
      } else {
        throw new TypeError('bla bla bla');
      }

    }

    public createColumnFactory(): factory.IColumn {
      var document : Document = this.getDocument(),
        columns  : any    = this.getColumns();
      return new factory.Column(document, columns);
    }

    public getColumnFactory(): factory.IColumn {
      return this.columnFactory;
    }

    createContent(data?: any, position?: any): mediator.Column {
      var document : Document        = this.getDocument(),
        element  : HTMLTableDataCellElement       = super.createContent().getContent(),
        columnFactory : factory.IColumn = this.getColumnFactory(),
        names : string[] = columnFactory.getNames(),
        table  : HTMLTableElement    = dom.createElement(document, 'table'),
        body   : HTMLTableSectionElement = dom.createElement(document, 'tbody'),
        tr     : HTMLElement;
      dom.addClass(element, 'ui-group');
      dom.addClass(element, 'ui-' + this.getOrientation());
      dom.appendChild(element, table);
      dom.addClass(table, 'ui-table');
      dom.addClass(table, 'ui-group');
      dom.addClass(table, 'ui-' + this.getOrientation());
      dom.attachEvent(table, 'mouseover', function () {
        dom.addClass(table, 'ui-over');
      });
      dom.attachEvent(table, 'mouseout', function () {
        dom.removeClass(table, 'ui-over');
      });
      dom.appendChild(table, body);
      if (this.getOrientation() === 'vertical') {
        for (var index = 0; index < names.length; index++) {
          tr = dom.createElement(document, 'tr');

          dom.appendChild(tr, columnFactory.getColumn(names[index]).createHeader());
          dom.appendChild(tr, columnFactory.getColumn(names[index]).createContent(data, position).getContent());
          dom.appendChild(body, tr);
        }
      } else {
        tr = dom.createElement(document, 'tr');
        dom.appendChild(body, tr);
        for (var index = 0; index < names.length; index++) {
          dom.appendChild(tr, columnFactory.getColumn(names[index]).createHeader());
        }
        tr = dom.createElement(document, 'tr');
        dom.appendChild(body, tr);
        for (var index = 0; index < names.length; index++) {
          dom.appendChild(tr, columnFactory.getColumn(names[index]).createContent(data, position).getContent());
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