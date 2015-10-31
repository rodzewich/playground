import UsedExtensionsHelper   = require("../../helpers/UsedExtensionsHelper");
import IIndexExtensionsHelper = require("./IIndexExtensionsHelper");

class IndexExtensionsHelper extends UsedExtensionsHelper implements IIndexExtensionsHelper {
    protected _extensions:string[] = ["htm", "html"];
}

export = IndexExtensionsHelper;
