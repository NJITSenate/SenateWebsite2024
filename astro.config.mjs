import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { loadEnv } from "vite";
import { parse } from "csv/sync";
import tailwind from "@astrojs/tailwind";
let data_sheets = await fetch(
  "https://docs.google.com/spreadsheets/d/1iO9LJBg739viwl7r_Pscbw9jrAl9U3k48KL6nFfNQ2M/export?format=csv"
);
let data = await data_sheets.text();
//csv to json
let drive_doc_ids = parse(data);
drive_doc_ids = drive_doc_ids.map((doc) => {
  return {
    name: doc[0],
    slug: doc[1],
    description: doc[2],
    uri: doc[3],
    category: doc[4],
    hidden: doc[5],
  };
});

drive_doc_ids = drive_doc_ids.slice(1);

let categories = drive_doc_ids
  .filter((item) => item.hidden !== "TRUE")
  .map((item) => item.category);
categories = [...new Set(categories)];

let itemsObject = categories.map((category) => {
  return {
    label: category,
    items: drive_doc_ids
      .filter((item) => item.category === category && item.hidden !== "TRUE")
      .map((item) => {
        return {
          label: item.name,
          link: `/wiki/${item.slug}`
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
  "output": "static",
  vite: {
    ssr: {
      noExternal: ['execa', 'is-stream', 'npm-run-path'],
    },
  },  
  site: 'https://njitsenate.org/',
  // base: 'SenateWebsite2024',
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
      label: 'Senate Wiki',
      items: [{
        label: 'Join Student Senate',
        link: '/wiki/join'
      },...itemsObject]
    },{
      label: 'Student Orgs Info',
      items:[ {
        label: 'Making New Clubs',
        link: '/wiki/making-new-clubs'
      }
    ]
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