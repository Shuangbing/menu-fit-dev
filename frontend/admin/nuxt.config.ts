export default {
  ssr: false,
  env: {},
  head: {
    title: "Menu.fit - Admin",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js TypeScript project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
  loading: false,
  css: ["~/assets/css/main.css"],
  build: {},
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@nuxtjs/axios",
  ],
  axios: {
    baseURL: 'http://localhost:3000/api'
  },
  plugins: ["./plugins/ant-design-vue", "./plugins/axios"]
}
