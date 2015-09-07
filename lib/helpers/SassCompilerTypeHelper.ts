import ISassCompilerTypeHelper = require("./ISassCompilerTypeHelper");

class SassCompilerTypeHelper<T> implements ISassCompilerTypeHelper<T> {

    private _type: T;

    public setType(value: T): void {
        this._type = value;
    }

    public getType(): T {
        return this._type;
    }

}

export = SassCompilerTypeHelper;