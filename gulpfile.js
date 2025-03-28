import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import * as rollup from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const sass = gulpSass(dartSass);

// Compile SCSS to CSS
function buildStyles() {
  return gulp.src('./src/scss/aurora.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css'));
}

// Bundle and minify JS using Rollup
async function buildScripts() {
  // Create the bundle
  const bundle = await rollup.rollup({
    input: './src/js/aurora.js',
    plugins: [
      resolve(), // Helps Rollup find external modules
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env']
      })
    ]
  });

  // Generate the bundle
  await bundle.write({
    file: './dist/js/aurora.js',
    format: 'umd',
    name: 'Aurora',
    sourcemap: true
  });

  // Create minified version
  return gulp.src('./dist/js/aurora.js')
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'));
}

// Watch files
function watchFiles() {
  gulp.watch('./src/scss/**/*.scss', buildStyles);
  gulp.watch('./src/js/**/*.js', buildScripts); // Watch all JS files in src/js
}

// Define complex tasks
const build = gulp.series(buildStyles, buildScripts);
const dev = gulp.series(build, watchFiles);

// Export tasks
export { buildStyles, buildScripts, watchFiles, build, dev };
export default build;