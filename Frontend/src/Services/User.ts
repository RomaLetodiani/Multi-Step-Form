import api from '../Utils/axiosApi'

export const UserServices = {
  getDetails: () => api.get('users/details'),
}
