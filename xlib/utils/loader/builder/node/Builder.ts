/// <reference path="../Builder.ts" />
/// <reference path="./IBuilder.ts" />

import IBuilder = require("./IBuilder");
import AbstractBuilder = require("../Builder");

class Builder extends AbstractBuilder implements IBuilder {
}

export = Builder;
