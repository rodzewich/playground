interface ISassCompilerTypeHelper<T> {
    setType(value:T): void;
    getType(): T;
}

export = ISassCompilerTypeHelper;
