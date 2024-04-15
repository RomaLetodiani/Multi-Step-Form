import axios from 'axios'
import qs from 'qs'
const api = axios.create({
  withCredentials: true,
  baseURL:
    import.meta.env.VITE_ENV === 'production'
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_API_URL_DEV,
})

api.interceptors.request.use((config: any) => {
  config.paramsSerializer = (p: any) => qs.stringify(p, { arrayFormat: 'repeat' })
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to the homepage if the response status is 401 (Unauthorized)
      window.location.pathname = '/'
    }
    // Return the rejected promise to maintain the error chain
    return Promise.reject(error)
  },
)

export default api
