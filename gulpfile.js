var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var notify = require('gulp-notify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var rev = require('gulp-rev');
var revDel = require('rev-del');
var imagemin = require('gulp-imagemin');
var autoPrefixer = require('gulp-autoprefixer');
var RevAll = require('gulp-rev-all');
// var useref = require('gulp-useref');
// var revReplace = require("gulp-rev-replace");

//.pipe() is just a function that takes a readable source stream src and hooks the output to a destination writable stream dst:

var paths = {
  sass : {
    src : './scss/main.scss',
    dest : './css',
    watch : './scss/**/*.scss'
  },
  styles : {
    src: './assets/styles/**/*.css',
    dest: './dist/styles'
  },
  scripts : {
    src : './assets/scripts/main.js',
    dest : './dist/scripts'
  },
  images : {
    src : './assets/images/**',
    dest : './dist/images'
  }
}

gulp.task('sass', function() {
  //source file
  return gulp.src(paths.sass.src)
    //for Sass @import /*
    .pipe(sassGlob())
    //compile files
    .pipe(sass().on('error', sass.logError))
    //destination directory
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(notify({
      message: 'Sass compiled'
    }));
});

//combine and minify JS files
gulp.task('minify-scripts', function() {
  gulp.src(paths.scripts.src)
  //merge js files
  // .pipe(concat('main.min.js'))
  .pipe(uglify())
  // .pipe(rename({suffix: '.min'}))
  .pipe(rev())
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(rev.manifest())
  .pipe(revDel({ dest: paths.scripts.dest }))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(notify({
    message: 'Javascript minified'
  }));
})

//minify css files and add hash revision filename
gulp.task('minify-css', ['sass'], function() {
  return gulp.src(paths.styles.src)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rev.manifest())
    .pipe(revDel({ dest: paths.styles.dest }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(notify({
      message: 'CSS minified'
    }));
});


//minify images and add hash revision filename
// gulp.task('minify-images', function() {
//   gulp.src('./assets/images/*')
//       .pipe(imagemin())
//       .pipe(rev())
//       .pipe(gulp.dest('./dist/images'))
//       .pipe(rev.manifest())
//       .pipe(revDel({ dest: './dist/images' }))
//       .pipe(gulp.dest('./dist/images'))
//       .pipe(notify({
//         message: 'Images minified'
//       }));
// });

gulp.task('move-images',['move-svgs'], function() {
  gulp.src('./assets/images/**')
      .pipe(gulp.dest('./dist/images'))
      .pipe(notify({
        message: 'Images moved to dist folder'
      }));
});

gulp.task('move-svgs', function() {
  gulp.src('./assets/images/**/*.svg')
      .pipe(gulp.dest('./dist/images'))
      .pipe(notify({
        message: 'Svgs moved to dist folder'
      }));
});

gulp.task('move-fonts', function() {
  gulp.src('./assets/fonts/**/*{eot,svg,ttf,woff,woff2}')
      .pipe(gulp.dest('./dist/fonts'))
      .pipe(notify({
        message: 'Fonts moved to dist folder'
      }));
});

//lint task, js error handling
gulp.task('lint', function() {
  return gulp.src(paths.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
})

//watch all the tasks on file changes
gulp.task('watch', function() {
  //watch all scss files in the styles directory and run sass task
  var sassWatcher = gulp.watch(paths.sass.watch, ['sass']);
  sassWatcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  //  var scriptsWatcher = gulp.watch(paths.scripts.src, ['lint','minify-scripts']);
  //  scriptsWatcher.on('change', function(event) {
  //    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  //  });
  //  var imageWatcher = gulp.watch(paths.images.src, ['minify-images']);
  //  imageWatcher.on('change', function(event) {
  //    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  //  });
}); //end of watch task

//run 'gulp' in terminal to run array of tasks concurrently
gulp.task('default', ['sass','watch']);
