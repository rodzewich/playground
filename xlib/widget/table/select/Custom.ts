/// <reference path="Select.ts"/>

module widget.table.select {

  export class Custom extends Select {

    constructor(document: Document) {
      super({
        document : document,
        type   : 'custom',
        name   : 'Custom',
        title  : 'Custom'
      });
    }

  }

}