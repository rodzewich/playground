module xlib.utils.listener {

  export class Events {
    public AFTER_ADD_LISTENER: string = "afterAddListener";
    public BEFORE_ADD_LISTENER: string = "beforeAddListener";
    public AFTER_REMOVE_LISTENER: string = "afterRemoveListener";
    public BEFORE_REMOVE_LISTENER: string = "beforeRemoveListener";
    public AFTER_REMOVE_ALL_LISTENERS: string = "afterRemoveAllListeners";
    public BEFORE_REMOVE_ALL_LISTENERS: string = "beforeRemoveAllListeners";
    public AFTER_FIRE_LISTENERS: string = "afterFireListeners";
    public BEFORE_FIRE_LISTENERS: string = "beforeFireListeners";
  }

}