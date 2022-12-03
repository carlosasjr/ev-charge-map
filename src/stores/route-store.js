import { defineStore } from 'pinia'

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
    setRoute (route) {
      console.log(route)
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
