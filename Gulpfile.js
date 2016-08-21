const gulp = require('gulp');
const eslint = require('gulp-eslint');
const isparta = require('isparta');
const mocha = require('gulp-mocha');
const plumber = require('gulp-plumber');
const istanbul = require('gulp-istanbul');

gulp.task('pre-test', () => gulp
  .src(['src/**/*.js', '!tests/**/*'])
  .pipe(istanbul({instrumenter: isparta.Instrumenter}))
  .pipe(istanbul.hookRequire())
);

gulp.task('test', ['pre-test'], () => gulp
  .src('tests/**/*.js', {read: false})
  .pipe(plumber())
  .pipe(mocha({
    ui: 'bdd',
    reporter: 'spec'
  }))
  .pipe(istanbul.writeReports())
  .pipe(istanbul.enforceThresholds({
    thresholds: {global: 10}
  }))
);

gulp.task('test-tdd', () => gulp
  .src('tests/**/*.js', {read: false})
  .pipe(plumber({errorHandler() {
    this.emit('end');
  }}))
  .pipe(mocha({
    ui: 'bdd',
    reporter: 'spec'
  }))
);

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js','!node_modules/**', '!coverage/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('start', ['test-tdd'], () => gulp
  .watch(['src/**/*.js', 'tests/**/*.js'], ['test-tdd'])
);

gulp.task('precommit', ['lint', 'test']);
