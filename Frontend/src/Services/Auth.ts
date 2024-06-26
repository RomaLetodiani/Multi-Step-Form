import api from '../Utils/axiosApi'

const AuthServices = {
  check: () => api.get('auth/check'),
  login: (body: { username: string; password: string }) => api.post('auth/login', body),
  logout: () => api.post('auth/logout'),
  register: (body: { username: string; email: string; password: string }) =>
    api.post('auth/register', body),
}

export default AuthServices
