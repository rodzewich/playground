module xlib.utils.storage {

  export interface IStorage {
    clear(callback?: (errors?: Error[]) => void): void;
    getKeys(callback?: (errors?: Error[], keys?: string[]) => void): void;
    setItem(key: string, value: any, ttl: number, callback?: (errors?: Error[]) => void): void;
    setItems(values: any, ttl: number, callback?: (errors?: Error[]) => void): void;
    getItem(key: string, callback?: (errors?: Error[], value?: any) => void): void;
    getItems(keys: string[], callback?: (errors?: Error[], values?: any) => void): void;
    hasItem(key: string, callback?: (errors?: Error[], resolve?: boolean) => void): void;
    hasItems(keys: string[], callback?: (errors?: Error[], resolve?: boolean) => void): void;
    removeItem(key: string, callback?: (errors?: Error[]) => void): void;
    removeItems(keys: string[], callback?: (errors?: Error[]) => void): void;
    setNamespace(value: string): void;
    getNamespace(): string;
    setRevision(value: string): void;
    getRevision(): string;
    setExpire(value: number): void;
    getExpire(): number;
  }

}