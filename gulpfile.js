const gulp = require('gulp')
const minifyCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const gp_concat = require('gulp-concat')
const gp_rename = require('gulp-rename')
const gp_uglify = require('gulp-uglify')
const clean = require('gulp-clean')

gulp.task('css', function(){
    return gulp.src(
            [
                './public/css/animate.css',
                './public/css/icomoon.css',
                './public/css/bootstrap.css',
                './public/css/flexslider.css',
                './public/css/font-awesome.min.css',
                './public/css/owl.carousel.min.css',
                './public/css/owl.theme.default.min.css',
                './public/css/style.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

/*
// When using a theme, usuually there is a fonts
// directory that should be copied to dist
gulp.task('copy-fonts', function(){
    return gulp.src(
            [
                './public/fonts/**'
            ]
        )
        .pipe(gulp.dest('./public/dist/fonts/'))
})
*/

gulp.task('style', ['css'], function(){})

// Add javascript files here
gulp.task('vendor', function(){
    return gulp.src(
            [
                './public/js/jquery.min.js',
                './public/js/jquery.easing.1.3.js',
                './public/js/bootstrap.min.js',
                './public/js/jquery.waypoints.min.js',
                './public/js/jquery.flexslider-min.js',
                './public/js/owl.carousel.min.js',
                './public/js/jquery.countTo.js',
                './public/js/modernizr-2.6.2.min.js',
                './public/js/main.js',
                './public/js/subscribers.js'
            ]
        )
        .pipe(gp_concat('vendor.min.js'))
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/js/'))
});

gulp.task('js', ['vendor'], function(){})

gulp.task('prod', ['style', 'js'], function(){})
gulp.task('default', ['style', 'js'], function(){})
