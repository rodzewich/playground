/// <reference path="Button.ts"/>

module widget.table.button {

  export class Edit extends Button{

    constructor(document: Document) {
      super({
        document : document,
        type   : 'edit',
        name   : 'Edit',
        title  : 'Edit'
      });
    }

  }

}