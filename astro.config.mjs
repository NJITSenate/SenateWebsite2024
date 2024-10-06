import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { loadEnv } from "vite";
import { parse } from "csv/sync";
import tailwind from "@astrojs/tailwind";
import * as jsdom from "jsdom";


  let pageDataArr = [];
async function recursiveFolderSearch(driveId, catagory) {
  let folder = await fetch(
    "https://drive.google.com/drive/folders/" + driveId
  );
  let folder_data = await folder.text();//get the html of the folder page on google drive
  const folder_doc = new jsdom.JSDOM(folder_data).window.document; //parse the html
  let links = folder_doc.querySelectorAll("[data-id]");//get all the links in the folder with a data-id attribute
  let lins_arr = [...links]; //convert the nodelist to an array
  //if there is a aria-label="Google Drive Folder" in it, it is a folder
  let folders = lins_arr.filter((link) =>
    link.querySelector("[aria-label='Google Drive Folder']")
  );
  let docs = lins_arr.filter(
    (link) =>{
      let aria_label_type = link.querySelector("[aria-label]")?.getAttribute("aria-label").split("Google")[1];
      // only of the aria_label_type is Docs , so not Sheets, Slides, Drive Folder, etc
      if(aria_label_type == null) return false;
      return aria_label_type.trim().toLowerCase() == "docs"; 
    } );

  for (let i = 0; i < folders.length; i++) {//for all the folders in the folder, call the function again
    await recursiveFolderSearch(
      folders[i].getAttribute("data-id"),
      folders[i].querySelector("[data-tooltip]")?.textContent
    );
  }
  for (let i = 0; i < docs.length; i++) {
    if (docs[i].getAttribute("data-id") == "_gd") continue;//if the data-id is _gd, skip it
    pageDataArr.push({//format the data
      id: docs[i].getAttribute("data-id"),
      uri:
        "https://docs.google.com/document/d/" +
        docs[i].getAttribute("data-id"),
      type: docs[i].getAttribute("data-target"),
      name: docs[i].querySelector("[data-list-item-target] div[jsname]")
        ?.textContent,
      slug: docs[i]
        .querySelector("[data-list-item-target] div[jsname]")
        ?.textContent.replace(/\s+/g, "-")
        .toLowerCase(),
      catagory: catagory,
      hidden: "FALSE",//we assume these are visible
    });
  }
}
let temp=[]

let itemsObject =await recursiveFolderSearch("1oTTXkMehSivsM1MM4vmqL3u6XRgIpLai", undefined)//call the function with the root folder id
.then(
  async () => {//for other pages that are not in the drive
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
        uri: doc[3],
        category: doc[4],
        hidden: doc[5],
      };
    });
    //merge the two arrays
    drive_doc_ids = [...drive_doc_ids, ...pageDataArr];
    //remove hidden pages
    drive_doc_ids = drive_doc_ids.filter((doc) => doc.hidden == "FALSE");
  // console.log(drive_doc_ids);
  let catagorys=[]
drive_doc_ids.map((doc) => {
    catagorys.push(doc.catagory)
  }
  );
 
  catagorys = [...new Set(catagorys)];
catagorys = catagorys.filter((catagory) => catagory != undefined);  
  let itemsObject = catagorys.map((catagory) => {
    let obj={
      label: catagory,
      items: [
       ... drive_doc_ids.map((doc) => {
          if (doc.catagory == catagory) {
            return {
              label:doc.name,
              link: "/wiki/" +doc.slug,
            };
          }
        }
        )

    ]
    }
    //remove undefined 
    obj.items = obj.items.filter((item) => item != undefined);

    //add the ones without a category to the obj
    let uncategorized = drive_doc_ids.filter((doc) => doc.catagory == ""||doc.catagory == undefined||doc.catagory == null);
  // add to the top level
  temp = uncategorized.map((doc) => {
    return {
      label: doc.name,
      link: "/wiki/" + doc.slug,
    };
  }
  );
  
    obj.items = obj.items.filter((item) => item != undefined
  );

  
    
    return [...temp,obj];
  }
  );
  return itemsObject;
}
);


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
      Header: './src/components/Header.astro',
      Footer: './src/components/Footer.astro',
    },
    title: 'NJIT Student Senate',
    social: {
      instagram:"https://www.instagram.com/njit_senate/",
      // "linkedin":"https://www.linkedin.com/company/njitstudentsenate/",
      youtube:"https://www.youtube.com/channel/UCUulNEb3_PULQLlAh4mmE1Q?view_as=subscriber",
      // facebook:"https://www.facebook.com/NJITSenate1925/",
      // "x.com":"https://twitter.com/NJIT_Senate",
      "discord":"https://discord.com/invite/Qh6safJNwM",
      // "github":"https://github.com/NJITSenate",
      "email":"mailto:senate@njit.edu",
    },
    logo: {
      "src": "/public/SVG_Logo.svg",
      replacesTitle: true,
      alt: "NJIT Student Senate Logo"
    },
    sidebar: (itemsObject).flat(),
    customCss: ['./src/styles/custom.css',"./src/tailwind.css"],
    head:[
    {
tag:"script",
attrs:{
  "is:inline":true,
  src:"https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.js"

},
    },{
      tag:"meta",
      attrs:{
        name:"theme-color",
        content:"#233251"
      }
    },
    {
      tag:"meta",
      attrs:{
        name:"manifest",
        content:"/manifest.json"
      }
    }
    ]
  }),     tailwind({
    applyBaseStyles: false,
  }),]
});