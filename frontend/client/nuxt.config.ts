import dotenv from "dotenv";
const envPath = `./.env.${process.env.ENV || 'local'}`
dotenv.config({ path: envPath });

export default {
  mode: "spa",
  env: {},
  head: {
    title: "Menu.fit",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
  loading: false,
  css: ["~/assets/css/main.css"],
  generate: {
    dir: "../../server/public/client",
  },
  router: {
    base: process.env.BASE_DIR || '/',
  },
  build: {
    postcss: [
      require('postcss-pxtorem')({
        rootValue: 30,
        minPixelValue: 3,
        propWhiteList: []
      })
    ]
  },
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/router"
  ],
  axios: {
    baseURL: process.env.APP_API_URL || '/api'
  },
  plugins: ["./plugins/mand-mobile", "./plugins/axios"]
}
