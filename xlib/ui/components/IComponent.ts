module xlib.ui.components {

    import element  = ui.element;
    import listener = xlib.utils.listener;
    import IElement = element.elements.IElement;

    export interface IComponent<T> extends listener.IListener {
        getCanvas(): IElement<T>;
    }

}