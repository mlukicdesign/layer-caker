import { defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const navigationItemType = defineType({
  name: "navigationItem",
  title: "Navigation Item",
  type: "object",
  icon: LinkIcon,
  fields: [
    {
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Link",
      type: "reference",
      to: [
        { type: "page" },
        { type: "post" },
        // Add other document types you want to link to
      ],
      description: "Internal link to a page or post",
    },
    {
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "Use this for external links (overrides internal link)",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    },
    {
      name: "children",
      title: "Child Items",
      type: "array",
      of: [
        {
          type: "navigationItem", // Self-reference for nesting
        },
      ],
      description: "Create dropdown/nested navigation items",
    },
  ],
  preview: {
    select: {
      title: "label",
      hasChildren: "children",
    },
    prepare({ title, hasChildren }) {
      return {
        title: title,
        subtitle: hasChildren?.length
          ? `${hasChildren.length} child items`
          : "No children",
      };
    },
  },
});
