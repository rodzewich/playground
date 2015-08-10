module xlib.utils.service.transport.ajax {

  export enum State {
    UNSENT = 0,
    OPENED = 1,
    HEADERS_RECEIVED = 2,
    LOADING = 3,
    DONE = 4
  }

}