import gulp from "gulp";
import { deleteAsync } from "del";
import GulpZip from "gulp-zip";
import { path } from "../config/path.js";
import { handlerErrors } from "../helpers/handleErrors.js";
// Function for copy files from "srcFolder" to "buildFolder"
export async function zip() {
  await deleteAsync(`./${path.rootFolder}.zip`);
  return gulp
    .src(`${path.buildFolder}/**/*.*`, {})
    .pipe(handlerErrors("ZIP"))
    .pipe(GulpZip(`${path.rootFolder}.zip`))
    .pipe(gulp.dest("./"));
}
