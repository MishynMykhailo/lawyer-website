import gulp from "gulp";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import webpack from "webpack-stream";
import Webpack from "webpack";
import { handlerErrors } from "../helpers/handleErrors.js";

const args = process.argv.slice(2);
const isDev = args.includes("--dev");
const isBuild = args.includes("--production");

export function js() {
  const checkWebPSupportFunction = `
function checkWebPSupport() {
  const webP = new Image();
  webP.onload = webP.onerror = () =>
    document.body.classList.add(webP.height === 2 ? "webp" : "no-webp");
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}checkWebPSupport();
`;

  const configWebpack = {
    mode: isDev ? "development" : isBuild ? "production" : "development",
    output: {
      filename: "app.min.js",
    },
    plugins: [
      new Webpack.BannerPlugin({
        banner: checkWebPSupportFunction,
        raw: true,
      }),
    ],
  };

  return gulp
    .src(path.src.js, { sourcemaps: true })
    .pipe(handlerErrors("JS"))
    .pipe(webpack(configWebpack))
    .pipe(gulp.dest(path.build.js))
    .pipe(plugins.browsersync.stream());
}
