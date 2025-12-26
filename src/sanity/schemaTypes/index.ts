import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { pageType } from "./pageType";
import { pageBuilderType } from "./pageBuilderType";
import { faqType } from "./faqType";
import { faqsType } from "./blockSchemas/faqsType";
import { featuresType } from "./blockSchemas/featuresType";
import { heroType } from "./blockSchemas/heroType";
import { splitImageType } from "./blockSchemas/splitImageType";
import { siteSettingsType } from "./siteSettingsType";
import { seoType } from "./seoType";
import { redirectType } from "./redirectType";
import { socialType } from "./socialType";
import { navigationType } from "./navigation";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    pageType,
    pageBuilderType,
    faqType,
    faqsType,
    featuresType,
    heroType,
    splitImageType,
    siteSettingsType,
    seoType,
    redirectType,
    socialType,
    navigationType,
  ],
};
