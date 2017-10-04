var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript-compile', function () {
    return gulp.src(['src/**/*'])
        .pipe(tsProject())
        .pipe(gulp.dest('build/'))
});

gulp.task('watch-typescript-compile', function () {
  return gulp.watch(['src/**/*'], ['typescript-compile'])
});