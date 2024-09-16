import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { loadEnv } from "vite";
const {
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_PREVIEW_TOKEN,
  DEV
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");
import contentful from 'contentful';
import tailwind from "@astrojs/tailwind";
const client = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  environment: 'master',
  // defaults to 'master' if not set
  accessToken: DEV ? CONTENTFUL_PREVIEW_TOKEN : CONTENTFUL_DELIVERY_TOKEN
});
const itemsObject = await client.getEntries({
  content_type: 'wiki',
  select: 'fields.slug,fields.title'
}).then(entry => entry.items.map(item => {
  return {
    label: item.fields.title,
    link: `/wiki/${item.fields.slug}`
  };
})).catch(console.error);

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
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