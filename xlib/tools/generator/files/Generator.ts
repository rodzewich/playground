/// <reference path="IGenerator.ts" />
/// <reference path="../Generator.ts" />
/// <reference path="../enums/IGenerator.ts" />
/// <reference path="../enums/Generator.ts" />
/// <reference path="../classes/IGenerator.ts" />
/// <reference path="../classes/Generator.ts" />
/// <reference path="../interfaces/IGenerator.ts" />
/// <reference path="../interfaces/Generator.ts" />
/// <reference path="../functions/IGenerator.ts" />
/// <reference path="../functions/Generator.ts" />
/// <reference path="../modules/IGenerator.ts" />
/// <reference path="../modules/Generator.ts" />

module tools.generator.files {

  import enums    = generator.enums;
  import classes  = generator.classes;
  import modules  = generator.modules;
  import functions  = generator.functions;
  import interfaces = generator.interfaces;

  export class Generator implements IGenerator {

    private _comments: string[] = [];

    private _enums: enums.Generator[] = [];

    private _classes: classes.Generator[] = [];

    private _interfaces: interfaces.Generator[] = [];

    private _functions: functions.Generator[] = [];

    private _modules: modules.Generator[] = [];

    public addComment(value: any): Generator {
      return this;
    }

    public getComments(): string[] {
      return this._comments.slice(0);
    }

    public addEnum(value: enums.Generator): Generator {
      return this;
    }

    public getEnums(): enums.Generator[] {
      return this._enums.slice(0);
    }

    public addClass(value: classes.Generator): Generator {
      return this;
    }

    public getClasses(): classes.Generator[] {
      return this._classes.slice(0);
    }

    public addInterface(value: interfaces.Generator): Generator {
      return this;
    }

    public getInterfaces(): interfaces.Generator {
      return this._interfaces.slice(0);
    }

    public addFunction(value: functions.Generator): Generator {
      return this;
    }

    public getFunctions(): functions.Generator[] {
      return this._functions.slice(0);
    }

    public addModule(value: modules.Generator): Generator {
      return this;
    }

    public getModules(): modules.Generator[] {
      return this._modules.slice(0);
    }

    public getLines(): string[] {
      return [];
    }

    public toString(): string {
      return this.getLines().join('\n');
    }

  }

  export function create(): Generator {
    return new Generator();
  }

}