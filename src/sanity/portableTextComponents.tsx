/**
 * Portable Text components configuration for rendering rich text content from Sanity CMS.
 *
 * @type {PortableTextComponents}
 *
 * @property {Object} types - Custom component renderers for specific Portable Text types
 * @property {Function} types.image - Renders optimized images from Sanity
 * @param {Object} types.image.props - The image block properties
 * @param {Object} types.image.props.value - The image data object from Sanity
 * @param {string} types.image.props.value.alt - Alternative text for the image
 * @returns {JSX.Element | null} An optimized Next.js Image component with responsive sizing and quality settings, or null if no value is provided
 *
 * @example
 * ```tsx
 * import { PortableText } from "next-sanity";
 * import { components } from "@/sanity/portableTextComponents";
 *
 * export default function RichText({ content }) {
 *   return <PortableText value={content} components={components} />;
 * }
 * ```
 */

import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const components: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <Image
          className="rounded-lg not-prose w-full h-auto"
          src={urlFor(props.value)
            .width(600)
            .height(400)
            .quality(80)
            .auto("format")
            .url()}
          alt={props?.value?.alt || ""}
          width="600"
          height="400"
        />
      ) : null,
  },
};
