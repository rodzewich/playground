/// <refactor path="IInterface.ts" />

module tools.generator.interfaces {

  class Interface implements IInterface {
  }

  export function create(): IInterface {
    return new Interface();
  }

}