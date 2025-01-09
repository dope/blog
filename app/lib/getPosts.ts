import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { POSTS_PATH } from "./constants";

export const getPosts = () => {
  const blogDirectory = path.join(process.cwd(), POSTS_PATH);
  const fileNames = fs.readdirSync(blogDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data: frontMatter } = matter(fileContents);

    const date = new Date(frontMatter.date);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      slug,
      formattedDate,
      meta: frontMatter,
    };
  });
};
