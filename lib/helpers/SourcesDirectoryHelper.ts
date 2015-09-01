/// <reference path="./ResourceLocation.ts" />
/// <reference path="./ISourcesDirectoryHelper.ts" />

import ResourceLocation = require("./ResourceLocation");
import ISourcesDirectoryHelper = require("./ISourcesDirectoryHelper");

class SourcesDirectoryHelper extends ResourceLocation implements ISourcesDirectoryHelper {
}

export = SourcesDirectoryHelper;