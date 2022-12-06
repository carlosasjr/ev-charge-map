import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

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
        await api.post('login', { email, password })
      } catch (error) {
        if (error) throw error
      }
    },

    async logout () {
      try {
        await api.post('logout')
      } catch (error) {
        if (error) throw error
      }
    },

    async register (user) {
      try {
        await api.post('register', user)
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
        const response = await api.get('/api/user')

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
