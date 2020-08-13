import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-spawn-mocha';

let src = ['app/**/*.js'];

let testFiles = ['tests/helper.js', 'tests/**/*-test.js'];

function test() {
  return gulp.src(testFiles).pipe(
    mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register'
    })
  );
}

function lint() {
  return gulp
    .src(src.concat(testFiles))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
}

function testWatch() {
  gulp.watch(src.concat(testFiles), test).on('error', console.error);
}

gulp.task('test', gulp.series(lint, test));
gulp.task('lint', lint);
gulp.task('travis', test);
gulp.task('test-watch', testWatch);
