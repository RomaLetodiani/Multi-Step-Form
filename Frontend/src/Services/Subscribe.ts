import api from '../Utils/axiosApi'

export const SubscribeServices = {
  subscribe: (email: string) => api.post('subscription', { email }),
  unsubscribe: () => api.delete('subscription'),
}
