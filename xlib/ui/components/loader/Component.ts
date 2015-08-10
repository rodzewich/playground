/// <reference path="../Component.ts" />
/// <reference path="./IComponent.ts" />
/// <reference path="./IOptions.ts" />

module xlib.ui.components.loader {

    import element = ui.element;
    import listener = xlib.utils.listener;
    import IElement = element.elements.IElement;


    export class Component<T> extends components.Component<T> implements loader.IComponent<T> {

        protected _text: IElement<T> = null;

        constructor(options?: loader.IOptions) {
            super();
            var text: IElement<T> = element.div<T>({
                classes: [
                    "xlib-text"
                ],
                listeners: {
                    mouseover: () => {
                        canvas.addClass("xlib-over");
                    },
                    mouseout: () => {
                        canvas.removeClass("xlib-over");
                    }
                }
            });
            var canvas: IElement<T> = element.div<T>({
                classes: [
                    "xlib-component",
                    "xlib-loader",
                    "xlib-icon"
                ],
                items: [
                    text
                ],
                listeners: {
                    mouseover: () => {
                        canvas.addClass("xlib-over");
                    },
                    mouseout: () => {
                        canvas.removeClass("xlib-over");
                    }
                }
            });
            this._canvas = canvas;
            this._text = text;
            this.hide();
        }

        public show(text?: string): void {
            this.getCanvas().setStyle("display", "block");
            this._text.setText(text);
            this.fireListeners(Widget.SHOWN);
        }

        public hide(): void {
            this.getCanvas().setStyle("display", "none");
            this.fireListeners(Widget.HIDDEN);
        }

        public static HIDDEN: string = "hidden";

        public static SHOWN: string = "shown";

    }

}
