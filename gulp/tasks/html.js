import gulp from "gulp";
import fileinclude from "gulp-file-include";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import gulpWebpHtmlNosvg from "../helpers/gulp-webp-html-nosvg/index.js";
// import versionNumber from "gulp-version-number";
import { handlerErrors } from "../helpers/handleErrors.js";
// Function for copy-html files from "srcFolder" to "buildFolder"
export function html() {

  const configVersionNumber = {
    value: "%DT%",
    append: {
      key: "_v",
      cover: 0,
      to: ["css", "js"],
    },
    output: {
      file: "gulp/version.json",
    },
  };

  return gulp
    .src(path.src.html)
    .pipe(handlerErrors("HTML"))
    .pipe(fileinclude())
    .pipe(plugins.replace(/@images\//g, "./images/"))
    // .pipe(gulpWebpHtmlNosvg())
    // .pipe(versionNumber(configVersionNumber))
    .pipe(gulp.dest(path.build.html))
    .pipe(plugins.browsersync.stream());
}
