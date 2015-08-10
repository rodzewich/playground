/// <reference path="IReflection.ts" />

module xlib.reflection.methods {

  export enum Access {
    PUBLIC,
    PROTECTED,
    PRIVATE
  }

  export class Reflection implements IReflection {

    constructor(options?: IOptions) {
      if (options && xlib.typeOf(options.access)) {
        this.setAccess(options.access);
      }
    }

    private _name: string = null;
    public getName(): string {
      return this._name;
    }
    public setName(value: string): void {
      // todo: check value
      this._name = value;
    }

    public getParameters(): any {}

    private _access: Access = Access.PUBLIC;
    public getAccess(): Access {
      return this._access;
    }
    public setAccess(value: Access): void {
      // todo: check value
      this._access = value;
    }


    public isPrivate(): boolean {
      return this.getAccess() === Access.PRIVATE;
    }

    public isPublic(): boolean {
      return this.getAccess() === Access.PUBLIC;
    }

    public isProtected(): boolean {
      return this.getAccess() === Access.PROTECTED;
    }

  }

}