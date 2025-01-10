import { getPosts } from "@/app/lib/getPosts";
import { Intro, PostList, SpotifyCarousel } from "./components/ui";

export default function Home() {
  const posts = getPosts();

  return (
    <div className="flex flex-col gap-y-16">
      <Intro />
      <PostList posts={posts} />
      <SpotifyCarousel />
    </div>
  );
}
