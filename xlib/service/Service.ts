/// <reference path="IService.ts" />

module xlib.service {

  export class Service implements IService {

    private _params: any = {};
    public getParams(): any {}
    public setParams(value: any): void {}

    public getParam(key: string): any {}
    public setParam(key: string, value: any): void {}

    constructor(params?: any, callback?: (errors?: Error[], response?: any) => void) {

    }
  }

}
