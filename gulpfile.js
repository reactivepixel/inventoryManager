var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  gutil = require('gulp-util'),
  webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  webpackConfig = require('./webpack.config.js'),
  stream = require('webpack-stream'),
  nodemon = require('gulp-nodemon'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  chalk = require('chalk');

// NOTIFY MESSAGE VARIABLES
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Color codes for terminal messages
var redError = chalk.black.bgRed.bold,
  yelloWarning = chalk.black.bgYellow.bold,
  greenSuccess = chalk.black.bgGreen.bold,
  cyanWatch = chalk.black.bgCyan.bold;

gulp.task('default', ['webpack-dev-server']);

gulp.task('build-dev', ['webpack:build-dev'], function() {
  gulp.watch(['Gravity/**/*'], ['webpack:build-dev']);
});

function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log(stats.toString());
    }

    if (done) done();
  };
}

gulp.task('bundle', function(done) {
  webpack(webpackConfig).run(onBuild(done));
});


// UGLIFY
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Minify the public JS and strip comments.

gulp.task('uglify', function() {
  gulp.src('public/js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
});

// JSHINT
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Run js lint on our files to look for errors.
gulp.task('jshint', function() {
  gulp.src(['gulpfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// NODEMON
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Enable nodemon and set environment to development so we can run a server locally and reload files.
gulp.task('nodemon', function (done) {
    nodemon({
        script: 'server.js',
        ext: 'html js css',
        ignore: ['ignore.js'],
        env: { 'NODE_ENV': 'development' }
    }).on('restart');
    console.log(cyanWatch('Going into dev watch mode...'));
    console.log('Watching...');
});

gulp.task('dev', ['jshint', 'bundle', 'nodemon']);
gulp.task('build', ['jshint', 'bundle', 'uglify']);
