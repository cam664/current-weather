var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    /*imagemin = require('gulp-imagemin'),*/
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer');

gulp.task('scripts', function(){
    gulp.src('process/js/*.js')
    .pipe(plumber())//stops gulp from cancelling watch cmd on syntax error
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/js'));
});

//Compress all images in img dir
/*gulp.task('image', function(){
    gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/'))
});*/

gulp.task('styles', function(){
    gulp.src('process/scss/**/*.scss')//find all .scss files in scss folder
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(prefix('> 5%'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/css/'))
});

//Watch Task
gulp.task('watch', function(){
    gulp.watch('process/js/*.js', ['scripts']);//watch .js files in js folder for changes, on change run task 'scripts'
    gulp.watch('process/scss/**/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);//default task. Run by typing 'gulp' in node terminal.