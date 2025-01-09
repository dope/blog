import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { POSTS_PATH } from "./constants";

export async function getPost({ slug }: { slug: string }) {
  try {
    const markdownFile = fs.readFileSync(
      path.join(POSTS_PATH, slug + ".mdx"),
      "utf-8"
    );
    const { data: frontMatter, content } = matter(markdownFile);
    return {
      frontMatter,
      slug,
      content,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error(`Unable to fetch the post for slug: ${slug}`);
  }
}