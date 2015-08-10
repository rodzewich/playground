module xlib.utils.event {

  export interface IEvent {

    addListener(event: number, listener: (...args: any[]) => void): void;

    removeListener(event: number, listener: (...args: any[]) => void): void;

    removeListeners(event?: number): void;

    dispatchEvent(event: number, ...args: any[]): void;

  }

}