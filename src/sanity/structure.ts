/**
 * Configures the structure and navigation of the Sanity Studio desk.
 *
 * Organizes document types into a hierarchical list with:
 * - Primary content types (Posts, Categories, Authors, Pages, FAQs) at the top
 * - A divider separating primary from secondary content
 * - Remaining document types automatically filtered and listed
 * - A dedicated Site Settings editor for global configuration
 *
 * @param S - The Sanity structure builder instance
 * @returns A configured list structure for the Sanity Studio desk
 *
 * @see https://www.sanity.io/docs/structure-builder-cheat-sheet
 */
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "page",
            "faq",
            "siteSettings",
          ].includes(item.getId()!)
      ),
      S.listItem()
        .id("siteSettings")
        .schemaType("siteSettings")
        .title("Site Settings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      // S.documentTypeListItem("redirect").title("Redirects"),
    ]);
