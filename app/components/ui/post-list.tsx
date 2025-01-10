"use client";

import Link from "next/link";

export type Post = {
  slug: string;
  formattedDate: string;
  meta: { [key: string]: any };
};

export const PostList = ({ posts }: { posts: Post[] }) => {
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.formattedDate);
    const dateB = new Date(b.formattedDate);
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  });

  return (
    <div>
      <h2 className="mb-2 mx-4 text-sm font-light opacity-50">Posts</h2>
      <ul className="flex flex-col relative">
        {sortedPosts.map((post) => (
          <li
            key={post.slug}
            className="relative group hover:bg-light/5 border border-transparent hover:border-white/10 overflow-hidden rounded-xl transition-colors duration-300"
          >
            <Link
              href={`/posts/${post.slug}`}
              className="flex items-center justify-between py-3 px-4 gap-x-4"
            >
              <h3 className="text-md font-light whitespace-nowrap">{post.meta.title}</h3>
              <span className="block w-full h-[1px] bg-white/10" />
              <time className="block text-xs font-mono whitespace-nowrap opacity-50">
                {post.formattedDate}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
