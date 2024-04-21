import { create } from 'zustand'
import AuthServices from '../../Services/Auth'
import { UserServices } from '../../Services/User'
import { userI } from '../../Types/user'

interface AuthStore {
  user: userI | null
  getDetails: () => void
  check: () => void
  isAuthenticated: boolean
  loading: boolean
  authenticationError: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  register: (username: string, email: string, password: string) => Promise<void>
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
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
    set({ loading: true })
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
      .finally(() => {
        set({ loading: false })
      })
  },
  logout: async () => {
    set({ loading: true })
    await AuthServices.logout()
      .then(() => {
        // After logging out on the backend, update the store
        set({ isAuthenticated: false, authenticationError: false })
      })
      .catch((error) => {
        console.error('Error during logout: ', error)
      })
      .finally(() => {
        set({ loading: false })
      })
  },
  register: async (username: string, email: string, password: string) => {
    set({ loading: true })
    await AuthServices.register({ username, email, password })
      .then((response) => {
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
      .finally(() => {
        set({ loading: false })
      })
  },
  getDetails: async () => {
    set({ loading: true })
    await UserServices.getDetails()
      .then((resp) => {
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
      })
      .finally(() => {
        set({ loading: false })
      })
  },
}))

export default useAuthStore
