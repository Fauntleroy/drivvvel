const SCRIPTS_SRC_DIR = './src/scripts';
const STYLES_SRC_DIR = './src/styles';
const COMPILED_DIR = './compiled';
const LIVERELOAD_PORT = 35730;

var path = require('path');
var vinyl_source = require('vinyl-source-stream');
var watchify = require('watchify');
var gulp = require('gulp');
var g_util = require('gulp-util');
var gulp_less = require('gulp-less');
var gulp_livereload = require('gulp-livereload');
var gulp_uglify = require('gulp-uglify');
var gulp_minify_css = require('gulp-minify-css');

gulp.task( 'compile css', function(){
	gulp.src( STYLES_SRC_DIR +'/index.less' )
		.pipe( gulp_less({
			paths: [ STYLES_SRC_DIR ]
		}))
		.pipe( gulp.dest( COMPILED_DIR ) )
		.pipe( gulp_livereload( LIVERELOAD_PORT ) );
});

gulp.task( 'compile js', function(){
	var w = watchify( SCRIPTS_SRC_DIR +'/index.js' );
	w.transform('hbsfy');
	var bundle = function(){
		return w.bundle()
			.pipe( vinyl_source('index.js') )
			.pipe( gulp.dest( COMPILED_DIR ) );
	};
	w.on( 'update', bundle );
	w.on( 'update', function(){
		g_util.log('index.js updated');
	});
	w.on( 'error', function(){
		console.log('error', arguments);
	});
	return bundle();
});

gulp.task( 'minify', function(){
	gulp.src( COMPILED_DIR +'/**/*.js' )
		.pipe( gulp_uglify() )
		.pipe( gulp.dest( COMPILED_DIR ) );
	gulp.src( COMPILED_DIR +'/**/*.css')
		.pipe( gulp_minify_css({
			keepSpecialComments: 0
		}))
		.pipe( gulp.dest( COMPILED_DIR ) );
});

gulp.task( 'watch css', function(){
	gulp.watch( STYLES_SRC_DIR +'/**/*.{less,css}', ['compile css'] );
});

gulp.task( 'default', ['compile css', 'compile js', 'watch css'] );
