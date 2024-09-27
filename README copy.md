`https://www.jsonquerytool.com/`  
`https://njit.campuslabs.com/engage/api/discovery/search/organizations?top=240`

```js
input.value.map((e) => {
  return {
    website: "https://njit.campuslabs.com/engage/organization/" + e.WebsiteKey,
    name: e.Name,
    ShortName: e.ShortName,
    Summary: e.Summary,
    Description: e.Description,
    pfp: "https://se-images.campuslabs.com/clink/images/" + e.ProfilePicture,
  };
  // return e
});
```
