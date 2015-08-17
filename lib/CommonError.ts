class CommonError extends Error {

    private _toString: string;

    constructor(options:any) {
        super();
        var property:string;
        if (options) {
            for (property in options) {
                if (options.hasOwnProperty(property)) {
                    this[property] = options[property];
                }
            }
        }
    }

    public toString(): string {
        return this._toString;
    }

    public static convertToObject(error: Error): any {
        var result: any = {},
            property: string;
        for (property in error) {
            if (error.hasOwnProperty(property)) {
                result[property] = error[property];
            }
        }
        result.name = error.name;
        result.stack = error['stack'];
        result._toString = error.toString();
        return result;
    }

}

export = CommonError;
