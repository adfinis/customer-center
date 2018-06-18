import gulp from 'gulp'
import eslint from 'gulp-eslint'
import mocha from 'gulp-spawn-mocha'

let src = ['src/**/*.js', 'routes/**/*.js', 'middleware/*.js']

let testFiles = ['tests/helper.js', 'tests/**/*-test.js']

gulp.task('test', ['lint'], () => {
  return gulp.src(testFiles).pipe(
    mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register'
    })
  )
})

gulp.task('lint', () => {
  return gulp
    .src(src.concat(testFiles))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
})

gulp.task('travis', ['test'])

gulp.task('test-watch', ['test'], () => {
  gulp.watch(src.concat(testFiles), ['test']).on('error', console.error)
})
