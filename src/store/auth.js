import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
      this.user = jwtDecode(token)
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
    checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.setToken(token)
      }
    }
  }
})
