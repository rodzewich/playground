module xlib.ui.components.form.combobox {

  import Listener = xlib.utils.listener.Listener;
  import IElement = element.elements.IElement;

  export class Component<T> extends Listener implements IComponent {
    getCanvas(): IElement<T> {
      return null;
    }
  }

}
