var gulp = require('gulp');
var less = require('gulp-less');
var sourcemap = require('gulp-less-sourcemap');
var path = require('path');
var bs = require('browser-sync').create();

gulp.task('serve', function() {
    bs.init({
      server: {
          baseDir: "./src",
      },
      open: false,
      port: 4444,
      ui: {
        port: 5555
      },
      browser: ["google chrome", "firefox"]

    });

    gulp.watch("src/assets/less/**/*.less", ['less']);
    gulp.watch("src/*.html").on('change', bs.reload);
});

gulp.task('less', function () {
  return gulp.src('./src/assets/less/**/*.less')
    .pipe(less({
      sourceMap: {
        sourceMapRootpath: './src/assets/less/**/*.less' // Optional absolute or relative path to your LESS files
      }
    }))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(bs.stream());
});

gulp.task('default', ['serve']);
