module tools.generator.functions {

  import arguments = generator.arguments;

  class Function implements IFunction {

    private _name: string;

    private _type: string;

    private _arguments: arguments.IArgument[] = [];

  }

}