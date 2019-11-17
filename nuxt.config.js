const config = require("./assets/build/config.json");
const routes = require("./assets/build/routes.json");
const resources = require("./assets/build/resources.json");
const meta = require("./assets/build/meta.json");

const { baseUrl } = config;

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
      { hid: 'description', name: 'description', content: config.description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}/build/favicon.ico` }
    ],
    script: resources.filter((el) => /\.js$/.test(el)).map((src) => {return {src: `${baseUrl}${src}`}})
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
    '@nuxt/typescript-build'
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
    extend (config, ctx) {
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
  }
}
