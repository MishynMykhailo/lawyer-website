import gulp from "gulp";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import { handlerErrors } from "../helpers/handleErrors.js";

function minifyImages() {
  return imagemin({
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    interlaced: true,
    optimizationLevel: 3, // 0 to 7
  });
}

export function images() {
  return gulp
    .src(path.src.images)
    .pipe(handlerErrors("IMAGES"))
    .pipe(plugins.newer(path.build.images))
    .pipe(minifyImages())
    .pipe(gulp.dest(path.build.images))
    // .pipe(webp())
    .pipe(gulp.dest(path.build.images))
    .pipe(gulp.src(path.src.svg))
    .pipe(gulp.dest(path.build.images))
    .pipe(plugins.browsersync.stream());
}
