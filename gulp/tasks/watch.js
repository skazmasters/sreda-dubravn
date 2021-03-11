module.exports = () => {
  $.gulp.task('watch', () => {
    $.gulp.watch([
        `${$.config.sourcePath}/${$.config.stylesPath}/**/*.{scss, sass, css}`,
      ],
      $.gulp.series('styles'),
    );
    $.gulp.watch([
        `${$.config.sourcePath}/${$.config.scriptsPath}/**/*.js`,
      ],
      $.gulp.series('scripts'),
    );
    $.gulp.watch([
        `${$.config.sourcePath}/${$.config.hbsPath}/**/*`,
        `${$.config.sourcePath}/${$.config.dbPath}/db.json`,
      ],
      $.gulp.series(['hbs', 'prepareHtmlDev']),
    );
    $.gulp.watch([
        `${$.config.sourcePath}/${$.config.svgPath}/*.svg`,
      ],
      $.gulp.series('svg:sprite'),
    );
    $.gulp.watch([
        `${$.config.sourcePath}/${$.config.svgInlinePath}/*.svg`,
      ],
      $.gulp.series('svg:inline'),
    );
    // $.gulp.watch([
    //     `${$.config.sourcePath}/${$.config.pngPath}/*.png`,
    //   ],
    //   $.gulp.series('png:sprite'),
    // );
    $.gulp.watch([
        `${$.config.sourcePath}/${$.config.assetsPath}/**/*`,
        `!${$.config.sourcePath}/${$.config.assetsPath}/svg`,
        `!${$.config.sourcePath}/${$.config.assetsPath}/svg/**/*`,
      ],
      $.gulp.series('assets'),
    );
  });
};
