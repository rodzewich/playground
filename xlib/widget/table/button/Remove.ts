/// <reference path="Button.ts"/>

module widget.table.button {

  export class Remove extends Button {

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