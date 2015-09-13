import Compiler = require("../postcss/Compiler");
import IOptions = require("../postcss/IOptions");
import IPlugin = require("../postcss/plugins/IPlugin");
import IPostcssCompilerForPreProcessor = require("./IPostcssCompilerForPreProcessor");

class PostcssCompilerForPreProcessor extends Compiler implements IPostcssCompilerForPreProcessor {

    constructor(options?:IOptions) {
        super(options);
    }

    public getPlugins():IPlugin[] {
        return <IPlugin[]>[
            //this.getBemLinterPlugin(),
            this.getPseudoElementsPlugin(),
            this.getEpubPlugin(),
            this.getWillChangePlugin(),
            this.getAutoprefixerPlugin(),
            this.getCssgracePlugin(),
            this.getOpacityPlugin(),
            this.getVminPlugin(),
            this.getColorRgbaPlugin(),
            this.getPixremPlugin()
        ];
    }

}

export = PostcssCompilerForPreProcessor;

