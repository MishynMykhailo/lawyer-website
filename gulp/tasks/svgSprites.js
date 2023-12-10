import gulp from "gulp";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import svgSprite from "gulp-svg-sprite";

import { handlerErrors } from "../helpers/handleErrors.js";

export function svgSprites() {
  const configSvg = {
    mode: {
      stack: {
        sprite: `../icons/icons.svg`,
        example: true,
      },
    },
  };

  return gulp
    .src(`${path.src.svgicons}`, {})
    .pipe(handlerErrors("SVG-SPRITES"))
    .pipe(svgSprite(configSvg))
    .pipe(gulp.dest(`${path.build.images}`));
}
