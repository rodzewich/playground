import Compiler = require("../../helpers/PostcssCompilerForPreProcessor");
import IPostcss = require("./IPostcss");

class Postcss extends Compiler implements IPostcss {
}

export = Postcss;
