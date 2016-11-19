var gulp = require('gulp'),
    requireDir = require('require-dir');

requireDir('./gulp', { recurse: true });

gulp.task('default', [ 'browserify', 'watch:client' ]);
