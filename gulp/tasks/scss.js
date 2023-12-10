import gulp from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoPrefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import { listRegExpStyle } from "../helpers/helpers.js";
import rename from "gulp-rename";
import { handlerErrors } from "../helpers/handleErrors.js";

const sass = gulpSass(dartSass);

export function scss() {
  const configSass = {
    outputStyle: "expanded",
  };

  const configWebpCss = {
    webpClass: ".webp",
    noWebpClass: ".no-webp",
  };

  const configAutoPrefixer = {
    grid: true,
    overrideBrowserlist: ["last 3 versions"],
    cascade: true,
  };

  return gulp
    .src(path.src.scss, { sourcemaps: true})
    .pipe(handlerErrors("SCSS"))
    .pipe(plugins.replace(...listRegExpStyle.images))
    .pipe(sass(configSass))
    .pipe(groupCssMediaQueries())
    .pipe(webpcss(configWebpCss))
    .pipe(autoPrefixer(configAutoPrefixer))
    .pipe(gulp.dest(path.build.css))
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest(path.build.css))
    .pipe(plugins.browsersync.stream());
}
