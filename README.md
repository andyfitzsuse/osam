![logo](https://raw.githubusercontent.com/andyfitz/osam/gh-pages/img/graphic.png)

 *ȯsäm*  /ˈɔːsəm/ *awesome*  https://osam.app is a tiny app that may someday be handy for managing, searching, re-styling, and downloading SVG assets.
 
 Here's how it will work 
 
 ![app summary for users](https://raw.githubusercontent.com/andyfitz/osam/gh-pages/img/user.png)


And for content admins

![app summary for admins](https://raw.githubusercontent.com/andyfitz/osam/gh-pages/img/admin.png)




### Status ?

Currently OSAM is a very simple VUE.js app that is being bundled in Electron for use as an offline app


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

https://raw.githubusercontent.com/andyfitz/osam/gh-pages/img/osam-user.png

---

This project was generated with (https://github.com/SimulatedGREG/electron-vue/tree/cf53551a209b49220525e7de80f1c541d7096aef) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
