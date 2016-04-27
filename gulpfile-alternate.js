var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var inlinesource = require('gulp-inline-source');
var processhtml = require('gulp-processhtml');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var vendorsJS = Object.keys(require('./bower.json').dependencies).map(function(vendor) {
	return 'bower_components' + '/' + vendor + '/' + vendor + '.min.js';
});
var vendorsCSS = Object.keys(require('./bower.json').dependencies).map(function(vendor) {
	return 'bower_components' + '/' + vendor + '/' + vendor + '.min.css';
});

gulp.task('js', function () {
	return gulp.src(['app/**/*.js', '!app/**/*.spec.js'])
		.pipe(ngAnnotate())
		.pipe(concat('base.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('vendor', function () {
	return gulp.src(vendorsJS)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('templates', function () {
  return gulp.src('app/**/*.html')
    .pipe(templateCache({
		root: 'app',
		module: 'gdanskTraining.templates'
	}))
	.pipe(ngAnnotate())
    .pipe(gulp.dest('dist'));
});

gulp.task('combine', ['vendor', 'templates', 'js'], function () {
	return gulp.src(['dist/vendor.js', 'dist/base.js', 'dist/templates.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
	return gulp.src(vendorsCSS)
		.pipe(concat('base.css'))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
	return gulp.src('index-inject.html')
		.pipe(processhtml({commentMarker: 'process', process: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('inject', ['combine', 'sass', 'copy'], function () {
    return gulp.src('dist/*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['inject']);
