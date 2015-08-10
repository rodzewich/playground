/// <reference path="../../../utils/dom.ts"/>
/// <reference path="../../../utils/core.ts"/>
/// <reference path="../column/Checkbox.ts"/>
/// <reference path="../column/Group.ts"/>
/// <reference path="../column/Select.ts"/>
/// <reference path="../column/Input.ts"/>
/// <reference path="../column/Textarea.ts"/>
/// <reference path="../column/View.ts"/>
/// <reference path="../column/RadioGroup.ts"/>
/// <reference path="IColumn.ts"/>

module widget.table.factory {

  import column = widget.table.column;

  export class Column implements IColumn {

    private document: Document;

    private columns: any = {};

    constructor(document?: Document, columns?: any) {
      var count   : number = 0,
        name  : string,
        index   : number,
        length  : number,
        options : any;
      if (document) {
        this.document = document;
      }
      if (xlib.typeOf(columns) === 'array') {
        length = columns.length;
        for (index = 0; index < length; index++) {
          options = columns[index];
          name = String(options.name || '');
          if (!/^\w+$/.test(name)) {
            throw new TypeError('bla bla bla');
          }
          if (xlib.typeOf(this.columns[name]) !== 'undefined') {
            throw new TypeError('bla bla bla');
          }
          this.columns[name] = this.createColumn(options);
          count++;
        }
      } else if (xlib.typeOf(columns) === 'object') {
        for (var property in columns) {
          if (columns.hasOwnProperty(property)) {
            options = columns[property];
            if (!/^\w+$/.test(property)) {
              throw new TypeError('bla bla bla');
            }
            if (xlib.typeOf(this.columns[property]) !== 'undefined') {
              throw new TypeError('bla bla bla');
            }
            options.name = property;
            this.columns[property] = this.createColumn(options);
            count++;
          }
        }
      }
      if (count === 0) {
        throw new TypeError('bla bla bla');
      }
    }

    public getDocument(): Document {
      if (!this.document) {
        this.document = document;
      }
      return this.document;
    }

    public getNames(): string[] {
      var property: string,
        names: string[] = [];
      for (property in this.columns) {
        if (this.columns.hasOwnProperty(property)) {
          names.push(property);
        }
      }
      return names;
    }

    public createColumn(options: any): column.IColumn {
      var element : column.IColumn,
        type  : string;
      if (options && xlib.typeOf(options.type) !== 'undefined') {
        type = String(options.type || '');
      }
      switch (type) {
        case 'view':
          element = new column.View(options);
          break;
        case 'select':
          element = new column.Select(options);
          break;
        case 'textarea':
          element = new column.Textarea(options);
          break;
        case 'checkbox':
          element = new column.Checkbox(options);
          break;
        case 'radioGroup':
          element = new column.RadioGroup(options);
          break;
        case 'group':
          element = new column.Group(options);
          break;
        case 'input':
        default:
          element = new column.Input(options);
          break;
      }
      return element;
    }

    public getColumn(name: string): column.IColumn {
      var real : string = String(name || '');
      if (xlib.typeOf(this.columns[real]) === 'undefined') {
        throw new Error('bla bla bla');
      }
      return this.columns[real];
    }

  }

}