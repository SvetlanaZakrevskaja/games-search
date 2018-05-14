'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify');

//js files to watch
var jsFiles = ['./*.js', '!Gulpfile.js'],
    jsDest = 'compiled/';

gulp.task('greet', function () {
    console.log("\x1b[33m%s\x1b[0m" ,"(: You can write js code now, happy styling :)");
});

gulp.task('js', function () {
    gulp.src(jsFiles)
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('js:watch', ['greet'], function () {
    gulp.watch(jsFiles, ['js']);
});

gulp.task('clean', function() {
    return gulp.src('compiled', {read: false})
        .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('js');
});