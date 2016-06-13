/**
 * Created by pc-namdinh on 26/05/2016.
 */

//npm install gulp jshint gulp-jshint gulp-changed gulp-imagemin gulp-concat gulp-strip-debug gulp-uglify gulp-autoprefixer gulp-minify-css vinyl-source-stream --save-dev
//npm install --save-dev gulp-browserify babelify babel-preset-es2015 vinyl-buffer
//npm install --save-dev babel-preset-es2015-riot babel-plugin-external-helpers-2
//npm install --save-dev gulp-eslint babel-eslint gulp-sass browser-sync riotify browser-sync gulp-plumber gulp-sass riot


//npm uninstall node-tap --save-dev
// include plug-ins
var gulp = require('gulp');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var riotify = require('riotify');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');

var sourceFolder = "./src";
var distFolder = "./dist";
var jsWatch = [sourceFolder + '/js/lib/**/*.js', sourceFolder + '/js/pages/**/*.js',sourceFolder + '/tags/**/*.tag'];
var jsCurentFile = sourceFolder + '/js/pages/index2.js', jsCurentDistFile = 'index2';
var sassWath = [sourceFolder + '/sass/**/*.scss'];
var cssWath = [sourceFolder + '/css/**/*.css'];
var htmlWatch = [sourceFolder + '/views/**/*.html'];


//
gulp.task('browser-sync', [], function () {
    browserSync({
        //server: {
        //    basedir: distFolder
        //},
        proxy: 'http://localhost:63342',
        //opts: {
        //    //server: './src/',
        //    // proxy: 'localhost:3000',
        //    //port: 63342
        //},
        files:[distFolder+"/js/**/*.js",distFolder+"/css/*.css"],
        port:63343,
        browser: "google chrome",
        //watch: [
        //    jsWatch,
        //    htmlWatch,
        //    sassWath,
        //    cssWath
        //]
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(jsWatch, function () {
        gulp.run('eslint', 'browserifyRiotMulti');
    });
    gulp.watch(sassWath, ['stylesScss']);
    gulp.watch(cssWath, ['styles']);
});

// minify new images
gulp.task('imagemin', function () {
    var imgSrc = sourceFolder + '/img/**/*',
        imgDst = distFolder + '/img';
    console.log("imagemin....");
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// Browserify
gulp.task('browserifyRiotSingle', ['eslint'], function () {
    return browserify({
        debug: true,
        entries: [jsCurentFile]
    })
        .transform(babelify)
        .transform(riotify)
        .bundle()
        .pipe(source(jsCurentDistFile + '.js'))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest(distFolder + '/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(buffer())
        //.pipe(stripDebug())
        //.pipe(uglify())
        .pipe(gulp.dest(distFolder + '/js/'))
        .pipe(browserSync.reload({stream: true}))
});

// Browserify
gulp.task('browserifyRiotMulti', ['eslint'], function () {

    var files = [
        {path: jsCurentFile, bundleFile: jsCurentDistFile}
    ];

    var bundleThis = function (srcArray) {
        srcArray.forEach(function (item) {
            console.log(item);
            browserify({
                debug: true,
                entries: [item.path]
            })
                //.transform(babelify,{presets: ['es2015']})
                .transform(babelify)
                //.transform(riotify,{presets: ['es2015-riot']})
                .transform(riotify)
                .bundle()
                .pipe(source(item.bundleFile + '.js'))
                .pipe(plumber({
                    errorHandler: function (error) {
                        console.log(error.message);
                        this.emit('end');
                    }
                }))
                //.pipe(gulp.dest(distFolder + '/js/'))
                .pipe(rename({suffix: '.bundle'}))
                .pipe(buffer())
                //.pipe(stripDebug())
                //.pipe(uglify())
                .pipe(gulp.dest(distFolder + '/js/'))
                .pipe(browserSync.reload({stream: true})
            )
        });
    };
    // #4. copy the results to the build folder
    bundleThis(files);
});


gulp.task('jses6Combine', ["jshint"], function () {
    return browserify({
        entries: [sourceFolder + '/js/index1.js'],
        globals: false,
        debug: true
    })
        .transform(babelify, {presets: ['es2015']})
        .bundle()

        .on("error", function (err) {
            console.log("Error : " + err.message);
        })
        // .pipe(concat("all.js"))//Concatenate files into one deliverable.
        .pipe(source("index.bundle.js"))
        .pipe(buffer())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(distFolder + '/js/'));               // #4. copy the results to the build folder
});

gulp.task('jses6Multi', function () {
    var files = [
        // {path: sourceFolder+'/scripts/index.js',bundleFile:'index'},
        {path: sourceFolder + '/js/pages/index2.js', bundleFile: 'index2'}
    ];

    var bundleThis = function (srcArray) {
        srcArray.forEach(function (item) {
            console.log(item);
            browserify({
                entries: [item.path],
                globals: false,
                debug: true
            })
                .transform(babelify, {presets: ['es2015']})
                .on("error", function (err) {
                    console.log("Error : " + err.message);
                })
                .bundle()
                .pipe(source(item.bundleFile + ".bundle.js"))
                .pipe(buffer())
                //.pipe(stripDebug())
                //.pipe(uglify())
                .pipe(gulp.dest(distFolder + '/js/'));

        });
    };
    // #4. copy the results to the build folder
    bundleThis(files);
});


// CSS concat, auto-prefix and minify
gulp.task('styles', function () {
    gulp.src([sourceFolder + '/css/**/*.css'])
        // .pipe(concat('base.css'))
        .pipe(autoprefix('last 2 versions'))
        // .pipe(minifyCSS())
        .pipe(gulp.dest(distFolder + '/css/'));
});

// CSS concat, auto-prefix and minify
gulp.task('stylesScss', function () {
    gulp.src([sourceFolder + '/sass/mixins/**/*.scss'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        // .pipe(concat('base.css'))
        .pipe(sass())
        .pipe(autoprefix('last 2 versions'))
        .pipe(gulp.dest(distFolder + '/css/'))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(minifyCSS())
        .pipe(gulp.dest(distFolder + '/css/'))
        .pipe(browserSync.reload({stream: true}));
});

// Eslint
gulp.task('eslint', function () {
    return gulp.src([sourceFolder + '/js/lib/**/*.js', sourceFolder + '/js/pages/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

// Eslint
gulp.task('eslintCurent', function () {
    return gulp.src([jsCurentFile])
        .pipe(eslint())
        .pipe(eslint.format());
});

// JS hint task
gulp.task('jshint', function () {
    // gulp.src(sourceFolder+'/scripts/**/*.js')
    return gulp.src([sourceFolder + '/js/lib/**/*.js', sourceFolder + '/js/pages/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


