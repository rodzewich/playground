/// <reference path="IParser.ts" />
/// <reference path="IOptions.ts" />
/// <reference path="IFunction.ts" />
/// <reference path="IClass.ts" />
/// <reference path="IInterface.ts" />
/// <reference path="IVariable.ts" />
/// <reference path="IConstant.ts" />
/// <reference path="IEnum.ts" />
/// <reference path="../../../utils/deferred/IAction.ts" />
/// <reference path="../../../defs/node.d.ts" />

module xlib.tools.tsdoc.parser {

  import deferred = xlib.utils.deferred;

  export class Parser implements IParser {
    protected _functions: parser.IFunction[] = [];
    protected _classes: parser.IClass[] = [];
    protected _interfaces: parser.IInterface[] = [];
    protected _variables: parser.IVariable[] = [];
    protected _constants: parser.IConstant[] = [];
    protected _enums: parser.IEnum[] = [];
    protected _filename: string = null;
    protected _references: string[] = [];
    protected _encoding: string = 'utf8';
    constructor(filename: string, options?: IOptions) {
      this._filename = String(filename || '');
      if (options && xlib.typeOf(options.encoding) !== 'undefined') {
        this.setEncoding(options.encoding);
      }
    }
    public getFilename(): string {
      return this._filename;
    }
    public getEncoding(): string {
      return this._encoding || null;
    }
    public setEncoding(value: string): void {
      // todo: check value
      this._encoding = value || null;
    }
    public getReferences(): string[] {
      return this._references.slice(0);
    }
    public getFunctions(): parser.IFunction[] {
      return this._functions.slice(0);
    }
    public getClasses(): parser.IClass[] {
      return this._classes.slice(0);
    }
    public getInterfaces(): parser.IInterface[] {
      return this._interfaces.slice(0);
    }
    public getVariables(): parser.IVariable[] {
      return this._variables.slice(0);
    }
    public getConstants(): parser.IConstant[] {
      return this._constants.slice(0);
    }
    public getEnums(): parser.IEnum[] {
      return this._enums.slice(0);
    }
    public parse(callback?: (errors?: Error[]) => void): void {
      var content: string;
      deferred
        .create()
        .add(<deferred.IAction>(() => {
          fs.readFile(this.getFilename(), {encoding: this.getEncoding()}, (error: NodeJS.ErrnoException, buffer: string) => {
            if (error) {
              callback([error]);
            } else {
              content = String(buffer || '');
            }
          });
        }))
        .run((errors?: Error[]) => {
          callback(errors && errors.length ? errors : null);
        });
    }
  }

}