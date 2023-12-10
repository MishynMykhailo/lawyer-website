const Vinyl = require("vinyl");
const through = require("through2");

const pluginName = "gulp-webp-html-nosvg";
const EXTENSIONS_REGEX = /\.(jpg|jpeg|png|gif)$/i;
const BASE64_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

function transformImageTag(imgTag, imgUrl) {
  if (imgUrl.includes(".svg") || !EXTENSIONS_REGEX.test(imgUrl)) return imgTag;

  const newUrl = imgUrl.replace(EXTENSIONS_REGEX, ".webp");

  return imgTag.includes("data-src")
    ? `<picture><source data-srcset="${newUrl}" srcset="${BASE64_IMG}" type="image/webp">${imgTag.replace(
        "<img",
        `<img src="${BASE64_IMG}"`
      )}</picture>`
    : `<picture><source srcset="${newUrl}" type="image/webp">${imgTag}</picture>`;
}

module.exports = function () {
  return through.obj(function (file, _, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new Vinyl.PluginError(pluginName, "Streaming not supported"));
      return;
    }

    try {
      let inPicture = false;
      const data = file.contents
        .toString()
        .split("\n")
        .map((line) => {
          const hasPictureTag = line.includes("<picture");
          const hasClosePictureTag = line.includes("</picture");
          const hasImgTag = line.includes("<img");

          if (hasPictureTag) inPicture = true;
          if (hasClosePictureTag) inPicture = false;

          return !inPicture && hasImgTag
            ? line.replace(
                /<img([^>]*)src=\"(\S+)\"([^>]*)>/gi,
                (_, beforeSrc, imgUrl, afterSrc) => transformImageTag(_, imgUrl)
              )
            : line;
        })
        .join("\n");

      file.contents = Buffer.from(data);
      this.push(file);
    } catch (err) {
      console.error(
        "[ERROR] Ensure the image filename doesn't contain spaces or Cyrillic characters."
      );
      this.emit("error", new Vinyl.PluginError(pluginName, err));
    }

    cb();
  });
};
