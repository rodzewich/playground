module xlib.utils.dependency {

  export interface ICallback {
    (error: (message: string) => void, success: (instance: any) => void): void;
    (error: (message: string[]) => void, success: (instance: any) => void): void;
    (error: (message: Error) => void, success: (instance: any) => void): void;
    (error: (message: Error[]) => void, success: (instance: any) => void): void;
  }

}
