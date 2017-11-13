import gulp from 'gulp'
import eslint from 'gulp-eslint'
import mocha from 'gulp-spawn-mocha'
//import istanbul from 'gulp-istanbul'
// import coverageEnforcer from 'gulp-istanbul-enforcer'

let src = ['src/**/*.js', 'routes/**/*.js', 'middleware/*.js']

let testFiles = ['tests/helper.js', 'tests/**/*-test.js']

//gulp.task('pre-test', function() {
//return gulp
//.src(['src/**/*.js'])
//.pipe(istanbul())
//.pipe(istanbul.hookRequire())
//})

gulp.task('test', ['lint'], () => {
  return gulp.src(testFiles).pipe(
    mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register'
    })
  )
  //.pipe(istanbul.writeReports())
  //.pipe(coverageEnforcer({
  //  thresholds: {
  //    statements: 100
  //  , branches:   100
  //  , lines:      100
  //  , functions:  100
  //  }
  //, coverageDirectory: 'coverage'
  //, rootDirectory:     ''
  //}))
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
