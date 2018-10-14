'use strict';

const gulp = require('gulp');
const gSass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const SASS_DIR = './scss';
const SASS_FILES_RE = SASS_DIR + '/**/*.scss';

const CSS_DIR = './css';
const CSS_FILES_RE = CSS_DIR + '/*.css';
const CSS_NONMIN_FILES_RE = '!' + CSS_DIR + '/*.min.css';


// SASS
gulp.task('sass:compile', function() {
    return gulp.src(SASS_FILES_RE)
        .pipe(gSass().on('error', gSass.logError))
        .pipe(gulp.dest(CSS_DIR));
});

gulp.task('sass:minify', ['sass:compile'], function() {
    return gulp.src([ CSS_FILES_RE, CSS_NONMIN_FILES_RE ])
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(CSS_DIR));
});


gulp.task('sass', ['sass:minify', 'sass:compile']);

gulp.task('sass:watch', function() {
    gulp.watch(SASS_FILES_RE, ['sass']);
});


// WATCH
gulp.task('watch', ['sass:watch']);


// DEFAULT
gulp.task('default', ['sass']);