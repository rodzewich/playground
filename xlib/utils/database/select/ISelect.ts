module xlib.utils.database.select {

  export interface ISelect {
    field(name: string, alias?: string): ISelect;
    from(name: string, alias?: string): ISelect;
    join(type: string, table: string, ...condition: any[]): ISelect;
    join(type: string, table: string[], ...condition: any[]): ISelect;
    where(type: string, action: string, ...items: any[]): ISelect;
    having(type: string, action: string, ...items: any[]): ISelect;
    group(name: string): ISelect;
    order(name: string, type?: string): ISelect;
    limit(count: number, offset?: number): ISelect;
    query(callback: (errors: Error[], result) => void): void;
  }

}
