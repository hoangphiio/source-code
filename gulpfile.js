const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const minify = require("gulp-clean-css");
// const terser = require('gulp-terser');

// Importing `gulp-imagemin` and `gulp-webp` asynchronously
async function optimizeimg() {
  const imagemin = await import("gulp-imagemin");
  return src("assets/img/**/*.{jpg,png}")
    .pipe(
      imagemin.default([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/images"));
}

async function webpImage() {
  const imagewebp = await import("gulp-webp");
  return src("assets/img/**/*.{jpg,png}")
    .pipe(imagewebp.default())
    .pipe(dest("dist/images"));
}

// Compile SCSS, autoprefix, and minify CSS
function compilescss() {
  return src("scss/**/*.scss", { sourcemaps: true })
    .pipe(
      sass({
        sourceMap: true,
        uglyComments: true,
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(minify({ compatibility: "ie8", sourceMap: true }))
    .pipe(dest("css", { sourcemaps: "." }));
}

// // minify js
// function jsmin() {
//   return src("src/js/*.js") // change to your source directory
//     .pipe(terser())
//     .pipe(dest("dist/js")); // change to your final/public directory
// }

// Watch task
function watchTask() {
  watch("scss/**/*.scss", compilescss);
  watch("assets/img/**/*.{jpg,png}", series(optimizeimg, webpImage));
}

// Default Gulp task
exports.default = series(
  compilescss,
  parallel(optimizeimg, webpImage),
  watchTask
);
