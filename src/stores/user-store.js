import { defineStore } from 'pinia'
import { api, TOKEN_NAME } from 'src/boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: '',
      first_name: '',
      last_name: '',
      email: ''
    }
  }),

  getters: {
    getUser: (state) => { return state.user },
    getFirstName: (state) => { return state.user.first_name },
    getLastName: (state) => { return state.user.last_name },
    getFirstLettersOfName: (state) => {
      return state.user.first_name[0].toUpperCase() +
             state.user.last_name[0].toUpperCase()
    }
  },

  actions: {
    async getSanctumCookie () {
      try {
        await api.get('/sanctum/csrf-cookie')
      } catch (error) {
        if (error) throw error
      }
    },

    async login (email, password) {
      try {
        const response = await api.post('api/auth/token', { email, password })

        const token = response.data.token

        localStorage.setItem(TOKEN_NAME, token)

        api.defaults.headers.common.Authorization = 'Bearer ' + token
      } catch (error) {
        if (error) throw error
      }
    },

    async logout () {
      try {
        await api.post('api/auth/logout')

        localStorage.removeItem(TOKEN_NAME)
      } catch (error) {
        if (error) throw error
      }
    },

    async register (user) {
      try {
        const response = await api.post('api/register', user)

        const token = response.data.token

        localStorage.setItem(TOKEN_NAME, token)

        api.defaults.headers.common.Authorization = 'Bearer ' + token
      } catch (error) {
        if (error) throw error
      }
    },

    async update (user) {
      try {
        await api.put('api/user', user)
      } catch (error) {
        if (error) throw error
      }
    },

    async fetchUser () {
      try {
        const token = localStorage.getItem(TOKEN_NAME)

        if (!token) return

        const response = await api.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        api.defaults.headers.common.Authorization = 'Bearer ' + token

        return response.data
      } catch (error) {
        if (error) throw error
      }
    },

    setUser (user) {
      this.user = user
    },

    clearUser () {
      this.user = {
        id: '',
        first_name: '',
        last_name: '',
        email: ''
      }
    }

  },
  persist: true
})
