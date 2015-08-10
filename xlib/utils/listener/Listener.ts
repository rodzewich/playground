/// <reference path="../../core.ts" />
/// <reference path="./IListener.ts" />
/// <reference path="./Events.ts" />

module xlib.utils.listener {

  export class Listener implements IListener {

    private _listeners: any = {};

    private _events: Events = new Events();

    public addListener(name: string, callback: (...args: any[]) => {}): void {
      if (!this._listeners[name]) {
        this._listeners[name] = [];
      }
      if (xlib.typeOf(name) !== "string") {
        throw new Error("bla bla bla");
      }
      if (xlib.typeOf(callback) === "function") {
        this.fireListeners(this.getEvents().BEFORE_ADD_LISTENER, name);
        (<Array<any>>this._listeners[name]).push(callback);
        this.fireListeners(this.getEvents().AFTER_ADD_LISTENER, name);
      } else {
        throw new Error("bla bla bla");
      }
    }

    public addListeners(list: string[], callback: (...args: any[]) => {}): void {
      var index: number,
        length: number;
      if (xlib.typeOf(list) === "array") {
        length = list.length;
        for (index = 0; index < length; index++) {
          this.addListener(list[index], callback);
        }
      } else {
        throw new Error("bla bla bla");
      }
    }

    public removeListener(name: string, callback?: (...args: any[]) => {}): void {
      var listener: (...args: any[]) => {},
        listeners: any,
        index: number;
      if (xlib.typeOf(name) !== "string") {
        throw new Error("bla bla bla");
      }
      if (this._listeners[name] && xlib.typeOf(callback) === "undefined") {
        listeners = this._listeners[name];
        this.fireListeners(this.getEvents().BEFORE_REMOVE_ALL_LISTENERS, name, listeners);
        this._listeners[name] = [];
        this.fireListeners(this.getEvents().AFTER_REMOVE_ALL_LISTENERS, name, listeners);
      } else if (this._listeners[name] && xlib.typeOf(callback) === "function") {
        index = (<Array<any>>this._listeners[name]).indexOf(callback);
        if (index !== -1) {
          listener = (<Array<any>>this._listeners[name])[index];
          this.fireListeners(this.getEvents().BEFORE_REMOVE_LISTENER, name, listener);
          (<Array<any>>this._listeners[name]).splice(index, 1);
          this.fireListeners(this.getEvents().AFTER_REMOVE_LISTENER, name, listener);
        }
      } else {
        if (["undefined", "function"].indexOf(xlib.typeOf(callback)) !== -1) {
          throw new Error("bla bla bla");
        }
      }
    }

    public removeListeners(list: string[], callback?: (...args: any[]) => {}): void {
      var index: number,
        length: number;
      if (xlib.typeOf(list) === "array") {
        length = list.length;
        for (index = 0; index < length; index++) {
          this.removeListener(list[index], callback);
        }
      } else {
        throw new Error("bla bla bla");
      }
    }

    protected fireListeners(name: string, ...args: any[]): void {
      var temp: string = String(name || ""),
        index: number,
        length: number;
      if (xlib.typeOf(name) !== "string") {
        throw new Error("bla bla bla");
      }
      if (this._listeners[temp]) {
        length = (<Array<any>>this._listeners[temp]).length;
        for (index = 0; index < length; index++) {
          this.fireListeners(this.getEvents().BEFORE_FIRE_LISTENERS, temp, args);
          try {
            (<Function>(<Array<any>>this._listeners[temp])[index]).apply(this, args);
          } catch (error) {}
          this.fireListeners(this.getEvents().AFTER_FIRE_LISTENERS, temp, args);
        }
      }
    }

    protected getEvents(): Events {
      return this._events;
    }

    public toString() {
      return "[object xlib.utils.listener.Listener]";
    }

  }

}