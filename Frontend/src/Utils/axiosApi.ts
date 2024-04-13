import axios from 'axios'
import qs from 'qs'
const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
})

// api.interceptors.request.use((config: any) => {
//   config.paramsSerializer = (p: any) => qs.stringify(p, { arrayFormat: 'repeat' })
//   return config
// })

// api.interceptors.response.use(
//   (response: any) => response.data,
//   async (error) => {
//     if (error.status === 401) {
//       window.location.pathname = '/'
//     }
//     return await Promise.reject(error)
//   },
// )

export default api
