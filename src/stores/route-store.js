import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useRouteStore = defineStore('route', {
  state: () => ({
    route: {
      from: '',
      to: '',
      range: ''
    }
  }),

  getters: {
    getRoute: (state) => { return state.route },
    hasRoute: (state) => { return state.from !== '' && state.to !== '' }
  },

  actions: {
    async store (route) {
      try {
        await api.post('/api/routes', route)
      } catch (error) {
        if (error) throw error
      }
    },

    setRoute (route) {
      this.route = route
    },

    clearRoute () {
      this.route = {
        from: '',
        to: '',
        range: ''
      }
    }

  },
  persist: true
})
