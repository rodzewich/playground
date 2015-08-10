/// <reference path="Button.ts"/>

module widget.table.button {

  export class Copy extends Button{

    constructor(document: Document) {
      super({
        document : document,
        type   : 'copy',
        name   : 'Copy',
        title  : 'Copy'
      });
    }

  }

}