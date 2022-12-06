import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useRouteStore = defineStore('route', {
  state: () => ({
    route: {
      from: '',
      to: '',
      range: ''
    },

    savedRoutes: []
  }),

  getters: {
    getRoute: (state) => { return state.route },
    hasRoute: (state) => { return state.from !== '' && state.to !== '' },
    getAllSavedRoutes: (state) => { return state.savedRoutes }
  },

  actions: {
    async store (route) {
      try {
        await api.post('/api/routes', route)
      } catch (error) {
        if (error) throw error
      }
    },

    async delete (route) {
      try {
        await api.delete(`/api/routes/${route.id}`)
      } catch (error) {
        if (error) throw error
      }
    },

    async showAllSavedRoutesByUserId () {
      try {
        const response = await api.get('/api/user/routes')
        this.savedRoutes = response.data.data
        return true
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

      this.savedRoutes = []
    }

  },
  persist: true
})
