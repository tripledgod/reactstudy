import http from '../utils/http'
const authApi = {
  registerAccount: (email, password) => http.post('/register', email, password),
  loginAccount: (email, password) => http.post('/login', email, password),
  logout: () => http.post('/logout')
}

export default authApi
