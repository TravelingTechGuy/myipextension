'use strict';

//npm install gulp gulp-minify-css gulp-uglify gulp-clean gulp-cleanhtml gulp-jshint gulp-strip-debug gulp-zip --save-dev

var gulp = require('gulp'),
	clean = require('gulp-clean'),
	cleanhtml = require('gulp-cleanhtml'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	zip = require('gulp-zip');

//clean build directory
gulp.task('clean', function() {
	return gulp.src('build/*', {read: false})
		.pipe(clean());
});

//copy static folders to build directory
gulp.task('copy', function() {
	gulp.src('src/fonts/**')
		.pipe(gulp.dest('build/fonts'));
	gulp.src('src/images/**')
		.pipe(gulp.dest('build/images'));
	gulp.src('src/_locales/**')
		.pipe(gulp.dest('build/_locales'));
	return gulp.src('src/manifest.json')
		.pipe(gulp.dest('build'));
});

//copy and compress HTML files
gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(cleanhtml())
		.pipe(gulp.dest('build'));
});

//run scripts through JSHint
gulp.task('jshint', function() {
	return gulp.src('src/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

//copy vendor scripts and uglify all other scripts, creating source maps
gulp.task('scripts', ['jshint'], function() {
	gulp.src('src/scripts/vendor/**/*.js')
		.pipe(gulp.dest('build/scripts/vendor'));
	return gulp.src(['src/scripts/**/*.js', '!src/scripts/vendor/**/*.js'])
		.pipe(stripdebug())
		.pipe(uglify({outSourceMap: true}))
		.pipe(gulp.dest('build/scripts'));
});

//minify styles
gulp.task('styles', function() {
// 	return gulp.src('src/styles/**/*.css')
// 		.pipe(minifycss({root: 'src/styles', keepSpecialComments: 0}))
// 		.pipe(gulp.dest('build/styles'));
	return gulp.src('src/styles/**')
		.pipe(gulp.dest('build/styles'));
});

//build ditributable and sourcemaps after other tasks completed
gulp.task('zip', ['html', 'scripts', 'styles', 'copy'], function() {
	var manifest = require('./src/manifest'),
		distFileName = manifest.name + ' v' + manifest.version + '.zip',
		mapFileName = manifest.name + ' v' + manifest.version + '-maps.zip';
	//collect all source maps
	gulp.src('build/scripts/**/*.map')
		.pipe(zip(mapFileName))
		.pipe(gulp.dest('dist'));
	//build distributable extension
	return gulp.src(['build/**', '!build/scripts/**/*.map'])
		.pipe(zip(distFileName))
		.pipe(gulp.dest('dist'));
});

//run all tasks after build directory has been cleaned
gulp.task('default', ['clean'], function() {
    gulp.start('zip');
});
