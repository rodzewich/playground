/// <reference path="../button/IButton.ts"/>
/// <reference path="../button/Remove.ts"/>
/// <reference path="../button/Copy.ts"/>
/// <reference path="../button/Edit.ts"/>

module widget.table.factory {

  import button = widget.table.button;

  export interface IButton {

    getDocument(): Document;

    createButtonRemove(): button.IButton;

    getButtonRemove(): button.IButton;

    createButtonCopy(): button.IButton;

    getButtonCopy(): button.IButton;

    createButtonEdit(): button.IButton;

    getButtonEdit(): button.IButton;
  }

}