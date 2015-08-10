module xlib.utils.database.condition {

  export enum Action {
    EQUAL,
    NOT_EQUAL,
    LESS_THAN,
    GREATER_THAN,
    LESS_THAN_OR_EQUAL,
    GREATER_THAN_OR_EQUAL,
    BETWEEN,
    IS_NULL,
    IS_NOT_NULL,
    IS_TRUE,
    IS_NOT_TRUE,
    IS_FALSE,
    IS_NOT_FALSE
  }

}