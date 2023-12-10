import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    js: `${buildFolder}/js`,
    css: `${buildFolder}/css/`,
    images: `${buildFolder}/images/`,
    html: `${buildFolder}/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    js: `${srcFolder}/js/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    scss: `${srcFolder}/scss/styles.scss`,
    css: `${srcFolder}/css/**/*.css`,
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    css: `${srcFolder}/css/**/*.css`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
};
