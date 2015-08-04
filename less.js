var less = require('less');

/*var options = {
    depends       : false,
    compress      : false,
    max_line_len  : -1,
    lint          : false,
    paths         : [],
    color         : true,
    strictImports : false,
    insecure      : false,
    rootpath      : '',
    relativeUrls  : false,
    ieCompat      : true,
    strictMath    : false,
    strictUnits   : false,
    globalVars    : null,
    modifyVars    : null,
    urlArgs       : '',
    plugins       : plugins
};*/


less.render('@import (less) "index.less"; .class { width: (1 + 1) }', {
    paths    : ['.', './lib'],  // Specify search paths for @import directives
    filename : 'style.less', // Specify a filename, for better error messages
    compress : true,          // Minify CSS output
    sourceMap: true,
    lint: true
}, function (error, result) {
    if (error) {
        console.log("error:", error);
    } else {
        console.log(result);
    }
});