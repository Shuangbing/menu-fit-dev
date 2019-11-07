import dotenv from "dotenv";
const envPath = `./.env.${process.env.ENV || 'local'}`
dotenv.config({ path: envPath });

export default {
  mode: "universal",
  env: {},
  head: {
    title: "Menu.fit - Admin",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "./favicon.ico" }
    ]
  },
  loading: false,
  css: ["~/assets/css/main.css"],
  generate: {
    dir: "../../server/public/admin",
  },
  router: {
    base: process.env.BASE_DIR || './',
  },
  build: {},
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@nuxtjs/axios",
  ],
  axios: {
    baseURL: process.env.APP_API_URL || '/api'
  },
  plugins: ["./plugins/ant-design-vue", "./plugins/axios"]
}
