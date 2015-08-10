/// <reference path="./IRouter.ts" />

module xlib.mvc.router {

  export interface IOptions {
    name: string;
    routers?: IRouter[];
    controller?: string;
  }

}
