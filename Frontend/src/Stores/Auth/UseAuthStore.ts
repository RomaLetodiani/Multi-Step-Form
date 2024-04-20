import { create } from 'zustand'
import AuthServices from '../../Services/Auth'
import { UserServices } from '../../Services/User'
import { userI } from '../../Types/user'

interface AuthStore {
  user: userI | null
  getDetails: () => void
  check: () => void
  isAuthenticated: boolean
  authenticationError: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  register: (username: string, email: string, password: string) => Promise<void>
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  authenticationError: false,
  check: async () =>
    await AuthServices.check()
      .then((response) => {
        if (response.status === 200) {
          set({
            isAuthenticated: true,
          })
        } else {
          set({
            isAuthenticated: false,
          })
        }
      })
      .catch((error) => {
        console.error('Error checking authentication: ', error.message)
        set({
          isAuthenticated: false,
        })
      }),
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
        console.error('Error during login: ', error.message)
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
  getDetails: async () =>
    await UserServices.getDetails().then((resp) => {
      if (resp.status === 200) {
        set({
          user: resp.data.user,
        })
      } else {
        console.log('Error getting user details')
        set({
          user: null,
        })
      }
    }),
}))

export default useAuthStore
