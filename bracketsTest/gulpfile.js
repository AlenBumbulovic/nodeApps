var gulp = require('gulp');
var jsHint = require('gulp-jsHint');
var jscs = require('gulp-jscs');
var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    return gulp.src(jsFiles)
    .pipe(jsHint())
    .pipe(jsHint.reporter('jshint-stylish', {
        verbose: true
    }))
    .pipe(jscs());
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib'
    }
    
    return gulp.src('./src/views/*.html')
    pipe(wiredep(options))
    .pipe(gulp.dest('./src/views'));
})