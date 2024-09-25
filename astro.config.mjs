import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { loadEnv } from "vite";
import tailwind from "@astrojs/tailwind";
let data_sheets = await fetch(
  "https://docs.google.com/spreadsheets/d/1iO9LJBg739viwl7r_Pscbw9jrAl9U3k48KL6nFfNQ2M/export?format=csv"
);
let data = await data_sheets.text();
//csv to json
let drive_doc_ids = data.split("\n").slice(1).map((line) => {
 
  let [Name, user_friendly_slug, description, uri, category, hidden] = line.split(",");
  return { Name, user_friendly_slug, description, uri, category, hidden };
});
// let itemsObject = drive_doc_ids.map((item) => {
//   return {
//     label: item.Name,
//     link: `/wiki/${item.user_friendly_slug}`
//   };
// }
// );
//get a list of categories that have at least one item that is not hidden
let categories = drive_doc_ids
  .filter((item) => item.hidden !== "TRUE")
  .map((item) => item.category);
//remove duplicates
categories = [...new Set(categories)];

let itemsObject = categories.map((category) => {
  return {
    label: category,
    items: drive_doc_ids
      .filter((item) => item.category === category && item.hidden !== "TRUE")
      .map((item) => {
        return {
          label: item.Name,
          link: `/wiki/${item.user_friendly_slug}`
        };
      })
  };
}
);





// await client.getEntries({
//   content_type: 'wiki',
//   select: 'fields.slug,fields.title'
// }).then(entry => entry.items.map(item => {
//   return {
//     label: item.fields.title,
//     link: `/wiki/${item.fields.slug}`
//   };
// })).catch(console.error);

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    disable404Route: true,
    favicon: './favicon.png',
    components: {
      Header: './src/components/Header.astro'
    },
    title: 'NJIT Student Senate Wiki',
    social: {
      instagram:"https://www.instagram.com/njit_senate/",
      // "linkedin":"https://www.linkedin.com/company/njitstudentsenate/",
      youtube:"https://www.youtube.com/channel/UCUulNEb3_PULQLlAh4mmE1Q?view_as=subscriber",
      // facebook:"https://www.facebook.com/NJITSenate1925/",
      // "x.com":"https://twitter.com/NJIT_Senate",
      "discord":"https://discord.com/invite/Qh6safJNwM",
      // "github":"https://github.com/NJITSenate",
      "email":"mailto:senate@njit.edu"
    },
    logo: {
      "src": "/public/SVG_Logo.svg",
      replacesTitle: true,
      alt: "NJIT Student Senate Logo"
    },
    sidebar: [{
      label: 'Student Org Wiki',
      items: itemsObject
    }],
    customCss: ['./src/styles/custom.css',"./src/tailwind.css"],
    head:[
    {
tag:"script",
attrs:{
  "is:inline":true,
  src:"https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.js"

},
    }
    ]
  }),     tailwind({
    applyBaseStyles: false,
  }),]
});