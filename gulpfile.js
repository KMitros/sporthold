var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    glob = require('gulp-sass-glob');

gulp.task('browser-sync', ['styles', 'scripts'], function(){
  browserSync.init({
    server: {
      baseDir: "./app"
    },
    notify: false
  });
});

gulp.task('styles', function () {
  return gulp.src('sass/**/*.sass')
  .pipe(glob())
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 2 versions'],cascade: false}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});



gulp.task('scripts', function(){
  return gulp.src([
    './app/libs/jquery/dist/jquery.min.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest('./app/js'));
});

gulp.task('watch', function () {
	gulp.watch('sass/**/*.sass', ['styles']).on("change", browserSync.reload);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
