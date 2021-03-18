[![Deploy to Firebase Hosting on merge](https://github.com/Terkea/pet_adoption/actions/workflows/firebase-hosting-merge.yml/badge.svg?branch=master)](https://github.com/Terkea/pet_adoption/actions/workflows/firebase-hosting-merge.yml)

[![Docker Image CI](https://github.com/Terkea/pet_adoption/actions/workflows/docker-image.yml/badge.svg?branch=master)](https://github.com/Terkea/pet_adoption/actions/workflows/docker-image.yml)

DEMO: https://pet-adoption-54bb1.web.app/

## Todos:

add autofill for city in search and createpost -- DONE
filter functionality -- DONE
view post edit post - add post views -- DONE
ADD PHONE NO IN REG FORM -- DONE
BUG MOMENT IN SEARCH PAGE AND POST PAGE -- DONE
navbar icon bug - create context for global state -- FIXED WITHOUT CONTEXT
ONE SECTION IS NOT CENTERED IN HOME PAGE -- DONE
ADD PADING TO HOMEPAGE MAIN SECTIONS -- DONE
LOADING TIME FOR SVGS -- DONE
DEPLOY -- DONE
LOGIN REGISTER ICONS -- DONE
FIREBASE ROUTER -- DONE
FAVICON AND TITLE -- DONE

BUG DELETE POST ??? idk how to reproduce
BUG TABLE
BUG SELECT CITY IN MAINPAGE AND CREATE

IF PET ANY DONT FILTER
FIX THE IMAGES AND POSSIBLY COME UP WITH A BETTER VERSION FOR THE GALLERY
SEARCH RANDOM INT MAINPAGE + ENABLE BUTTON
SEARCH LOWERSTRING
CLEANUP CODE
DOCS DEPLOY

# Firebase router

You need to make sure the rewrites are enabled in your Firebase hosting configuration to redirect all requests to your index.html file. This assumes you are using create-react-app:

```
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {"source": "/service-worker.js", "headers": [{"key": "Cache-Control", "value": "no-cache"}]}
    ]
  }
}
```
