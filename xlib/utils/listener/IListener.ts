module xlib.utils.listener {

  export interface IListener {

    addListener(name: string, callback: (...args: any[]) => {}): void;

    addListeners(list: string[], callback: (...args: any[]) => {}): void;

    removeListener(name: string, callback?: (...args: any[]) => {}): void;

    removeListeners(list: string[], callback?: (...args: any[]) => {}): void;

  }

}