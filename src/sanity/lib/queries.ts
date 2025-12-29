import { defineQuery } from "next-sanity";

// POSTS List Query
export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  },
  relatedPosts[]{
    _key, // required for drag and drop
    ...@->{_id, title, slug} // get fields from the referenced post
  }
}`);

// POSTS SLUGS LIST QUERY
export const POSTS_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`);

// POST QUERY
export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  },
  relatedPosts[]{
    _key, // required for drag and drop
    ...@->{_id, title, slug} // get fields from the referenced post
  }
}`);

// PAGE QUERY
export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
  content[]{
    ...,
    _type == "faqs" => {
      ...,
      faqs[]->{
  _id,
  title,
  body,
  "text": pt::text(body)
}
    }
  }
}`);

// Home page content query
export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  homePage->{
    ...,
    "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
    content[]
  }
}`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  title,
  description,
  "logo": logo.asset->url,
  siteIdentity {
    logo {
      logoDark {
        asset->
      }
    }
  },
  favicon {
    ...,
    asset->
  }
}`);

// Site Redirects Query
export const REDIRECTS_QUERY = defineQuery(`
  *[_type == "redirect" && isEnabled == true] {
      source,
      destination,
      permanent
  }
`);

export const OG_IMAGE_QUERY = defineQuery(`
  *[_id == $id][0]{
    title,
    "image": mainImage.asset->{
      url,
      metadata {
        palette
      }
    }
  }    
`);

// Site Map Query
// Fetch all pages and posts with defined slugs for sitemap generation
// Dynamically creates a complete path depending on the value of _type
// Returns that path as href, and the last updated date of the document

export const SITEMAP_QUERY = defineQuery(`
*[_type in ["page", "post"] && defined(slug.current)] {
    "href": select(
      _type == "page" => "/" + slug.current,
      _type == "post" => "/posts/" + slug.current,
      slug.current
    ),
    _updatedAt
}
`);

export const NAVIGATION_QUERY = `*[_type == "navigation" && title == "Main Navigation"][0]{
  title,
  items[]{
    label,
    "url": select(
      defined(externalUrl) => externalUrl,
      defined(link) => link->slug.current
    ),
    children[]{
      label,
      "url": select(
        defined(externalUrl) => externalUrl,
        defined(link) => link->slug.current
      ),
      children[]{
        label,
        "url": select(
          defined(externalUrl) => externalUrl,
          defined(link) => link->slug.current
        )
      }
    }
  }
}`;
