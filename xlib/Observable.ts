module xlib {

  class Observable implements IObservable {
    on(name: string, callback): void;
    bind(name: string, callback): void;
    unbind(name?: string, callback?): void;
    dispatch(name: string, ...args?: any[]): void;
  }

}