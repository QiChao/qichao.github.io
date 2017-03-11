var gulp =require('gulp')
var webserver = require("gulp-webserver")
var construct = require('gulp-construct');
var rev = require('gulp-rev-append');
var revCollector = require('gulp-rev-collector');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');//livereload
/*
gulp.task('webserver', function(){
    gulp.src('./')
        .pipe(webserver({
            port: 8000,//端口
            host: '127.0.0.1',//域名
            liveload: true,//实时刷新代码。不用f5刷新
            directoryListing: {
            path: './web',
            enable: true
            }
        }))
});

*/

var  liuqichao = 'liuqichao';

gulp.task('connect',function(){
    
    connect.server({
        name:'node-list',
        root:'web',
        livereload:true,
        host:'127.0.0.1',
        port:'8000',
        fallback:'web/index.html'
    });
    //console.log(gulp.src('./web/css/best.css'))
})

gulp.task('html', function () {
  gulp.src('./web/*.html')
    .pipe(connect.reload());
});
gulp.task('htmls', function () {
  gulp.src('./web/**/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./web/js/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./web/min/js'))
    .pipe(connect.reload());
});

gulp.task('stylus',function(){
    gulp.src('./web/css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(stylus())
    .pipe(minifycss())
    .pipe(gulp.dest('./web/min/css'))
    
    .pipe(connect.reload())
})

gulp.task('watch', function () {
  gulp.watch(['./web/*.html'], ['html']);
  gulp.watch(['./web/**/*.html'], ['htmls']);
  gulp.watch(['./web/css/*.css'], ['stylus']);
  gulp.watch(['./web/js/*.js'], ['js']);
});


gulp.task('default',[
    'connect',
    'watch'
    ])