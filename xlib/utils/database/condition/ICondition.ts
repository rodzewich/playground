module xlib.utils.database.condition {

  export interface ICondition {
    getType(): condition.Type;
    setType(value: any): void;
    new (type: any, ...args: string[]);
  }

}