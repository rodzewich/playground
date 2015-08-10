/// <reference path="../select/ISelect.ts" />

module widget.table.factory {

  import select = table.select;

  export interface ISelect {

    getDocument(): Document;

    createSelectUpdate(): select.ISelect;

    createSelectRemove(): select.ISelect;

    createSelectCustom(): select.ISelect;

    getSelectUpdate(): select.ISelect;

    getSelectRemove(): select.ISelect;

    getSelectCustom(): select.ISelect;

  }

}