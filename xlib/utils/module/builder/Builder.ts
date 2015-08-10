/// <reference path="./IBuilder.ts" />
/// <reference path="./IOptions.ts" />

import IBuilder = require("./IBuilder");
import IOptions = require("./IOptions");

class Builder extends IBuilder {

    constructor(options: IOptions) {
    }

    public transform(value: string): string {
        return String(value || "");
    }

}

export = Builder;
