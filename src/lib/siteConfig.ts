import roles from "./config/roles.json";
import committees from "./config/committees.json";
interface SiteConfig {
  clubDataUrl: string;
  announcmentsSheetUrl: string;
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
}

export let siteConfig: SiteConfig = {
  clubDataUrl:
    "https://njit.campuslabs.com/engage/api/discovery/search/organizations?orderBy[0]=UpperName asc&top=150&filter=(BranchId%20eq%20296346)",
  announcmentsSheetUrl:
    "https://docs.google.com/spreadsheets/d/11pXrj7FqBO5hMXyJgBB8XwrXfiBXs-nMxPtudWqcjnw/export?format=csv",
  roles: roles,
  committees: committees,
};
