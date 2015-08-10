module xlib.utils.service.builder {

  export interface IBuilder {

    build(name: string, method: string, params?: any): string;

  }

}