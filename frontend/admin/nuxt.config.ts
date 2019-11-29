import dotenv from "dotenv";
const envPath = `./.env.${process.env.ENV || 'local'}`
dotenv.config({ path: envPath });

export default {
  mode: "spa",
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
    base: process.env.BASE_DIR || '/admin',
  },
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },

    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@nuxtjs/axios",
  ],
  axios: {
    baseURL: process.env.APP_API_URL || '/api'
  },
  plugins: ["./plugins/ant-design-vue", "./plugins/axios"]
}
