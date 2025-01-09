import fs from "fs";
import path from "path";
import { POSTS_PATH } from "./constants";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(POSTS_PATH));
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return params;
}
