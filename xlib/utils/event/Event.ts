/// <reference path="IEvent.ts" />
/// <reference path="../../utils/core.ts" />

module xlib.utils.event {

  export class Event implements IEvent {

    private listeners: any = {};

    addListener(event: number, listener: (...args: any[]) => void): void {
      var temp: string = String(event || '');
      if (!/^\d+$/.test(temp)) {
        throw new Error('bla bla bla');
      }
      if (xlib.typeOf(listener) !== 'function') {
        throw new Error('bla bla bla');
      }
      if (xlib.typeOf(this.listeners['e' + temp]) !== 'array') {
        this.listeners['e' + temp] = [];
      }
      this.listeners['e' + temp].push(listener);
    }

    removeListener(event: number, listener: (...args: any[]) => void): void {
      var temp: string = String(event || ''),
        index: number;
      if (!/^\d+$/.test(temp)) {
        throw new Error('bla bla bla');
      }
      if (xlib.typeOf(listener) !== 'function') {
        throw new Error('bla bla bla');
      }
      if (xlib.typeOf(this.listeners['e' + temp]) !== 'array') {
        this.listeners['e' + temp] = [];
      }
      index = this.listeners['e' + temp].indexOf(listener);
      if (index !== -1) {
        this.listeners['e' + temp].splice(index, 1);
      }
    }

    removeListeners(event?: number): void {
      var temp: string = String(event || '');
      if (temp) {
        if (!/^\d+$/.test(temp)) {
          throw new Error('bla bla bla');
        }
        this.listeners['e' + temp] = [];
      } else {
        this.listeners = {};
      }
    }

    dispatchEvent(event: number, ...args: any[]): void {
      var temp: string = String(event || ''),
        listeners: Function[];
      if (!/^\d+$/.test(temp)) {
        throw new Error('bla bla bla');
      }
      listeners = this.listeners['e' + event] || [];
      function next() {
        setTimeout(() => {
          var listener: Function = listeners.shift();
          if (listener) {
            listener.apply(this, args);
            next();
          }
        }, 0);
      }
      next();
    }

  }

}