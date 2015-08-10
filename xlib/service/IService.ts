module xlib.service {

  export interface IService {
    call(callback?: (errors?: Error[], response?: any) => void): void;
  }

}