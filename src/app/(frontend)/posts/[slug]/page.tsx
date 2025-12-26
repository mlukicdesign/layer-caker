import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/components/views/post";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for each post based on SEO settings
export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: page } = await sanityFetch({
    query: POST_QUERY,
    params: resolvedParams,
  });

  if (!page) {
    return {};
  }

  // Generate base metadata from the page SEO settings
  const metadata: Metadata = {
    title: page.seo.title,
    description: page.seo.description,
  };

  // Generate open Graphic Image is not provided in the SEO settings
  metadata.openGraph = {
    images: {
      url: page.seo.image
        ? urlFor(page.seo.image).width(1200).height(630).url()
        : `/api/og?id=${page._id}`,
      width: 1200,
      height: 630,
    },
  };

  // apply noindex if specified in SEO settings
  if (page.seo.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}
