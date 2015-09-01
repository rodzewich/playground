/// <reference path="./ResourceLocation.ts" />
/// <reference path="./IWebRootDirectoryHelper.ts" />

import ResourceLocation = require("./ResourceLocation");
import IWebRootDirectoryHelper = require("./IWebRootDirectoryHelper");

class WebRootDirectoryHelper extends ResourceLocation implements IWebRootDirectoryHelper {
}

export = WebRootDirectoryHelper;