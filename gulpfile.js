var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'); 

// Tasks 

gulp.task('sass', function() {
	return  gulp.src('scss/**/*.scss')
			.pipe(sass())
			.pipe(autoprefixer(['last 15 version', '>1%', 'ie 8', 'ie 7'], {cascade:true}))
			.pipe(gulp.dest('src/css'))
});

gulp.task('style-min', function() {
	return gulp.src([
		'src/css/**/*.css'])
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts',function() {
	return gulp.src(['src/js/**/*.js'])
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('js'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {baseDir: ''},
		notify:false
	});	
});


gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img',function() {
	return gulp.src('img/**/*')
	.pipe(cache (imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins:[{removeViewBox:false}],
		une:[pngquant()]
	})))
	.pipe(gulp.dest('img'));
});

gulp.task('default', ['browser-sync', 'scripts', 'style-min'], function() {
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('src/css/**/*.css', ['style-min']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
});















