var gulp = require('gulp');
var kmc = require('gulp-kmc');
var copy = require('gulp-copy');
var kclean = require('gulp-kclean');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var replace = require('gulp-replace');
var minify = require('gulp-minify');
var XTemplate = require('xtemplate');
var gulpXTemplate = require('gulp-xtemplate');
var path = require('path');
var src = '.';
var dest = './build';

var root = process.cwd();
var bower = require('./bower.json');
var version = bower.version;
//包配置
var pkg = 'kg/' + path.basename(root) + '/' + version;
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
      src: pkg + '/' + name + '.js',
      dest: name + comboSuffix + '.js'
    };
  });
  var cleanFiles = fileName.map(function(name) {
    return {
      src: name + comboSuffix + '.js',
      outputModule: pkg + '/' + name
    };
  });
  return gulp
    .src([
      src + '/**/*.js',
      '!node_modules/**/*.js',
      '!doc/**/*.js',
      '!templates/**/*.js',
      '!test/**/*.js',
      '!build/**/*.js',
      '!build/**/*.js',
      '!gulpfile.js',
      '!Gruntfile.js'
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


gulp.task('kmc', ['clean'], function() {
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

gulp.task('swf', ['clean'], function() {
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
    .src(['./lib/*.js', './plugin/*.js', 'index.js'])
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


var jsdoc = require('gulp-jsdoc');

gulp.task('doc', ['clean'], function() {
  return gulp
    .src(['index.js', 'plugin/status.js', 'README.md'])
    .pipe(jsdoc.parser({
      plugins: ['plugins/markdown']
    }))
    .pipe(jsdoc.generator('./doc', {
      'path': './templates/jaguar',
      'linenums': true,
      'cleverLinks': true,
      'monospaceLinks': true,
      'default': {
        'outputSourceFiles': true
      },
      'applicationName': 'Xplayer.js',
      'disqus': 'xplayerjs',
      'googleAnalytics': 'UA-49864231-1',
      'openGraph': {
        'title': 'Xplayer.js',
        'type': 'api',
        'image': '',
        'site_name': 'Xplayer.js',
        'url': 'https://github.com/noyobo/xplayer'
      },
      'meta': {
        'title': 'Xplayer API 文档',
        'description': 'MP3播放插件',
        'keyword': 'audio,javascript'
      }
    }))

})


gulp.task('default', ['lint', 'kmc', 'swf', 'doc']);
