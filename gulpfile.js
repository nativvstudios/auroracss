const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const terser = require('gulp-terser');

// Compile SCSS to CSS
function buildStyles() {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css'));
}

// Minify JS
function buildScripts() {
  return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'));
}

// Watch files
function watchFiles() {
  gulp.watch('./src/scss/**/*.scss', buildStyles);
  gulp.watch('./src/js/*.js', buildScripts);
}

// Define complex tasks
const build = gulp.series(buildStyles, buildScripts);
const dev = gulp.series(build, watchFiles);

// Export tasks
exports.buildStyles = buildStyles;
exports.buildScripts = buildScripts;
exports.watch = watchFiles;
exports.build = build;
exports.dev = dev;
exports.default = build;