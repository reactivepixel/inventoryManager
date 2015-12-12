// Gravity Application GULP | Gulp dependency file for production
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var stream = require('webpack-stream');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var chalk = require('chalk');

// NOTIFY MESSAGE VARIABLES
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Color codes for terminal messages
var redError = chalk.black.bgRed.bold;
var yelloWarning = chalk.black.bgYellow.bold;
var greenSuccess = chalk.black.bgGreen.bold;
var cyanWatch = chalk.black.bgCyan.bold;

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
gulp.task('nodemon', ['bundle'], function (done) {
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
