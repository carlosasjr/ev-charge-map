import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.API })
api.defaults.withCredentials = true

const axiosOpenCharge = axios.create({ baseURL: 'https://api.openchargemap.io/v3/poi/' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api
  app.config.globalProperties.$axiosOpenCharge = axiosOpenCharge
})

export { api, axiosOpenCharge }
