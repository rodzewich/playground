/// <reference path="../../core.ts" />
/// <reference path="ISelect.ts" />

module xlib.utils.database.select {

  var keywords: string[] = [];

  export class Select implements ISelect {

    public field(name: string, alias?: string): ISelect {
      return this;
    }

    from(name: string, alias?: string): ISelect {
      return this;
    }

    join(type: string, table: any, ...condition: any[]): ISelect {
      return this;
    }

    where(type: string, action: string, ...items: any[]): ISelect {
      return this;
    }

    having(type: string, action: string, ...items: any[]): ISelect {
      return this;
    }

    group(name: string): ISelect {
      return this;
    }

    order(name: string, type?: string): ISelect {
      return this;
    }

    limit(count: number, offset?: number): ISelect {
      return this;
    }

    query(callback: (errors: Error[], result) => void): void {
    }


  }

}