import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.API })
api.defaults.withCredentials = true

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

const axiosOpenCharge = axios.create({ baseURL: 'https://api.openchargemap.io/v3/poi/' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api
  app.config.globalProperties.$axiosOpenCharge = axiosOpenCharge
})

export { api, axiosOpenCharge }
