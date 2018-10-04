'use strict';

const gulp = require('gulp');
const gulp_base = require('./gulpfile-base');
const del = require('del');

gulp.task("tsc", gulp_base.tsc);

gulp.task('clean', () => {
  return del(['index.js', 'index.d.ts', 'index.js.map']);
});

gulp.task('default', gulp.series('clean', 'tsc'));
gulp.task('release', gulp.series('default'));
