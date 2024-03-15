const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const minify = require("gulp-clean-css");
const pug = require("gulp-pug");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();

// Optimize images
async function optimizeimg() {
  const imagemin = await import("gulp-imagemin");
  return src("assets/img/**/*.{jpg,png}")
    .pipe(
      imagemin.default([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/assets/img"))
    .pipe(browserSync.stream());
}

// Convert images to WebP format
async function webpImage() {
  const imagewebp = await import("gulp-webp");
  return src("assets/img/**/*.{jpg,png}")
    .pipe(imagewebp.default())
    .pipe(dest("dist/assets/img"));
}

// Compile SCSS, autoprefix, and minify CSS
function compilescss() {
  return src("scss/**/*.scss", { sourcemaps: true })
    .pipe(
      sass({
        sourceMap: true,
        uglyComments: true,
        onError: sass.logError,
      })
    )
    .pipe(postcss([autoprefixer("last 2  versions")]))
    .pipe(minify({ compatibility: "ie8", sourceMap: true }))
    .pipe(dest("dist/css", { sourcemaps: "." }))
    .pipe(browserSync.stream());
}

/** HTML Task */
function htmlTask() {
  return src("views/**/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(dest("dist/views"))
    .pipe(browserSync.stream());
}

// Minify JS
function jsMin() {
  return src("js/**/*.js")
    .pipe(terser())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

// Watch task
function watchTask() {
  browserSync.init({
    server: {
      baseDir: ["./", "./dist"],
      directory: true,
    },
  });

  watch("views/**/*.pug", htmlTask);
  watch("scss/**/*.scss", compilescss);
  watch("js/**/*.js", jsMin);
  watch("assets/img/**/*.{jpg,png}", series(optimizeimg, webpImage));
}

// Default Gulp task
exports.default = series(
  parallel(optimizeimg, webpImage),
  compilescss,
  htmlTask,
  jsMin,
  watchTask
);
