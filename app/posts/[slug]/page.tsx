import { MDXRemote } from "next-mdx-remote/rsc";

import type { Metadata, ResolvingMetadata } from "next";
import { getPost } from "@/app/lib/getPost";
import { generateStaticParams } from "@/app/lib/generateStaticParams";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params);
  const title = post.frontMatter.title;
  const description = post.frontMatter.description;

  return {
    title: title,
    description: description,
  };
}

generateStaticParams();

export default async function Page({ params }: { params: { slug: string } }) {
  const props = await getPost(params);

  const components = {};

  return (
    <article>
      <h1>{props.frontMatter.title}</h1>
      <MDXRemote source={props.content} components={components} />
    </article>
  );
}
