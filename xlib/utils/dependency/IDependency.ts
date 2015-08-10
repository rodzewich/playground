/// <reference path="ICallback.ts" />

module xlib.utils.dependency {

  export interface IDependency {
    register(name: string, callback: ICallback, singleton?: boolean): void;
    load(name: string, callback: (errors?: Error[], instance?: any) => void);
  }

}