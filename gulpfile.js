'use strict';

global.$ = {
  cleanCSS: require('gulp-clean-css'),
  gulp: require('gulp'),
  gulpPlugin: require('gulp-load-plugins')(),
  sass: require('gulp-sass'),
  rename: require('gulp-rename'),
  webp: require('gulp-webp'),
  bs: require('browser-sync'),
  fs: require('fs'),
  glob: require('glob'),
  del: require('del'),
  path: require('path'),
  tasks: require('./gulp/tasks.js'),
  merge: require('merge-stream'),
  argv: require('yargs').argv,
  tildeImporter: require('node-sass-tilde-importer'),
  webpack: require('webpack'),
  webpackStream: require('webpack-stream'),
  webpackTerser: require('terser-webpack-plugin'),
};

$.config = JSON.parse($.fs.readFileSync('./config/config.json', 'utf8'));
$.config.buildMode = $.argv._[0].match(/build|build-prod/) ? 'prod' : 'dev';
$.config.outputPath = $.config.buildMode === 'prod' ? $.config.destPath : $.config.tmpPath;

// if ($.config.criticalCss) $.critical = require('critical').stream;

$.tasks.forEach((taskPath) => require(taskPath)());

$.gulp.task('dev', done => {
  $.gulp.series('clean',
    $.gulp.parallel('styles', 'scripts'),
    $.gulp.parallel('hbs', 'svg:sprite', 'svg:inline', 'assets'),
    $.gulp.parallel('prepareHtmlDev', 'webp'),
    $.gulp.parallel('watch', 'serve'),
  )(done);
});

$.gulp.task('build', done => {
  $.gulp.series('clean',
    $.gulp.parallel('styles', 'scripts'),
    $.gulp.parallel('hbs', 'svg:sprite', 'svg:inline', 'assets'),
    // $.gulp.parallel('imageMin', 'criticalCss'),
    $.gulp.parallel('prepareHtmlBuild', 'webp'),
    $.gulp.parallel('meta'),
  )(done);
});

$.gulp.task('build-prod', done => {
  $.gulp.series('clean',
    $.gulp.parallel('styles', 'scripts'),
    $.gulp.parallel('hbs-prod', 'svg:sprite', 'svg:inline', 'assets'),
    $.gulp.parallel('prepareHtmlProd', 'webp'),
    // $.gulp.parallel('sitemap'),
    // $.gulp.parallel('imageMin', 'criticalCss'),
  )(done);
});
