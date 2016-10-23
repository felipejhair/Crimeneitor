var gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function() {
    gulp.src([ 'test/user.js' ])
        .pipe(mocha())
        .on('error', function(err) {
            this.emit('end');
        });
});

gulp.task('watch', function() {
    gulp.watch([
            './schema/models.js',
            './schema/user.js',
            './test/user.js'
    ], [ 'test' ]);
});

gulp.task('default', [ 'test', 'watch' ]);