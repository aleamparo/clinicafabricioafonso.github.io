var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['serve', 'watch'], function() {});

gulp.task('watch', function() {
	gulp.watch('coffee/**/*.coffee', ['coffee']);
	gulp.watch('sass/**/*.sass', ['sass']);
});

gulp.task('coffee', function() {
	gulp.src('coffee/**/*.coffee')
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(gulp.dest('js'));
});

gulp.task('sass', function() {
	gulp.src('sass/**/*.sass')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({remove: true}))
		.pipe(gulp.dest('css'));
})

gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: './'
		}
	});

	gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: './'}, reload);
});