import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

// To create a link between your Sanity Studio documents and their locations in the front-end, 
// update the resolve function created for your Presentation tool to generate dynamic links to your live preview.

export const resolve: PresentationPluginOptions['resolve'] = {

  
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/posts/${doc?.slug}`,
          },
          { title: 'Posts index', href: `/posts` },
        ],
      }),
    }),
    page: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
}