import Link from "next/link";
import { getPosts } from "@/app/lib/getPosts";
import { SITE_TITLE } from "./lib/constants";

export default function Home() {
  const posts = getPosts();

  return (
    <div className="flex flex-col gap-y-8">
      <header>
        <h1>{SITE_TITLE}</h1>
        <p>Welcome to my blog</p>
      </header>

      <ul className="flex flex-col gap-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <h3>{post.meta.title}</h3>
              <time className="mb-2 block text-xs opacity-50">{post.formattedDate}</time>
              <p>{post.meta.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
