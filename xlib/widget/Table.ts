/*
/// <reference path="ITable.ts"/>
/// <reference path="../utils/dom.ts"/>
/// <reference path="table/IConfig.ts"/>
/// <reference path="table/IAccess.ts"/>
/// <reference path="table/IColumn.ts"/>
/// <reference path="table/ISequence.ts"/>
/// <reference path="table/IEmpty.ts"/>
/// <reference path="table/Sequence.ts"/>
/// <reference path="table/Empty.ts"/>
/// <reference path="table/factory/IButton.ts"/>
/// <reference path="table/factory/Button.ts"/>
/// <reference path="table/factory/Select.ts"/>
/// <reference path="table/factory/ISelect.ts"/>
/// <reference path="table/column/IColumn.ts"/>
/// <reference path="table/column/IOptions.ts"/>
/// <reference path="table/column/Textarea.ts"/>
/// <reference path="table/column/View.ts"/>
/// <reference path="table/column/Input.ts"/>
/// <reference path="table/column/Checkbox.ts"/>
/// <reference path="table/column/Group.ts"/>
/// <reference path="table/mediator/IColumn.ts"/>
/// <reference path="table/mediator/Column.ts"/>
/// <reference path="table/mediator/ISelect.ts"/>
/// <reference path="table/mediator/Select.ts"/>
/// <reference path="table/mediator/IExistsRecord.ts"/>
/// <reference path="table/mediator/ExistsRecord.ts"/>
/// <reference path="table/mediator/INewRecord.ts"/>
/// <reference path="table/mediator/NewRecord.ts"/>

module widget {

  import table   = widget.table;
  import factory = table.factory;
  import button  = table.button;
  import select  = table.select;
  import column  = table.column;
  import mediator = table.mediator;

  export interface IData {
    update: any[];
    insert: any[];
    remove: any[];
  }

  export class Table implements ITable {

    private useTitle: boolean = false;

    private useRemove: boolean = false;

    private useCopy: boolean = false;

    private useUpdate: boolean = false;

    private useSelect: boolean = false;

    private useEdit: boolean = false;

    private useInsert: boolean = false;

    private allowRemove: boolean = false;

    private allowInsert: boolean = false;

    private allowUpdate: boolean = false;

    private document: Document;

    private primary: string[] = [];

    private useSequence: boolean = false;

    private head: HTMLTableSectionElement;

    private body: HTMLTableSectionElement;

    private foot: HTMLTableSectionElement;

    private table: HTMLTableElement;

    private columns: table.IColumn[] = [];

    private sequence: table.Sequence;

    private empty: table.IEmpty;

    private buttonFactory: factory.IButton;

    private selectFactory: factory.ISelect;

    private columnFactory: factory.IColumn;

    private newRecords: mediator.NewRecord[] = [];

    public getData(): IData {
      var update: any[] = [],
        remove: any[] = [];
      return {
        update: this.getValues(true),
        insert: this.getNewValues(),
        remove: remove
      };
    }

    public getPrimary(): string[] {
      return this.primary;
    }

    public isUseSequence(): boolean {
      return this.useSequence;
    }

    public isUseTitle(): boolean {
      return this.useTitle;
    }

    public isUseRemove(): boolean {
      return this.useRemove;
    }

    public isUseCopy(): boolean {
      return this.useCopy;
    }

    public isUseUpdate(): boolean {
      return this.useUpdate;
    }

    public isUseSelect(): boolean {
      return this.useSelect;
    }

    public isUseEdit(): boolean {
      return this.useEdit;
    }

    public isUseInsert(): boolean {
      return this.useInsert;
    }

    public isAllowRemove(): boolean {
      return this.allowRemove;
    }

    public isAllowInsert(): boolean {
      return this.allowInsert;
    }

    public isAllowUpdate(): boolean {
      return this.allowUpdate;
    }

    public getDocument(): Document {
      if (!this.document) {
        this.document = document;
      }
      return this.document;
    }

    public createButtonFactory(): factory.IButton {
      var document: Document = this.getDocument();
      return new factory.Button(document);
    }

    public getButtonFactory(): factory.IButton {
      if (!this.buttonFactory) {
        this.buttonFactory = this.createButtonFactory();
      }
      return this.buttonFactory;
    }

    public createSelectFactory(): factory.ISelect {
      var document: Document = this.getDocument();
      return new factory.Select(document);
    }

    public getSelectFactory(): factory.ISelect {
      if (!this.selectFactory) {
        this.selectFactory = this.createSelectFactory();
      }
      return this.selectFactory;
    }

    private existsRecords: mediator.ExistsRecord[] = [];

    public update(data?: any[]): void {
      var columnFactory : factory.IColumn = this.getColumnFactory(),
        selectFactory : factory.ISelect = this.getSelectFactory(),
        buttonFactory : factory.IButton = this.getButtonFactory(),
        columns : string[] = columnFactory.getNames(),
        length : number = columns.length,
        table : HTMLTableElement    = this.getTable(),
        tbody : HTMLTableSectionElement = this.getBody(),
        tfoot : HTMLTableSectionElement = this.getFoot(),
        record : HTMLTableRowElement;
      if (tbody.parentElement) {
        table.removeChild(tbody);
      }
      while(tbody.childNodes.length) {
        tbody.removeChild(tbody.childNodes.item(0));
        this.existsRecords = [];
      }
      if (data instanceof Array) {
        for (var index = 0; index < data.length; index++) {
          record = this.createRow();
          var elements : mediator.IColumn[] = [];

          if (this.isUseSequence()) {
            dom.appendChild(record, this.getSequence().
              createContent(index + 1));
          }
          if (this.isUseRemove()) {
            dom.appendChild(record, buttonFactory.
              getButtonRemove().createContent(function () {
                alert('Remove record');
              }));
          }
          if (this.isUseCopy()) {
            dom.appendChild(record, buttonFactory.
              getButtonCopy().createContent(function () {
                alert('copy record');
              }));
          }
          if (this.isUseEdit()) {
            dom.appendChild(record, buttonFactory.
              getButtonEdit().createContent(function () {
                alert('edit form');
              }));
          }

          for (var i: number = 0; i < length; i++) {
            var element : mediator.IColumn = columnFactory.getColumn(columns[i]).createContent(data[i]);
            dom.appendChild(record, element.getContent());
            elements.push(element);
          }

          if (this.isUseUpdate()) {
            dom.appendChild(record, selectFactory.
              getSelectUpdate().createContent(function () {
                alert('123');
              }));
          }
          if (this.isUseRemove()) {
            dom.appendChild(record, selectFactory.
              getSelectRemove().createContent(function () {
                alert('123');
              }));
          }
          if (this.isUseUpdate()) {
            dom.appendChild(record, selectFactory.
              getSelectCustom().createContent(function () {
                alert('123');
              }));
          }
          dom.appendChild(tbody, record);

          ((elements: mediator.IColumn[]) => {
            this.existsRecords.push(new mediator.ExistsRecord(
              record,
              // Получение значения
              (): any => {
                var values = {},
                  length = elements.length,
                  index;
                for (index = 0; index < length; index++) {
                  utils.extend(values, elements[index].getValues());
                }
                return values;
              },
              // Установка значения
              (values: any): void => {
                for (var index = 0; elements.length; index++) {
                  elements[index].setValues(values);
                }
              },
              // Получить признак обновления
              (): boolean => {return true;},
              // Установить признак обновления
              (value: boolean): void => {},
              // Получить признак удаления
              (): boolean => {return true;},
              // Установить признак удаления
              (value: boolean): void => {},
              // Получить признак пользовательского выделения
              (): boolean => {return true;},
              // Установить признак пользовательского выделения
              (value: boolean): void => {}
            ));
          })(elements);
        }
        if (tfoot.parentElement) {
          table.insertBefore(tbody, tfoot);
        } else {
          dom.appendChild(table, tbody);
        }
      }
    }

    public createHead(): HTMLTableSectionElement {
      var document : Document = this.getDocument(),
        thead  : HTMLTableSectionElement = dom.createElement(document, 'thead');
      dom.addClass(thead, 'ui-head');
      dom.attachEvent(thead, 'mouseover', function () {
        dom.addClass(thead, 'ui-over');
      });
      dom.attachEvent(thead, 'mouseout', function () {
        dom.removeClass(thead, 'ui-over');
      });
      return thead;
    }

    public getHead(): HTMLTableSectionElement {
      if (!this.head) {
        this.head = this.createHead();
      }
      return this.head;
    }

    public createBody(): HTMLTableSectionElement {
      var document : Document = this.getDocument(),
        tbody  : HTMLTableSectionElement = dom.createElement(document, 'tbody');
      dom.addClass(tbody, 'ui-body');
      dom.attachEvent(tbody, 'mouseover', function () {
        dom.addClass(tbody, 'ui-over');
      });
      dom.attachEvent(tbody, 'mouseout', function () {
        dom.removeClass(tbody, 'ui-over');
      });
      return tbody;
    }

    public getBody(): HTMLTableSectionElement {
      if (!this.body) {
        this.body = this.createBody();
      }
      return this.body;
    }

    public createFoot(): HTMLTableSectionElement {
      var document : Document = this.getDocument(),
        tfoot  : HTMLTableSectionElement = dom.createElement(document, 'tfoot');
      dom.addClass(tfoot, 'ui-foot');
      dom.attachEvent(tfoot, 'mouseover', function () {
        dom.addClass(tfoot, 'ui-over');
      });
      dom.attachEvent(tfoot, 'mouseout', function () {
        dom.removeClass(tfoot, 'ui-over');
      });
      return tfoot;
    }

    public getFoot(): HTMLTableSectionElement {
      if (!this.foot) {
        this.foot = this.createFoot();
      }
      return this.foot;
    }

    public createRow(): HTMLTableRowElement {
      var document : Document = this.getDocument(),
        tableRow : HTMLTableRowElement = dom.createElement(document, 'tr');
      dom.addClass(tableRow, 'ui-row');
      dom.attachEvent(tableRow, 'mouseover', () => {
        dom.addClass(tableRow, 'ui-over');
      });
      dom.attachEvent(tableRow, 'mouseout', () => {
        dom.removeClass(tableRow, 'ui-over');
      });
      return tableRow;
    }

    public createTable(): HTMLTableElement {
      var document : Document     = this.getDocument(),
        table  : HTMLTableElement = dom.createElement(document, 'table');
      dom.addClass(table, 'ui-table');
      dom.attachEvent(table, 'mouseover', function () {
        dom.addClass(table, 'ui-over');
      });
      dom.attachEvent(table, 'mouseout', function () {
        dom.removeClass(table, 'ui-over');
      });
      return table;
    }

    public getTable(): HTMLTableElement {
      if (!this.table) {
        this.table = this.createTable();
      }
      return this.table;
    }

    public createSequence(): table.Sequence {
      return new table.Sequence(this.getDocument());
    }

    public getSequence(): table.Sequence {
      if (!this.sequence) {
        this.sequence = this.createSequence();
      }
      return this.sequence;
    }

    public createEmpty(): table.IEmpty {
      return new table.Empty(this.getDocument());
    }

    public getEmpty(): table.IEmpty {
      if (!this.empty) {
        this.empty = this.createEmpty();
      }
      return this.empty;
    }

    getCustomKeys(): any[] {
      var keys  : any[] = [],
        records : mediator.ExistsRecord[] = this.existsRecords,
        length  : number = records.length,
        record  : mediator.ExistsRecord,
        index   : number;
      for (index = 0; index < length; index++) {
        record = records[index];
        if (record.isCustom()) {
          keys.push(record.getPrimary());
        }
      }
      return keys;
    }

    getUpdateKeys(): any[] {
      var keys  : any[] = [],
        records : mediator.ExistsRecord[] = this.existsRecords,
        length  : number = records.length,
        record  : mediator.ExistsRecord,
        index   : number;
      for (index = 0; index < length; index++) {
        record = records[index];
        if (record.isUpdate()) {
          keys.push(record.getPrimary());
        }
      }
      return keys;
    }

    getRemoveKeys(): any[] {
      var keys  : any[] = [],
        records : mediator.ExistsRecord[] = this.existsRecords,
        length  : number = records.length,
        record  : mediator.ExistsRecord,
        index   : number;
      for (index = 0; index < length; index++) {
        record = records[index];
        if (record.isRemove()) {
          keys.push(record.getPrimary());
        }
      }
      return keys;
    }

    public getValues(updateOnly: boolean = true): any[] {
      var keys  : any[] = [],
        records : mediator.ExistsRecord[] = this.existsRecords,
        length  : number = records.length,
        record  : mediator.ExistsRecord,
        index   : number;
      if (updateOnly) {
        for (index = 0; index < length; index++) {
          record = records[index];
          if (record.isUpdate()) {
            keys.push(record.getValues());
          }
        }
      } else {
        for (index = 0; index < length; index++) {
          keys.push(records[index].getValues());
        }
      }
      return keys;
    }

    public getNewValues(): any[] {
      var values : any[]  = [],
        length : number = this.newRecords.length,
        index  : number;
      for (index = 0; index < length; index++) {
        values.push(this.newRecords[index].getValues());
      }
      return values;
    }

    public addNewRecord(): void {
      var tableRow    : HTMLTableRowElement = this.createRow(),
        factoryButton : factory.IButton   = this.getButtonFactory(),
        columnFactory : factory.IColumn   = this.getColumnFactory(),
        buttonRemove  : button.IButton    = factoryButton.getButtonRemove(),
        sequence    : table.Sequence    = this.getSequence(),
        columns     : string[]      = columnFactory.getNames(),
        element     : mediator.IColumn,
        elements    : mediator.IColumn[] = [],
        foot      : HTMLTableSectionElement = this.getFoot(),
        record    : mediator.NewRecord,
        length    : number,
        index     : number;

      var count = 0,
        handler = () => {
          foot.removeChild(tableRow);
          var records = this.newRecords,
            index = records.indexOf(record);
          if (index !== -1) {
            records.splice(index, 1);
          }
        };
      if (this.isUseSequence()) {
        count++;
      }
      if (this.isUseRemove()) {
        count++;
      }
      if (this.isUseCopy()) {
        count++;
      }
      if (this.isUseEdit()) {
        count++;
      }
      if (count > 1) {
        dom.appendChild(tableRow, sequence.createContent('#'));
      } else {
        // Рисуем кнопку удаления записи, это самое ближайшее место к данным.
        dom.appendChild(tableRow, buttonRemove.createContent(handler));
      }
      if (count > 2) {
        dom.appendChild(tableRow, this.getEmpty().createContent());
      } else {
        // Рисуем кнопку удаления записи, это самое ближайшее место к данным.
        dom.appendChild(tableRow, buttonRemove.createContent(handler));
      }
      if (count > 3) {
        dom.appendChild(tableRow, this.getEmpty().createContent());
      } else {
        // Рисуем кнопку удаления записи, это самое ближайшее место к данным.
        dom.appendChild(tableRow, buttonRemove.createContent(handler));
      }
      if (count === 4) {
        // Рисуем кнопку удаления записи, это самое ближайшее место к данным.
        dom.appendChild(tableRow, buttonRemove.createContent(handler));
      }

      length = columns.length;
      for (index = 0; index < length; index++) {
        element = columnFactory.getColumn(columns[index]).createContent();
        dom.appendChild(tableRow, element.getContent());
        elements.push(element);
      }
      if (this.isUseUpdate()) {
        dom.appendChild(tableRow, this.getEmpty().createContent());
      }
      if (this.isUseRemove()) {
        dom.appendChild(tableRow, this.getEmpty().createContent());
      }
      if (this.isUseUpdate()) {
        dom.appendChild(tableRow, this.getEmpty().createContent());
      }
      if (foot.childNodes.length === 1) {
        dom.appendChild(foot, tableRow);
      } else {
        foot.insertBefore(tableRow, foot.childNodes.item(1));
      }
      record = new mediator.NewRecord(
        tableRow,
        () => {
          var values: any = {},
            length: number = elements.length,
            index : number;
          for (index = 0; index < length; index++) {
            utils.extend(values, elements[index].getValues());
          }
          return values;
        },
        (values) => {
          var values: any = {},
            length: number = elements.length,
            index : number;
          for (index = 0; index < length; index++) {
            elements[index].setValues(values);
          }
        }
      );
      this.newRecords.push(record);
    }

    public createColumnFactory(): factory.IColumn {
      var document: Document = this.getDocument();
      return new factory.Column(document, this.columns);
    }

    public getColumnFactory(): factory.IColumn {
      return this.columnFactory;
    }

    constructor(data?: any[], options?: table.IConfig, access?: table.IAccess) {
      var buttonFactory: factory.IButton = this.getButtonFactory(),
        selectFactory: factory.ISelect = this.getSelectFactory();
      if (options && typeof options.useSequence !== 'undefined') {
        this.useSequence = options.useSequence;
      }
      if (options && typeof options.useTitle !== 'undefined') {
        this.useTitle = !!options.useTitle;
      }
      if (options && typeof options.useRemove !== 'undefined') {
        this.useRemove = !!options.useRemove;
      }
      if (options && typeof options.useCopy !== 'undefined') {
        this.useCopy = !!options.useCopy;
      }
      if (options && typeof options.useUpdate !== 'undefined') {
        this.useUpdate = !!options.useUpdate;
      }
      if (options && typeof options.useSelect !== 'undefined') {
        this.useSelect = !!options.useSelect;
      }
      if (options && typeof options.useEdit !== 'undefined') {
        this.useEdit = !!options.useEdit;
      }
      if (options && typeof options.useInsert !== 'undefined') {
        this.useInsert = !!options.useInsert;
      }
      if (options && typeof options.columns !== 'undefined') {
        this.columns = options.columns;
      }
      if (options && typeof options.primary !== 'undefined') {
        this.primary = options.primary.slice(0);
      }
      if (access && typeof access.allowRemove !== 'undefined') {
        this.allowRemove = !!access.allowRemove;
      }
      if (access && typeof access.allowInsert !== 'undefined') {
        this.allowInsert = !!access.allowInsert;
      }
      if (access && typeof access.allowUpdate !== 'undefined') {
        this.allowUpdate = !!access.allowUpdate;
      }
      this.useInsert = this.useInsert && this.isAllowInsert();
      this.useRemove = this.useRemove && this.isAllowRemove();
      this.useCopy   = this.useCopy   && this.isAllowInsert() && this.useInsert;
      this.useUpdate = this.useUpdate && this.isAllowUpdate();
      this.useSelect = this.useSelect && this.isAllowUpdate();
      this.useEdit   = this.useEdit   && this.isAllowUpdate();
      this.columnFactory = this.createColumnFactory();

      setTimeout(() => {

        var table: HTMLTableElement = this.getTable(),
          head: HTMLTableSectionElement,
          foot: HTMLTableSectionElement = this.getFoot();

        if (this.isUseTitle()) {
          head = this.getHead();
          var row: HTMLTableRowElement = this.createRow();
          if (this.isUseSequence()) {
            dom.appendChild(row, this.getSequence().createHeader());
          }
          if (this.isUseRemove()) {
            dom.appendChild(row, buttonFactory.getButtonRemove().createHeader());
          }
          if (this.isUseInsert()) {
            dom.appendChild(row,  buttonFactory.getButtonCopy().createHeader());
          }
          if (this.isUseEdit()) {
            dom.appendChild(row,  buttonFactory.getButtonEdit().createHeader());
          }
          var columnFactory : factory.IColumn = this.getColumnFactory(),
            columns = columnFactory.getNames(),
            length: number = columns.length;
          for (var index: number = 0; index < length; index++) {
            var e = columnFactory.getColumn(columns[index]);
            dom.appendChild(row, e.createHeader());
          }
          if (this.isUseUpdate()) {
            dom.appendChild(row, selectFactory.getSelectUpdate().createHeader(function () {
              alert(123);
            }));
          }
          if (this.isUseRemove()) {
            dom.appendChild(row, selectFactory.getSelectRemove().createHeader(function () {
              alert(123);
            }));
          }
          if (this.isUseUpdate()) {
            dom.appendChild(row, selectFactory.getSelectCustom().createHeader(function () {
              alert(123);
            }));
          }
          dom.appendChild(head, row);
          dom.appendChild(table, head);
        }

        this.update(data);

        if (this.isUseInsert()) {
          dom.appendChild(table, foot);
          var row : HTMLTableRowElement = this.createRow();
          dom.appendChild(foot, row);
          var document: Document = this.getDocument(),
            element: HTMLTableCellElement = dom.createElement(document, 'td'),
            colSpan = columns.length;
          if (this.isUseSequence()) {
            colSpan++;
          }
          if (this.isUseRemove()) {
            colSpan++;
          }
          if (this.isUseUpdate()) {
            colSpan++;
          }
          if (this.isUseEdit()) {
            colSpan++;
          }
          if (this.isUseUpdate()) {
            colSpan++;
          }
          if (this.isUseRemove()) {
            colSpan++;
          }
          if (this.isUseUpdate()) {
            colSpan++;
          }
          element.colSpan = colSpan;
          dom.addClass(element, 'ui-element');
          dom.addClass(element, 'ui-button');
          dom.addClass(element, 'ui-insert');
          var document: Document = this.getDocument(),
            container = dom.createElement(document, 'div');
          dom.addClass(container, 'ui-container');
          dom.appendChild(element, container);
          var link = dom.createElement(this.getDocument(), 'a');
          link.href = 'javascript: void(0);';
          dom.addClass(link, 'ui-button');
          dom.appendChild(container, link);
          var document: Document = this.getDocument(),
            text = dom.createElement(document, 'span');
          dom.appendText(text, dom.createTextNode(document, 'Insert'));
          dom.addClass(text, 'ui-text');
          dom.appendChild(link, text);
          dom.attachEvent(link, 'click', () => {
            this.addNewRecord();
          });
          dom.appendChild(row, element);
        }

      }, 0);

    }

  }

}*/
