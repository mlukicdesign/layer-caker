import { ALL_FIELDS_GROUP, defineField, defineType } from "sanity";
import { ControlsIcon } from "@sanity/icons";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description: "Global site settings and configuration",
  icon: ControlsIcon,
  groups: [
    {
      name: "general",
      title: "General",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "identity",
      title: "Identity",
    },
    {
      name: "businessInformation",
      title: "Business Information",
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
    },
  ],
  fields: [
    defineField({
      name: "homePage",
      title: "Home Page",
      description: "Select the home page for the website",
      type: "reference",
      to: [{ type: "page" }],
      group: "general",
    }),
    defineField({
      name: "seoSettings",
      title: "SEO Settings",
      description: "Define your site's global SEO meta information",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Site Title",
        }),
        defineField({
          name: "description",
          type: "text",
          title: "Site Description",
        }),
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media Links",
      description: "A link to all relevant social media platforms",
      group: "businessInformation",
      type: "array",
      of: [
        defineField({
          name: "socialMediaLink",

          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              title: "Platform",
            }),
            defineField({
              name: "url",
              type: "url",
              title: "URL",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "contactInformation",
      title: "Contact Information",
      type: "object",
      description: "Enter your business contact details here",
      group: "businessInformation",
      fields: [
        defineField({
          name: "emailAddress",
          title: "Email Address",
          type: "string",
        }),
        defineField({
          name: "phoneNumber",
          title: "Phone Number",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      group: "businessInformation",
      fields: [
        {
          name: "address",
          title: "Address",
          type: "string",
        },
        {
          name: "coordinates",
          title: "Coordinates",
          type: "geopoint",
        },
        {
          name: "placeId",
          title: "Google Place ID",
          type: "string", // For Places API integration
        },
      ],
    }),
    defineField({
      name: "siteIdentity",
      title: "Site Identity",
      type: "object",
      description: "Settings related to the site's identity",
      group: "identity",
      fields: [
        defineField({
          name: "logo",
          title: "Site Logos",
          type: "object",
          fields: [
            defineField({
              name: "logoDark",
              type: "image",
              description: "Logo to be used on light backgrounds",
            }),
            defineField({
              name: "logoLight",
              type: "image",
              description: "Logo to be used on dark backgrounds",
            }),
          ],
        }),
        defineField({
          name: "favicon",
          type: "image",
          title: "Favicon",
          description:
            "The favicon displayed in browser tabs, bookmarks, etc. Recommended size is 32x32 pixels.",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
