import { create } from 'zustand'
import AuthServices from '../../Services/Auth'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface AuthStore {
  isAuthenticated: boolean
  authenticationError: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  register: (username: string, email: string, password: string) => Promise<void>
}

const useAuthStore = create<AuthStore>((set) => {
  let isAuthenticated = false
  const token = Cookies.get('token_id')
  if (token) {
    const { exp } = jwtDecode(token)
    if (exp) {
      const now = Math.floor(Date.now() / 1000)
      if (exp - now > 60) {
        isAuthenticated = true
        console.log('🚀 User Authenticated')
      } else {
        isAuthenticated = false
        console.log('🚀 User Authentication Failed')
      }
    }
  }

  return {
    isAuthenticated,
    authenticationError: false,
    login: async (username: string, password: string) => {
      await AuthServices.login({ username, password })
        .then(async (response) => {
          if (response.status === 200) {
            set({
              isAuthenticated: true,
            })
          }
        })
        .catch((error) => {
          console.error('Error during login: ', error)
          set({
            isAuthenticated: false,
            authenticationError: true,
          })
        })
    },
    logout: async () => {
      await AuthServices.logout()
        .then(() => {
          // After logging out on the backend, update the store
          set({ isAuthenticated: false, authenticationError: false })
        })
        .catch((error) => {
          console.error('Error during logout: ', error)
        })
    },
    register: async (username: string, email: string, password: string) => {
      await AuthServices.register({ username, email, password }).then((response) => {
        if (response.status === 200) {
          set({
            isAuthenticated: true,
          })
        } else {
          console.error('Registration failed')
          set({
            isAuthenticated: false,
            authenticationError: true,
          })
        }
      })
    },
  }
})

export default useAuthStore
