/// <reference path="IRouter.ts" />
/// <reference path="IOptions.ts" />

module xlib.mvc.router {

  import controller = mvc.controller;

  export class Router implements router.IRouter {

    protected name: string = null;

    protected routes: router.IRouter[] = [];

    protected controller: any = null;

    constructor(options?: router.IOptions) {
      if (options && xlib.typeOf(options.name) !== "undefined") {
        this.setName(options.name);
      }
      if (options && xlib.typeOf(options.routers) !== "undefined") {
        this.setRouters(options.routers);
      }
      if (options && xlib.typeOf(options.controller) !== "undefined") {
        this.setController(options.controller);
      }
    }

    public setController(value: string): void {
      if (this.getRouters().length) {
        throw new Error("bla bla bla");
      }
      this.controller = String(value || "");
    }

    public getController(callback: (instance: controller.IController) => void): void {
      return <controller.IController>(new this.controller());
    }

    public setRouters(values: router.IRouter[]): void {
      var index: number,
        length: number;
      if (this.controller) {
        throw new Error("bla bla bla");
      }
      if (xlib.typeOf(values) !== "array") {
        throw new Error("bla bla bla");
      }
      length = values.length;
      this.routes = [];
      for (index = 0; index < length; index++) {
        if (!values[index]) {
          throw new Error("bla bla bla");
        }
        this.routes.push(values[index]);
      }
    }

    public getRouters(): router.IRouter[] {
      return this.routes;
    }

    public setName(value: string): void {
      var temp: string = String(value || '');
      if (!/^[a-z][a-z0-9]*$/.test(temp)) {
        throw new Error("bla bla bla");
      }
      this.name = temp;
    }

    public getName(): string {
      return this.name;
    }

    public route(callback?: (errors?: Error[], controller?) => void): void {
    }

    public url(name: string, data?: any, callback?: (errors?: Error[], value?: string) => void): void {

    }

  }

}
