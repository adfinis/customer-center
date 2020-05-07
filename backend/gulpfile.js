import gulp from 'gulp'
import eslint from 'gulp-eslint'
import mocha from 'gulp-spawn-mocha'

let src = ['src/**/*.js', 'routes/**/*.js', 'middleware/*.js']

let testFiles = ['tests/helper.js', 'tests/**/*-test.js']

function test() {
  return gulp.src(testFiles).pipe(
    mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register'
    })
  )
}

function lint() {
  return gulp
    .src(src.concat(testFiles))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
}

function testWatch() {
  gulp.watch(src.concat(testFiles), test).on('error', console.error)
}

exports.test = gulp.series(lint, test)
exports.lint = lint
exports.travis = test
exports['test-watch'] = testWatch
