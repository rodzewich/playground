/// <reference path="../window/IWindow.ts" />
/// <reference path="../window/Window.ts" />
/// <reference path="IOptions.ts" />

module widget.alert {

  import window = widget.window;

  class Alert extends window.Window {

    constructor(options: IOptions) {

    }

  }

  export function create(options: IOptions): window.IWindow {
    return new Alert(options);
  }

}