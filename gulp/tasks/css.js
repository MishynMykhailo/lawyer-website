import gulp from "gulp";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoPrefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import rename from "gulp-rename";
import { handlerErrors } from "../helpers/handleErrors.js";

export function css() {
  const configWebpCss = {
    webpClass: ".webp",
    noWebpClass: ".no-webp",
  };

  const configAutoPrefixer = {
    overrideBrowserslist: ["last 2 versions"],
    cascade: false,
  };

  return (
    gulp
      .src(path.src.css)
      .pipe(handlerErrors("CSS"))
      .pipe(autoPrefixer(configAutoPrefixer))
      .pipe(groupCssMediaQueries())
      // .pipe(webpcss(configWebpCss))
      .pipe(gulp.dest(path.build.css))
      .pipe(cleanCss())
      .pipe(
        rename({
          suffix: ".min",
        })
      )
      .pipe(gulp.dest(path.build.css))
      .pipe(plugins.browsersync.stream())
  );
}
