/// <reference path="ICondition.ts" />
/// <reference path="Type.ts" />

module xlib.utils.database.condition {

  export class Condition /*implements ICondition*/ {

    private _type: condition.Type = null;

    public getType(): condition.Type {
      return this._type
    }
    public setType(value: any): void {
      var temp: string = String(value || ''),
        keys: string[] = Object.keys(condition.Type);
      if (keys.indexOf(temp) === -1) {
        throw new Error('bla bla bla');
      }
      if (/^\d+$/.test(temp)) {
        this._type = parseInt(temp, 10);
      } else {
        this._type = condition.Type[temp];
      }
    }
    constructor(type: any, ...args: string[]) {
      this.setType(type);

    }

    toString(): string {
      return '-- SQL CONDITION';
    }

  }

}