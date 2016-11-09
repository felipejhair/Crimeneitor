var gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function() {
    gulp.src([ 'test/user.js' ])
        .pipe(mocha())
        .on('error', function(err) {
            console.log('Error on user test !!!');
        });
});

gulp.task('test:incident', function() {
    gulp.src([ 'test/incident.js' ])
        .pipe(mocha())
        .on('error', function(error) {
            console.log('Error on incident test !!!');
        });
});

gulp.task('test:upload', function() {
    gulp.src([ 'test/upload.js' ])
        .pipe(mocha())
        .on('error', function(error) {
            console.log('Error on upload test !!!');
        });
});

gulp.task('watch', function() {
    gulp.watch([
            './schema/models.js',
            './schema/user.js',
            './test/user.js'
    ], [ 'test' ]);

    gulp.watch([
        './schema/incident.js',
        './test/incident.js'
    ], [ 'test:incident' ]);

    gulp.watch([
        './test/upload.js',
        './api.js'
    ], [ 'test:upload' ]);
});

gulp.task('default', [ 'test', 'watch' ]);
