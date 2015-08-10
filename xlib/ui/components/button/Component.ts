module xlib.ui.components.button {

  import element = ui.element;
  import Listener = xlib.utils.listener.Listener;
  import IElement = element.elements.IElement;
  import Events = button.Events;

  export class Component<T> extends Listener implements IComponent {

    private _canvas: IElement<T> = null;

    private _text: string = null;

    public getText(): string {
      return String(this._text || "");
    }

    public setText(value: string): void {
      this._text = String(value || "");
    }

    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.text) !== "undefined") {
        this.setText(options.text);
      }
      if (options.listeners) {
        if (xlib.typeOf(options.listeners.click) === "function") {
          this.addListener(Events.CLICK, options.listeners.click);
        }
      }
      var canvas: IElement<T> = element.button<T>({
        classes: [
          "xlib-component",
          "xlib-button"
        ],
        items: [
          element.span<T>({
            classes: [
              "xlib-text"
            ],
            text: this.getText()
          })
        ],
        listeners: {
          click: () => {
            if (options.listeners && options.listeners.click) {
              this.fireListeners(Events.CLICK);
            }
          },
          mouseover: () => {
            canvas.addClass("xlib-over");
          },
          mouseout: () => {
            canvas.removeClass("xlib-over");
          }
        }
      });
      this._canvas = canvas;
    }

    public addListener(name: string, callback: (...args: any[]) => {}): void {
      var temp: string = String(name || "");
      if (xlib.typeOf(Events[temp]) === "undefined") {
        throw new Error("bla bla bla");
      }
      super.addListener(name, callback);
    }

    public removeListener(name: string, callback?: (...args: any[]) => {}): void {
      var temp: string = String(name || "");
      if (xlib.typeOf(Events[temp]) === "undefined") {
        throw new Error("bla bla bla");
      }
      super.removeListener(name, callback);
    }

    protected fireListeners(name: string, ...args: any[]): void {
      var temp: string = String(name || "");
      if (xlib.typeOf(Events[temp]) === "undefined") {
        throw new Error("bla bla bla");
      }
      args.unshift(temp);
      super.fireListeners.apply(this, args)
    }

    public onClick(callback: (...args: any[]) => {}): void {
      this.addListener(Events.CLICK, callback);
    }

    public getCanvas(): IElement<T> {
      return this._canvas;
    }

  }

}