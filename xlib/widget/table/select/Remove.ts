/// <reference path="Select.ts"/>

module widget.table.select {

  export class Remove extends Select {

    constructor(document: Document) {
      super({
        document : document,
        type   : 'remove',
        name   : 'Remove',
        title  : 'Remove'
      });
    }

  }

}