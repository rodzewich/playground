module xlib.utils.loader.transport {

  export interface IUsedCache {
    getUseCache(): boolean;
    isUseCache(): boolean;
    setUseCache(value: any): void;
  }

}