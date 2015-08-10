/// <reference path="./IOptions.ts" />
/// <reference path="./Orientation.ts" />

module xlib.ui.components.form {

  import Listener = xlib.utils.listener.Listener;
  import IElement = element.elements.IElement;

  export class Component<T> extends Listener implements IComponent {

    private _orientation: Orientation = Orientation.VERTICAL;

    public getOrientation(): Orientation {
      return this._orientation;
    }

    public setOrientation(value: Orientation): void {
      this._orientation = value;
    }

    constructor(options: IOptions) {
      if (options && xlib.typeOf(options.orientation)) {
        this.setOrientation(options.orientation);
      }
    }

    getCanvas(): IElement<T> {
      return null;
    }

  }

}
