import { deleteAsync } from "del";

import { path } from "../config/path.js";
export async function reset() {
  return await deleteAsync(path.clean);
}
