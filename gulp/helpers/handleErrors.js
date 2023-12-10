import { plugins } from "../config/plugins.js";

export function handlerErrors(name) {
  return plugins.plumber(
    plugins.notify.onError({
      title: name,
      message: "Error: <%= error.message %>",
    })
  );
}
