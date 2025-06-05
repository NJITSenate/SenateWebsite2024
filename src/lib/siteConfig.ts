import roles from "./config/roles.json";
import committees from "./config/committees.json";
interface SiteConfig {
  clubDataUrl: string;
  announcmentsSheetUrl: string;
  rosterSheetUrl: string;
  committeesSheetUrl: string;
  pageIndexSheetUrl: string;
  pagesFolderID: string;
  metaDataSheetUrl: string;
  minutesIds: {
    id: string;
    name: string;
  }[];
  roles: {
    [key: string]: {
      label: string;
      content: {
        title: string;
        description: string;
      };
    }[];
  };
  committees: {
    [key: string]: {
      label: string;
      abbreviation: string;
      description: string;
    };
  };
  archive: {
    [key: string]: {
      pagesFolderID: string;
      announcmentsSheetUrl: string;
      metaDataSheetUrl: string;
      rosterSheetUrl: string;
      committeesSheetUrl: string;
      pageIndexSheetUrl: string;
    };
  };
}

export let siteConfig: SiteConfig = {
  clubDataUrl:
    "https://njit.campuslabs.com/engage/api/discovery/search/organizations?orderBy[0]=UpperName asc&top=150&filter=(BranchId%20eq%20296346)",
  archive: {
    "2425": {
      pagesFolderID: "1oTTXkMehSivsM1MM4vmqL3u6XRgIpLai",
      announcmentsSheetUrl:
        "https://docs.google.com/spreadsheets/d/11pXrj7FqBO5hMXyJgBB8XwrXfiBXs-nMxPtudWqcjnw/export?format=csv",
      metaDataSheetUrl:
        "https://docs.google.com/spreadsheets/d/1tqFA7RIWxHS_JNYORKpUAI5cNfslHdds-DLjwBgiHJo/export?format=csv",
      rosterSheetUrl:
        "https://docs.google.com/spreadsheets/d/1II800-_nlNJ_YAj_SIghSoWSaVp7FDvd6FquiHU1T84/export?format=csv",
      committeesSheetUrl:
        "https://docs.google.com/spreadsheets/d/1a7MvIOCrFoD_cJmj0txVgu7eIurH7wRS6cubYHcxVzc/export?format=csv",
      pageIndexSheetUrl:
        "https://docs.google.com/spreadsheets/d/1iO9LJBg739viwl7r_Pscbw9jrAl9U3k48KL6nFfNQ2M/export?format=csv",
    },
  },

  pagesFolderID: "1oTTXkMehSivsM1MM4vmqL3u6XRgIpLai",
  announcmentsSheetUrl:
    "https://docs.google.com/spreadsheets/d/1m6s44oyUdAjzqrhj1WspOKxN_tbP8pdFaFdk1bDjncQ/export?format=csv",
  metaDataSheetUrl:
    "https://docs.google.com/spreadsheets/d/1tiX9fDrYI0bTQ2Oeg_fQXlQ-k6vi8mbB_r6Phr_3mDc/export?format=csv",
  rosterSheetUrl:
    "https://docs.google.com/spreadsheets/d/16AG5QFwrYwZTXzbs3-6A1kkEjBfDVzVa0MMbFmp-r6M/export?format=csv",
  committeesSheetUrl:
    "https://docs.google.com/spreadsheets/d/1nVliL0vMSBYYpMRNHNlsD8up4_keWkbYW-H0O93ekcw/export?format=csv",
  pageIndexSheetUrl:
    "https://docs.google.com/spreadsheets/d/1tlIbLAC50bt8_VZBKEQct8Q4PMMqy7pGlvCUBCBQfps/export?format=csv",

  roles: roles,
  committees: committees,
  minutesIds: [
    // {
    //   id: "",
    //   name: "2025-2026 Senate Minutes",
    // },
    {
      id: "1MpChG0_fguI7sX3Th43xpgmbZnERDv-K",
      name: "2024-2025 Senate Minutes",
    },
    {
      id: "1UWYU7B_lb1fHq93tmFUEK2RZk6wv5ALh",
      name: "2023-2024 Senate Minutes",
    },
    {
      id: "1Z-_RqJjL_5FCt7qqRGnhr599iIrtnKom",
      name: "2022-2023 Senate Minutes",
    },
    {
      id: "1_08sS8dww6UU5RcZH-rUKK6NTQ4Mcm5R",
      name: "2021-2022 Senate Minutes",
    },
    {
      id: "1U0uYacyrh5EqdNrfVw6g5OvocL0aAMID",
      name: "2020-2021 Senate Minutes",
    },
    {
      id: "1VNfVc4UekdyWeNmh4iJhy10GCGzuDmvY",
      name: "2019-2020 Senate Minutes",
    },
    {
      id: "1uLacUo4e24qQdoTUcXhEF270ScxIwwmd",
      name: "2018-2019 Senate Minutes",
    },
  ],
};
