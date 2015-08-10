module xlib.utils.database.literal {

  export interface ILiteral {
    new (value: any);
    toString(): string;
  }

}