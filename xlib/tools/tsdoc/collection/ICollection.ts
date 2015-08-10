module xlib.tools.tsdoc.collection {

  export interface ICollection {
    getPackages();
    getClasses();
    getInterfaces();
    getVariables();
    getConstants();
    getEnums();
  }

}
