import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        async login(email, password) {
           try {
                const res = await axios.post('/api/v1/login', { email, password })
                const resData = res.data

                this.token = resData.data.token
                this.user = resData.data.user
                localStorage.setItem('token', this.token)

                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

                return res
            } catch (err) {
                return err
            }
        },
        async checkAuth() {
            const token = localStorage.getItem('token')
            
            if (token) {
                this.token = token
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                try {
                    const res = await axios.get('/api/v1/me')
                    const resData = res.data
                    
                    this.user = resData.data.user
                 } catch (err) {
                    this.logout()
                }
            }
        },
        async logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        }
    }
})
