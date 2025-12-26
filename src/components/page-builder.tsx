"use client";

import { Hero } from "@/components/blocks/hero";
import { Features } from "@/components/blocks/features";
import { SplitImage } from "@/components/blocks/split-image";
// import { FAQs } from "@/components/blocks/faqs";
import { PAGE_QUERYResult } from "@/sanity/types";
import { client } from "@/sanity/lib/client";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";

// enables the CMS page builder
// Switch to matching selected express
// Each array item has a distinct _type attribute, which you can switch over to render the correct component.
// Each item also contains a unique (to the array) _key value, which can be passed to React as a key prop—required by React for performant and consistent rendering of an array.
// Passed the remaining props to the block component using the spread operator.
//

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>["content"];
  documentId: string;
  documentType: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

// Base union of blocks coming from the PageBuilder content
type Block = NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number] & {
  _key: string;
  _type: string;
};

export function PageBuilder({
  content,
  documentId,
  documentType,
}: PageBuilderProps) {
  const blocks = useOptimistic<
    NonNullable<PAGE_QUERYResult>["content"] | undefined,
    NonNullable<PAGE_QUERYResult>
  >(content, (state, action) => {
    if (action.id === documentId) {
      return action?.document?.content?.map(
        (block) => state?.find((s) => s._key === block?._key) || block
      );
    }
    return state;
  });

  if (!Array.isArray(blocks)) {
    return null;
  }

  const validBlocks = blocks.filter(
    (block): block is Block => Boolean(block?._key) && Boolean(block?._type)
  );

  return (
    <main
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "content",
      }).toString()}
    >
      {validBlocks.map((block) => {
        const DragHandle = ({ children }: { children: React.ReactNode }) => (
          <div
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `content[_key=="${block._key}"]`,
            }).toString()}
          >
            {children}
          </div>
        );

        // Refactor this to an object reference
        switch (block._type) {
          case "hero":
            return (
              <DragHandle key={block._key}>
                <Hero {...block} />
              </DragHandle>
            );
          case "features":
            return (
              <DragHandle key={block._key}>
                <Features {...block} />
              </DragHandle>
            );
          case "splitImage":
            return (
              <DragHandle key={block._key}>
                <SplitImage {...block} />
              </DragHandle>
            );
          // case "faqs":
          //   return (
          //     <DragHandle key={block._key}>
          //       <FAQs {...block} />
          //     </DragHandle>
          //   );
          default:
            // This is a fallback for when we don't have a block type
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const fallback = block as any;
            return (
              <div key={fallback?._key ?? "unknown"}>
                Block not found: {fallback?._type ?? "unknown"}
              </div>
            );
        }
      })}
    </main>
  );
}

// Refactor to include object based component registry for more a more scalable solution
