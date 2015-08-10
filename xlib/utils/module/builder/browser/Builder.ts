/// <reference path="../Builder.ts" />
/// <reference path="./IBuilder.ts" />
/// <reference path="./IOptions.ts" />

import IBuilder = require("./IBuilder");
import IOptions = require("./IOptions");
import AbstractBuilder = require("../Builder");

class Builder extends AbstractBuilder implements IBuilder {

    constructor(options: IOptions) {
        super(options);
    }

}

export = Builder;
