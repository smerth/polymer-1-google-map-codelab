var gulp = require("gulp"),
    deploy = require('gulp-gh-pages');

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./build/bundled/**/*")
    .pipe(deploy())
});