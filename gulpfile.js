var gulp = require('gulp');
var sass = require('gulp-sass');
var tildeImporter = require('node-sass-tilde-importer');
var imagemin = require('gulp-imagemin');
var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var spritesmith = require('gulp.spritesmith');
var path = require('path');

//style paths

var paths = {
  templates: 'theme/northernlights/',
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  js: {
    //add any required libraries above src folder to access the lib
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  img: {
    src: 'src/images/**',
    dest: 'dist/images/',
  },
  sprites: {
    imgSrc: 'src/images/sprites/*.*',
    imgDest: 'dist/images/',
    scssDest: 'src/scss/components'
  }
};

function clean() {
  return del(['dist']);
}

function sprite(done) {
  var spriteData = gulp.src(paths.sprites.imgSrc).pipe(
    spritesmith({
      imgName: 'icons.png',
      cssName: '_icons.scss',
      cssFormat: 'scss',
      padding: 2,
      imgPath: '/static/images/icons.png'
    })
  );
  spriteData.img.pipe(gulp.dest(paths.img.dest));
  spriteData.css.pipe(gulp.dest(paths.sprites.scssDest));
  done();
  return spriteData;
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass({ importer: tildeImporter }).on('error', sass.logError))
    .pipe(minifyCSS({
      processImport: false
    }))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        grid: true
      })
    )
    .pipe(concat('main.css'))
    .pipe(sourcemaps.init())
    .pipe(
      cleanCSS({
        relativeTo: './node_modules',
        processImport: true
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

function images() {
  return gulp
    .src([paths.img.src])
    .pipe(
      imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest(paths.img.dest));
}

function scripts() {
  return gulp
    .src(paths.js.src, {
      sourcemaps: true
    })
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.js.dest));
}

function copyHtml () {
  return gulp.src('output/**/*')
    .pipe(gulp.dest('dist'));
}

function watch() {
  gulp.watch(paths.js.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.img.src, images);
  gulp.watch(paths.img.src, sprite);
  gulp.watch(paths.templates, copyHtml);
  browserSync.init({
    proxy: 'http://localhost:8000/'
  } );
  gulp.watch(paths.templates).on('change', browserSync.reload);
}

/*
* Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
*/
var build = gulp.series(clean, gulp.parallel(styles, scripts, images, sprite, copyHtml));

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);

gulp.task('sprite', sprite);
/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', gulp.series(build, watch));
