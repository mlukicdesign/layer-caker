import { PortableText } from "next-sanity";
import Image from "next/image";

import { Author } from "@/components/partials/author";
import { Categories } from "@/components/partials/categories";
import { components } from "@/sanity/portableTextComponents";
import { POST_QUERYResult } from "@/sanity/types";
import { PublishedAt } from "@/components/partials/published-at";
import { Title } from "@/components/partials/title";
import { urlFor } from "@/sanity/lib/image";
import { RelatedPosts } from "@/components/partials/related-posts";

export function Post(props: NonNullable<POST_QUERYResult>) {
  const {
    title,
    author,
    mainImage,
    body,
    publishedAt,
    categories,
    relatedPosts,
    _id,
  } = props;

  return (
    <article className="grid lg:grid-cols-12 gap-y-12">
      <header className="lg:col-span-12 flex flex-col gap-4 items-start">
        <div className="flex gap-4 items-center">
          <Categories categories={categories} />
          <PublishedAt publishedAt={publishedAt} />
        </div>
        <Title>{title}</Title>
        <Author author={author} />
      </header>
      {mainImage ? (
        <figure className="lg:col-span-4 flex flex-col gap-2 items-start">
          <Image
            src={urlFor(mainImage).width(400).height(400).url()}
            width={400}
            height={400}
            alt=""
          />
        </figure>
      ) : null}
      {body ? (
        <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg">
          <PortableText value={body} components={components} />
          <RelatedPosts
            relatedPosts={relatedPosts}
            documentId={_id}
            documentType="post"
          />
        </div>
      ) : null}
    </article>
  );
}
