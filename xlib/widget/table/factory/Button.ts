/// <reference path="IButton.ts"/>
/// <reference path="../button/IButton.ts"/>
/// <reference path="../button/Remove.ts"/>
/// <reference path="../button/Copy.ts"/>
/// <reference path="../button/Edit.ts"/>

module widget.table.factory {

  import button = widget.table.button;

  export class Button implements IButton {

    private document: Document;

    private buttonRemove: button.IButton;

    private buttonCopy: button.IButton;

    private buttonEdit: button.IButton;

    getDocument(): Document {
      if (!this.document) {
        this.document = document;
      }
      return this.document;
    }

    constructor(document?: Document) {
      if (document) {
        this.document = document;
      }
    }

    public createButtonRemove(): button.IButton {
      return new button.Remove(this.getDocument());
    }

    public getButtonRemove(): button.IButton {
      if (!this.buttonRemove) {
        this.buttonRemove = this.createButtonRemove();
      }
      return this.buttonRemove;
    }

    public createButtonCopy(): button.IButton {
      return new button.Copy(this.getDocument());
    }

    public getButtonCopy(): button.IButton {
      if (!this.buttonCopy) {
        this.buttonCopy = this.createButtonCopy();
      }
      return this.buttonCopy;
    }

    public createButtonEdit(): button.IButton {
      return new button.Edit(this.getDocument());
    }

    public getButtonEdit(): button.IButton {
      if (!this.buttonEdit) {
        this.buttonEdit = this.createButtonEdit();
      }
      return this.buttonEdit;
    }

  }

}