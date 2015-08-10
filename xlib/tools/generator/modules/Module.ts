/// <reference path="IGenerator.ts" />
/// <reference path="../enums/IGenerator.ts" />
/// <reference path="../enums/Generator.ts" />
/// <reference path="../classes/IClass.ts" />
/// <reference path="../classes/Class.ts" />
/// <reference path="../interfaces/IGenerator.ts" />
/// <reference path="../interfaces/Generator.ts" />
/// <reference path="../functions/IGenerator.ts" />
/// <reference path="../functions/Generator.ts" />

module tools.generator.modules {

  import enums = generator.enums;
  import classes = generator.classes;
  import interfaces = generator.interfaces;
  import functions = generator.functions;

  export class Module implements IModule {

    private _name: string;

    private _enums: enums.Generator[];

    private _classes: classes.IClass[];

    private _interfaces: interfaces.Generator[];

    private _functions: functions.Generator[];

    private _modules: Generator[];

    public getName(): string {
      return this._name || '';
    }

    public setName(value: any): Generator {
      // todo: check value
      this._name = value;
      return this;
    }

    public addEnum(value: enums.Generator): Generator {
      if (!this._enums) {
        this._enums = [];
      }
      if (!(value instanceof enums.Generator)) {
        throw new Error('bla bla bal');
      }
      var index: number,
        length: number = this._enums.length;
      for (index = 0; index < length; index++) {
        if (this._enums[index].getName() === value.getName()) {
          throw new Error('bla bla bla');
        }
      }
      this._enums.push(value);
      return this;
    }

    public getEnums(): enums.Generator[] {
      if (!this._enums) {
        this._enums = [];
      }
      return this._enums.slice(0);
    }

    public addClass(value: classes.Generator): Generator {
      if (!this._classes) {
        this._classes = [];
      }
      if (!(value instanceof classes.Generator)) {
        throw new Error('bla bla bal');
      }
      var index: number,
        length: number = this._classes.length;
      for (index = 0; index < length; index++) {
        if (this._classes[index].getName() === value.getName()) {
          throw new Error('bla bla bla');
        }
      }
      this._classes.push(value);
      return this;
    }

    public getClasses(): classes.Generator[] {
      if (!this._classes) {
        this._classes = [];
      }
      return this._classes.slice(0);
    }

    public addInterface(value: interfaces.Generator): Generator {
      if (!this._interfaces) {
        this._interfaces = [];
      }
      if (!(value instanceof interfaces.Generator)) {
        throw new Error('bla bla bal');
      }
      var index: number,
        length: number = this._interfaces.length;
      for (index = 0; index < length; index++) {
        if (this._interfaces[index].getName() === value.getName()) {
          throw new Error('bla bla bla');
        }
      }
      this._interfaces.push(value);
      return this;
    }

    public getInterfaces(): interfaces.Generator[] {
      if (!this._interfaces) {
        this._interfaces = [];
      }
      return this._interfaces.slice(0);
    }

    public addFunction(value: functions.Generator): Generator {
      if (!this._functions) {
        this._functions = [];
      }
      if (!(value instanceof functions.Generator)) {
        throw new Error('bla bla bal');
      }
      var index: number,
        length: number = this._functions.length;
      for (index = 0; index < length; index++) {
        if (this._functions[index].getName() === value.getName()) {
          throw new Error('bla bla bla');
        }
      }
      this._functions.push(value);
      return this;
    }

    public getFunctions(): functions.Generator[] {
      if (!this._functions) {
        this._functions = [];
      }
      return this._functions.slice(0);
    }

    public addModule(value: Generator): Generator {
      if (!this._modules) {
        this._modules = [];
      }
      if (!(value instanceof functions.Generator)) {
        throw new Error('bla bla bal');
      }
      var index: number,
        length: number = this._modules.length;
      for (index = 0; index < length; index++) {
        if (this._modules[index].getName() === value.getName()) {
          throw new Error('bla bla bla');
        }
      }
      this._modules.push(value);
      return this;
    }

    public getModules(): Generator[] {
      if (!this._modules) {
        this._modules = [];
      }
      return this._modules.slice(0);
    }

  }

}