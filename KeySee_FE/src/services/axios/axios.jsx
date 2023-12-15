import axios from 'axios'
import { COOKIE_NAME, HTTP_CODES } from 'src/common/constants/constants'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json;charset=utf-8'
  },
  timeout: 60000 * 2 // 2 minutes
})

AXIOS.defaults.withCredentials = true

AXIOS.interceptors.request.use(
  (conf) => {
    const tokenCookie = cookies.get(COOKIE_NAME.AUTHENTICATION)
    conf.headers.Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tokenCookie) {
      conf.headers.Authorization = `Bearer ${tokenCookie}`
    }
    return conf
  },
  (error) => Promise.reject(error)
)

export const checkResponseAxios = (callback) => {
  AXIOS.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusCode = error.response?.status || error.request.status
      if (!error.request?.status === HTTP_CODES.NETWORK_ERROR) {
        callback(statusCode)
      }
      const errorCodes = [
        HTTP_CODES.UNAUTHORIZED,
        HTTP_CODES.FORBIDDEN,
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        HTTP_CODES.NETWORK_ERROR,
        HTTP_CODES.NOT_FOUND
      ]
      if (errorCodes.includes(statusCode)) {
        callback && callback(statusCode)
      } else {
        return Promise.reject(error)
      }
    }
  )
}

export default AXIOS
