import gulp from "gulp";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import { handlerErrors } from "../helpers/handleErrors.js";

export function otfToTtf() {
  // looking font files with .otf
  return (
    gulp
      .src(`${path.srcFolder}/fonts/*.otf`, {})
      .pipe(handlerErrors("FONTS"))
      //   конвертируем в ttf
      .pipe(
        fonter({
          formats: ["ttf"],
        })
      )
      //   Выгрузка в исходную папку
      .pipe(gulp.dest(`${path.srcFolder}/fonts/`))
  );
}
export function ttfToWoff() {
  return gulp
    .src(`${path.srcFolder}/fonts/*.ttf`, {})
    .pipe(handlerErrors("FONTS"))
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(gulp.dest(`${path.build.fonts}`))
    .pipe(gulp.src(`${path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(`${path.build.fonts}`))
    .pipe(gulp.src(`${path.srcFolder}/fonts/*.{woff,woff2}`))
    .pipe(gulp.dest(`${path.build.fonts}`));
}
export function fontsStyle() {
  const fontWeightMap = {
    thin: 100,
    extralight: 200,
    light: 300,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };
  const fontsFile = `${path.srcFolder}/scss/fonts.scss`;

  fs.readdir(path.build.fonts, function (err, fontsFiles) {
    if (!fontsFiles) return;

    if (!fs.existsSync(fontsFile)) {
      fs.writeFile(fontsFile, "", cb);
    } else {
      console.log(
        "файл scss/fonts.scss существует. Для обновления файла, его нужно удалить"
      );
      return;
    }

    let newFileOnly;
    for (let fontFile of fontsFiles) {
      const fontFileName = fontFile.split(".")[0];

      if (newFileOnly === fontFileName) continue;

      const [fontName, fontWeightName = ""] = fontFileName.split("-");
      const fontWeight = fontWeightMap[fontWeightName.toLowerCase()] || 400;

      fs.appendFile(
        fontsFile,
        `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style:normal;\n}\n`,
        cb
      );

      newFileOnly = fontFileName;
    }
  });

  return gulp.src(`${path.srcFolder}`);

  function cb() {}
}
