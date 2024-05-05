import { create } from 'zustand'

type SubscriptionState = {
  subscriptionName: string
  setSubscriptionName: (subscriptionName: string) => void
  subscriptionType: number
  setSubscriptionType: (subscriptionType: number) => void
  addOnIds: number[]
  setAddOnIds: (addOnIds: number[]) => void
}

const useSubStore = create<SubscriptionState>((set) => ({
  subscriptionName: 'Advanced',
  setSubscriptionName: (subscriptionName) => set({ subscriptionName }),
  subscriptionType: 0,
  setSubscriptionType: (subscriptionType) => set({ subscriptionType }),
  addOnIds: [],
  setAddOnIds: (addOnIds) => set({ addOnIds }),
}))

export default useSubStore
