var gulp = require('gulp');
var kmc = require('gulp-kmc');
var copy = require('gulp-copy');
var kclean = require('gulp-kclean');
var rename = require("gulp-rename");
var filter = require('gulp-filter');
var replace = require('gulp-replace');
var minify = require('gulp-minify');
var XTemplate = require('xtemplate');
var gulpXTemplate = require('gulp-xtemplate');
var path = require('path');
var src = ".",
  dest = "./build";

var root = process.cwd();
var bower = require('./bower.json');
var version = bower.version;
//包配置
var pkg = "kg/" + path.basename(root) + "/" + version;
var comboSuffix = '-combo';

kmc.config({
  packages: [{
    name: pkg,
    base: src
  }]
});

// kmc.server({
//   port: 8787,
//   fixModule: true,
//   path: dest,
//   kissy: true
// });

//使用kmc合并并编译kissy模块文件
function renderKmc(fileName) {
  var comboFiles = fileName.map(function(name) {
    return {
      src: pkg + "/" + name + ".js",
      dest: name + comboSuffix + ".js"
    };
  });
  var cleanFiles = fileName.map(function(name) {
    return {
      src: name + comboSuffix + '.js',
      outputModule: pkg + '/' + name
    };
  });
  return gulp.src([
      src + '/**/*.js',
      '!./node_modules/**/*.js',
      '!./test/**/*.js',
      '!./gulpfile.js',
      '!./build/**/*.js',
      '!./templates/**/*.*'
    ])
    .pipe(replace('@VERSION', version))
    //转换cmd模块为kissy模块
    .pipe(kmc.convert({
      kissy: true,
      ignoreFiles: ['-min.js']
    }))
    //合并文件
    .pipe(kmc.combo({
      deps: 'mods.js',
      files: comboFiles
    }))
    //优化代码
    .pipe(kclean({
      files: cleanFiles
    }))
    .pipe(minify())
    .pipe(filter(function(file) {
      var files = fileName.map(function(name) {
        return name + comboSuffix + '.js';
      });
      return files.indexOf(file.relative) == -1;
    }))
    .pipe(rename(function(file) {
      fileName.forEach(function(name) {
        file.basename = file.basename.replace(name + comboSuffix + '-min', name + '-min');
      })
    }))
    .pipe(gulp.dest(dest));
}


gulp.task('kmc', function() {
  renderKmc(['index']);
});



gulp.task('xtpl', function() {
  return gulp.src(src + '/**/*.xtpl')
    .pipe(gulpXTemplate({
      wrap: 'kissy',
      XTemplate: XTemplate
    }))
    .on('error', function(e) {
      console.log(e);
    })
    .pipe(gulp.dest(src));
});

gulp.task('swf', function() {
  return gulp
    .src('./flash/*.swf')
    .pipe(copy(dest, {
      prefix: 1
    }))
})

var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')
gulp.task('lint', function() {
  return gulp
    .src(['./lib/*.js', 'index.js', 'mini.js', '!./lib/swfobject.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish, {
      verbose: true
    }))
})

var clean = require('gulp-clean');

gulp.task('clean', function() {
  return gulp.src(['./build', './doc'], {
      read: false
    })
    .pipe(clean());
});

<<<<<<< HEAD
gulp.task('default', ['clean'], function() {
  gulp.start(['kmc', 'swf', 'doc'])
=======
gulp.task('default', ['clean'], function(){
  gulp.start(['kmc', 'swf'])
>>>>>>> 92f144ae1a6361a13457db4cb65fa963c8d113dd
});
