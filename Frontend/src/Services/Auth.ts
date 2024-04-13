import api from '../Utils/axiosApi'

const AuthServices = {
  login: (body: { username: string; password: string }) => api.post('/auth/login', body),
  logout: () => true,
  register: () => true,
}

export default AuthServices
