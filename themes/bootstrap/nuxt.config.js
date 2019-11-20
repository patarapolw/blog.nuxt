const config = require("./assets/build/config.json");
const routes = require("./assets/build/routes.json");
const resources = require("./assets/build/resources.json");
const meta = require("./assets/build/meta.json");
const { currentPosts } = require("./assets/util.js");
const QParser = require("q2filter").default;
const htmlToText = require('html-to-text');

const { baseUrl } = config;

const qp = new QParser("", {
  isDate: ["date"],
  sortBy: {
    key: "date",
    desc: true
  }
});

const h = qp.parse(currentPosts())[0];
const metaImage = h ? h.image : config.image;
const description = htmlToText.fromString((h ? h.teaser : config.description) || "");

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: config.title || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      {
        hid: 'og:title',
        property: 'og:title',
        content: config.title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: metaImage
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: config.fullUrl
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: config.title
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: description
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: metaImage
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}/build/favicon.ico` },
      // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css' }
    ],
    script: [
      ...resources.filter((el) => /\.js$/.test(el)).map((src) => { return { src: `${baseUrl}${src}` } })
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'highlight.js/styles/default.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/disqus'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.module.rules.push(
        {
          test: /\.html$/,
          loader: 'raw-loader'
        }
      )
    }
  },
  router: {
    base: `${baseUrl}/`
  },
  generate: {
    routes,
    dir: `${meta.filepath}/${config.outDir || "dist"}`
  },
  server: {
    host: "0.0.0.0"
  },
  env: {
    description
  }
}
