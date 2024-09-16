import contentful, { type EntryFieldTypes } from "contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

export interface Page {
  contentTypeId: string;
  fields: {
    title: EntryFieldTypes.Text;
    pageContent: EntryFieldTypes.RichText;
    date: EntryFieldTypes.Date;
    slug: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
  };
}
export interface FinancePage {
  contentTypeId: "financeWiki";
  fields: {
    title: EntryFieldTypes.Text;
    pageContent: EntryFieldTypes.RichText;
    date: EntryFieldTypes.Date;
    slug: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
  };
}

export interface OrgPage {
  contentTypeId: "orgsWiki";
  fields: {
    title: EntryFieldTypes.Text;
    pageContent: EntryFieldTypes.RichText;
    date: EntryFieldTypes.Date;
    slug: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
  };
}
