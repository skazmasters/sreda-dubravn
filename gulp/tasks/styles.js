$.sass.compiler = require('dart-sass');

module.exports = () => {
  const sheets = [
    { src: `./${$.config.sourcePath}/${$.config.stylesPath}/main.scss` },
    { src: `./${$.config.sourcePath}/${$.config.stylesPath}/uikit.scss` },
  ];

  $.gulp.task('styles', (done) => {
    if ($.config.cssMin && $.config.buildMode === 'prod') {
      sheets.map((file) => {
        return $.gulp.src([file.src])
          .pipe($.gulpPlugin.sass({
            importer: $.tildeImporter,
          }).on('error', $.gulpPlugin.sass.logError))
          .pipe($.gulpPlugin.autoprefixer())
          .pipe($.gulpPlugin.csso())
          .pipe($.cleanCSS(
            {
              level: {
                1: {
                  all: true,
                  normalizeUrls: false,
                },
                2: {
                  all: true,
                  removeUnusedAtRules: false,
                },
              },
              debug: true,
            },
            (details) => {
              console.log(`${details.name}: ${details.stats.originalSize}`);
              console.log(`${details.name}: ${details.stats.minifiedSize}`);
            }))
          .pipe($.gulpPlugin.rename({ extname: '.min.css' }))
          .pipe($.gulp.dest(`${$.config.outputPath}/css`))
          .pipe($.bs.reload({ stream: true }));
      });
      done();
    } else {
      sheets.map((file) => {
        return $.gulp.src([file.src])
          .pipe($.gulpPlugin.sourcemaps.init())
          .pipe($.gulpPlugin.sass({
            importer: $.tildeImporter,
          }).on('error', $.gulpPlugin.sass.logError))
          .pipe($.gulpPlugin.autoprefixer())
          .pipe($.gulpPlugin.csso())
          .pipe($.gulpPlugin.rename({ extname: '.min.css' }))
          .pipe($.gulpPlugin.sourcemaps.write())
          .pipe($.gulp.dest(`${$.config.outputPath}/css`))
          .pipe($.gulpPlugin.csslint('./config/.csslintrc'))
          .pipe($.bs.reload({ stream: true }));
      });
      done();
    }
  });
};
