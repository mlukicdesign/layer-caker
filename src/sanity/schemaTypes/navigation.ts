import { defineField, defineType } from "sanity";
import { Icon, MenuIcon } from "@sanity/icons";

export const navigationType = defineType({
  name: "navigation",
  title: "Site Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    {
      name: "title",
      title: "Navigation Title",
      type: "string",
      description: 'Internal reference (e.g., "Main Navigation", "Footer Nav")',
    },
    {
      name: "items",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "navigationItem",
        },
      ],
    },
  ],
});
