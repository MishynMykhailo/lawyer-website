import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
export const server = (done) => {
  plugins.browsersync.init({
    server: {
      baseDir: `${path.build.html}`,
    },
    notify: false,
    port: 3366,
  });
};
