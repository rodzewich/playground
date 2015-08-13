module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-tsc");

    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        tsc : {
            options : {},
            test    : {
                options : {
                    target      : "es5",
                    module      : "commonjs",
                    declaration : false,
                    comments    : false,
                    sourcemap   : false,
                    implicitAny : true,
                    preserveConstEnums : true
                },
                files : [
                    {
                        expand : true,
                        dest   : "server",
                        cwd    : "lib/compiler",
                        ext    : ".js",
                        src    : [
                            "*.ts",
                            "!*.d.ts",
                            "**/*.ts",
                            "!**/*.d.ts"
                        ]
                    }
                ]
            }
        }
    });

};