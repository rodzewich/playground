/// <reference path="Select.ts"/>

module widget.table.select {

  export class Update extends Select {

    constructor(document: Document) {
      super({
        document : document,
        type   : 'update',
        name   : 'Update',
        title  : 'Update'
      });
    }

  }

}