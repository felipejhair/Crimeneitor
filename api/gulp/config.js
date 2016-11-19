module.exports = {
    watch: {
        js: [ './src/js/*.js' ],
        sass: [ './src/sass/*' ],
        html: [ './src/*.html' ],
        templates: [ './src/templates/**.html' ],
        all: [
            './src/*.html',
            './src/**/*.html',
            './src/js/*.js',
            './src/**/*.scss',
            './src/**/*.js'
        ]
    }
};
