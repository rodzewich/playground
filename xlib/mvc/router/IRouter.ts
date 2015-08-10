module xlib.mvc.router {

  export interface IRouter {
    route(callback?: (errors?: Error[], controller?) => void): void;
    url(name: string, data?: any, callback?: (errors?: Error[], value?: string) => void): void;
  }

}
