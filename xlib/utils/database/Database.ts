/// <reference path="IDatabase.ts" />

module xlib.utils.database {

  export class Database implements IDatabase {

    getNamespace(): string {return null;}
    setNamespace(value: string): void {}
    getTables(callback: (errors: Error[], tables: string[]) => void): void {}
    getViews(callback: (errors: Error[], views: string[]) => void): void {}


    remove(table: string, where?, callback: (errors?: Error[], count?: number) => void): void {}
    insert(table: string, data: any, callback: (errors?: Error[], count?: number) => void): void {}
    update(table: string, data: any, where?, callback: (errors?: Error[], count?: number) => void): void {}
    select(): void {}


  }

}
