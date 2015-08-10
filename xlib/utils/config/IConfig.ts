module xlib.utils.config {

  export interface IConfig {

    getValue(key: string, callback: (errors: Error[], value: any) => void): void;
    existsValue(key: string, callback: (errors: Error[], exists: boolean) => void): void;

  }

}