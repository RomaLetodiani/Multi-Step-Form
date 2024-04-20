import { create } from 'zustand'
import { UserServices } from '../../Services/User'
import { userI } from './Interfaces'

interface AuthStore {
  user: userI | null
  getDetails: () => void
}

const useUserStore = create<AuthStore>((set) => ({
  user: null,
  getDetails: async () => {
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
    })
  },
}))

export default useUserStore
