<img src="https://osam.app/img/icon.svg" />

 *ȯsäm*  /ˈɔːsəm/ *awesome*  https://osam.app is a tiny app to help manage, search, re-style, and render elemental graphics; like illustrations, icons, logos, badges, and symbols.

OSAM gives graphic-seekers under your brand: exactly what they need, where they need it, and how they need it delivered.  With single-source files being remixable live within the app.
 
 

  ![example image](https://raw.githubusercontent.com/andyfitz/osam/gh-pages/img/manipulation.gif)


 Here's how it will work:
 
 ![app summary for users](https://osam.app/img/user.svg)


And for content contributors / admins:

![app summary for admins](https://osam.app/img/admin.svg)




### Status ?

Currently OSAM is a very simple VUE.js app that is being bundled in Electron for distribution as an offline app.

The example files hosted in this repo are for testing only.  Ideally OSAM will work as a DAM for various projects using their own files and style parameters.


- [x] live SVG styling with external CSS 
- [X] PNG rendering / download
- [x] SVG rendering /download (combined custom CSS with minimal SVG) 
- [ ] Offline syncing with online repository


- [x] buildable as a web app
- [x] buildable as a linux flatpack
- [x] buildable as a macosx package



#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

 

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[cf53551](https://github.com/SimulatedGREG/electron-vue/tree/cf53551a209b49220525e7de80f1c541d7096aef) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
