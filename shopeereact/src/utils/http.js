import axios from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { clearAccessTokenToLS, getAccessTokenFromLS, saveAccessTokenToLS, setProfileToLS } from './auth'
import { toast } from 'react-toastify'

class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          this.accessToken = response.data.data.access_token
          saveAccessTokenToLS(this.accessToken)
          setProfileToLS(response?.data.data.user)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearAccessTokenToLS()
        }
        return response
      },
      function (error) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const message = error.response?.data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
