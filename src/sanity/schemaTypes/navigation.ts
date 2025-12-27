import { defineField, defineType } from "sanity";
import { Icon, MenuIcon } from "@sanity/icons";

export const navigationType = defineType({
  name: "navigation",
  title: "Site Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [
        defineField({
          name: "link",
          type: "object",
          title: "Link",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "linkType",
              type: "string",
              title: "Link Type",
              options: {
                list: [
                  { title: "Internal Page", value: "internal" },
                  { title: "External URL", value: "external" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "isFeatured",
              type: "boolean",
              title: "Featured Link",
              description: "Mark this link as featured for special styling.",
              initialValue: false,
            }),
            defineField({
              name: "pageLink",
              type: "reference",
              to: [{ type: "page" }],
              title: "Select Page",
              hidden: ({ parent }) =>
                (parent as { linkType?: string })?.linkType !== "internal",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (
                    (context.parent as { linkType?: string })?.linkType ===
                      "internal" &&
                    !value
                  ) {
                    return "Please select a page";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "externalLink",
              type: "url",
              title: "External URL",
              hidden: ({ parent }) =>
                (parent as { linkType?: string })?.linkType !== "external",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (
                    (context.parent as { linkType?: string })?.linkType ===
                      "external" &&
                    !value
                  ) {
                    return "Please enter a URL";
                  }
                  return true;
                }),
            }),
          ],
        }),
      ],
    }),
  ],
});
