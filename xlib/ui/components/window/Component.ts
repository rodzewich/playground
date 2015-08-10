module xlib.ui.components.window {

  import element = ui.element;
  import IElement = element.elements.IElement;

  export class Component<T> {

    private _canvas: IElement<T> = null;

    protected color: string = "#000000";

    protected opacity: number = 0.4;

    constructor(options: window.IOptions) {
      var canvas: IElement<T> = element.div<T>({
        classes: [
          "component-window"
        ],
        items: [
          element.div<T>({
            styles: {
              background: this.color,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: this.opacity
            }
          })
        ]
      });
      this._canvas = canvas;
    }

    getCanvas(): IElement<T> {
      return this._canvas;
    }

    public center(): void {}

    public setWidth(): void {}
    public getWidth(): void {}
    public setHeight(): void {}
    public getHeight(): void {}

  }

}