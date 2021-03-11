module.exports = () => {
  $.gulp.task('webp', () => {
    if (!$.config.buildWebp) return $.gulp.src('.', {allowEmpty: true});

    return $.gulp.src([`${$.config.sourcePath}/${$.config.assetsPath}/images/**/*`,])
      .pipe($.webp({quality: 100}))
      .pipe($.gulp.dest(`${$.config.outputPath}/${$.config.assetsPath}/images`));
  });
};
