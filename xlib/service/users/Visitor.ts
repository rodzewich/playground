/// <reference path="../Service.ts" />
/// <reference path="../IService.ts" />

module xlib.service.users {

  export class Visitor extends service.Service implements service.IService {

    constructor(params?: any, callback?: (errors?: Error[], response?: any) => void) {
      super(params, callback);
    }

  }

}