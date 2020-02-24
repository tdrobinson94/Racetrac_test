'use strict';

const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        uglifycss = require('gulp-uglifycss'),
        browserSync = require('browser-sync').create(),
        browserify = require('browserify'),
        sourcemaps = require('gulp-sourcemaps'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        notify = require('gulp-notify'),
        chalk = require('chalk'),
        babel = require('babelify'),
        surge = require('gulp-surge'),
        { series, parallel } = require('gulp')


function handleError(err) {
  notify.onError("Doh! Check iTerm for details!")(err);
  console.log(chalk.white.bgRed(' <error> ------------------------ '));
  console.log(chalk.white(err.message));
  console.log(chalk.white.bgRed(' </error> ----------------------- '));
  this.emit('end');
}

// SASS to CSS
function scss() {
  //where is the sass file
  return gulp.src('./src/sass/*.scss')
    //pass the file through the compiler
    .pipe(sass.sync().on('error', sass.logError))
    //save the file at this location
    .pipe(gulp.dest('./app/css'))
    //Stream changes to all browserSync
    .pipe(browserSync.stream());
}

// Minify CSS
function css() {
  return gulp.src('./app/css/*.css')
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/'));
}

//Creates bundle js
function browserified() {
  return browserify('./src/js/main.js', {debug: true})
    .transform(babel)
    .bundle()
    .on('error', handleError)
    .pipe(source('./bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/js'))
}

//Watch event that also starts our server
function watch() {
  browserSync.init({
    server: './app',
    port: 8080,
    notify: false
  });
  gulp.watch('./src/sass/*.scss', scss);
  gulp.watch('./app/css/*.css', css);
  gulp.watch('./src/js/*.js', browserified);
  gulp.watch('./app/*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/*.js').on('change', browserSync.reload);

}


function deploy() {
  return surge({
    project: './app',
    domain: 'fast-gas-conv.surge.sh'
  })
}

//Declaring the tasks
exports.css = css;
exports.scss = scss;
exports.watch = watch;
exports.browserified = browserified;
exports.deploy = deploy;

exports.build = series(scss, parallel(browserified, watch));
