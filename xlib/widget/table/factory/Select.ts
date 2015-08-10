/// <reference path="ISelect.ts"/>
/// <reference path="../select/ISelect.ts"/>
/// <reference path="../select/Update.ts"/>
/// <reference path="../select/Remove.ts"/>
/// <reference path="../select/Custom.ts"/>

module widget.table.factory {

  import select = widget.table.select;

  export class Select implements ISelect {

    private document: Document;

    private selectUpdate: select.ISelect;

    private selectRemove: select.ISelect;

    private selectCustom: select.ISelect;

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

    public createSelectUpdate(): select.ISelect {
      return new select.Update(this.getDocument());
    }

    public createSelectRemove(): select.ISelect {
      return new select.Remove(this.getDocument());
    }

    public createSelectCustom(): select.ISelect {
      return new select.Custom(this.getDocument());
    }

    public getSelectUpdate(): select.ISelect {
      if (!this.selectUpdate) {
        this.selectUpdate = this.createSelectUpdate();
      }
      return this.selectUpdate;
    }

    public getSelectRemove(): select.ISelect {
      if (!this.selectRemove) {
        this.selectRemove = this.createSelectRemove();
      }
      return this.selectRemove;
    }

    public getSelectCustom(): select.ISelect {
      if (!this.selectCustom) {
        this.selectCustom = this.createSelectCustom();
      }
      return this.selectCustom;
    }
  }

}