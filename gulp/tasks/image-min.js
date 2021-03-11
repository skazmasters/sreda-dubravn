module.exports = () => {
  $.gulp.task('imageMin', () => {
    if (!$.config.imageMin) return $.gulp.src('.', {allowEmpty: true});

    return $.gulp.src(`${$.config.outputPath}/${$.config.imagesPath}/**/*.{png,jpg,gif}`)
      .pipe($.gulpPlugin.imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
      }))
      .pipe($.gulp.dest(`${$.config.outputPath}/${$.config.imagesPath}`));
  });
};
