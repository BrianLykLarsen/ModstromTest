var notifier = require('node-notifier');
var argv = require('yargs').argv;

module.exports = (function () {
    var projectName = "novicell-gulp";

    var projectPath = "./";
    var bowerPath = projectPath + "vendor/bower";
    var distPath = projectPath + "dist";

    var cleanPaths = [distPath];

    var debug = true;

    return {
        debug: (argv.debug !== undefined ? argv.debug.toLowerCase() == "true" : debug),

        errorHandler: function(taskName)
        {
            return function (e) {
                notifier.notify({
                    "title": taskName,
                    "message": "An error occured in the " + e.plugin + " plugin."
                });
                console.log(e.message);
                this.emit("end");
            };
        },

        bowerPath: bowerPath,
        cleanPaths: cleanPaths,

        loadTasks: [
            "styles", "scripts",
            "watch", "build"
        ],
        buildTasks: [
            "styles", "scriptsAll"
        ],

        // ------------- Scripts -------------
        scriptsDist: distPath + "/scripts",

        // ------------- Icons ---------------
        iconsDist: distPath,
        spriteConfig: {
            shape : {
                // Set maximum dimensions
                dimension       : {
                    maxWidth    : 32,
                    maxHeight   : 32
                }
            },
            mode : {
                view : {
                    bust : false,
                    render : {
                        less : true
                    },
                    dest : 'icons',
                    sprite : 'icons-css.svg'
                },
                symbol : {
                    dest : 'icons',
                    sprite : 'icons.svg'
                }
            }
        },

        // ------------- Fonts -------------
        fontsDist: distPath + "/fonts",

        // ------------- Styles -------------
        stylesDist: distPath + "/css",
        stylesVendorPrefixes: [
            "last 2 version",
            "safari 5",
            "ie 8",
            "ie 9",
            "opera 12.1",
            "ios 6",
            "android 4"
        ],

        // ------------- Images -------------
        imagesDist: distPath + "/images",
        imagesOptimizationLevel: 5,
        imagesProgressive: true,
        imagesInterlaced: true,

        // ------------- Livereload -------------
        livereloadPort: 35729,
        livereloadPaths: [
            projectPath + "dist/scripts/*.js",
             projectPath + "dist/css/*.css"
            //"..**/*.{cshtml,xslt,html}"
        ],

        // ------------- Watch -------------
        watchImages: [projectPath + "images/*"],
        watchIcons: [projectPath + "images/icons/*"],
        watchFonts: [projectPath + "fonts/*"],
        watchScripts: [
            projectPath + "scripts/**/*.js",
            projectPath + "vendor/**/*.js"
        ],
        watchStyles: [
            projectPath + "less/**/*.less",
            projectPath + "vendor/**/*.less"
        ],

        // ------------- Copy on build -------------
        buildCopy: [{
            from: projectPath + "fonts/**/*",
            to: distPath  + "/fonts"
        }],

        // ------------- Bundles -------------
        bundles: [{
            name: "vendor",
            ignorePlugins: ["jscs", "jshint"],
            scripts: [
                projectPath + "Scripts/jquery-1.11.0.js",
                projectPath + "Scripts/libs/modernizr.custom.js",
                projectPath + "Scripts/libs/novicell.responsive.js",
                projectPath + "Scripts/libs/jquery.cookie.js",
                projectPath + "Scripts/libs/novicell.cookieinfo.js",
                projectPath + "Scripts/libs/parsley/jquery.parsley.js",              
                projectPath + "Scripts/libs/flexslider/jquery.flexslider.js",
                projectPath + "Scripts/libs/fancybox/jquery.fancybox.js", 
                // projectPath + "Scripts/libs/perfect-scrollbar/jquery.perfect-scrollbar.js",
                projectPath + "Scripts/libs/simple-pagination/jquery.simple-pagination.js",
                projectPath + "Scripts/libs/novicell.js"
            ]
        },
        {
            name: "master",
            ignorePlugins: ["jscs", "jshint"],
            styles: [projectPath + "less/master.less"],
            scripts: [
                projectPath + "Scripts/master.js"
            ]
        }]
    }
})();




