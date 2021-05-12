export default {
  schema:  process.env.VUE_APP_API_SCHEMA ? process.env.VUE_APP_API_SCHEMA: "http",
  baseURL: process.env.VUE_APP_API_BASE,
  version: process.env.VUE_APP_API_VERSION,
  cdnUrl:  process.env.VUE_APP_CDN_URI,
};
