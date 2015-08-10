module xlib.ui.components {

    import element  = ui.element;
    import listener = xlib.utils.listener;
    import IElement = element.elements.IElement;

    export class Component<T> extends listener.Listener implements IComponent<T> {

        protected _canvas: IElement<T> = null;

        public getCanvas(): IElement<T> {
            return this._canvas;
        }

    }

}