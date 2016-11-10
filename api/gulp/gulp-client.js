var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    browsersync = require('browser-sync'),
    sass = require('gulp-sass'),
    config = require('./config');

gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: [ 'public' ]
        },
        port: 3000,
        files: [
            'public/js/*.js',
            'public/css/*.css',
            'public/images/**',
        ]
    });
});

gulp.task('browserify:sass', function() {
    return gulp
        .src(config.watch.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('browserify:templates', function() {
    return gulp
        .src(config.watch.templates)
        .pipe(gulp.dest('./public/templates'));
});

gulp.task('browserify:html', function() {
    return gulp
        .src(config.watch.html)
        .pipe(gulp.dest('./public'));
});

gulp.task('browserify:js', function() {
    return gulp.src(config.watch.js)
        .pipe(browserify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('browserify', [ 'browserify:templates', 'browserify:html', 'browserify:js', 'browserify:sass' ]);

gulp.task('watch:client', [ 'browsersync' ], function() {
    gulp.watch(config.watch.js, [ 'browserify:js' ]);
    gulp.watch(config.watch.sass, [ 'browserify:sass' ]);
    gulp.watch(config.watch.html, [ 'browserify:html' ] );
    gulp.watch(config.watch.templates, [ 'browserify:templates' ] );

    //gulp.watch(config.watch.all, [ 'browserify' ], function() {
    //    browsersync.reload();
    //});
});
