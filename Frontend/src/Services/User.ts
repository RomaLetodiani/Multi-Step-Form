import api from '../Utils/axiosApi'

export const UserServices = {
  getDetails: () => api.get('users/details'),
  sendEmailVerification: () => api.post('users/sendEmail'),
  verifyEmail: (verificationCode: string) => api.post('users/verifyEmail', { verificationCode }),
}
