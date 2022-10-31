import api from '@/api'
export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    permissions: null,
    roles: null,
    routesConfig: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = null
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async getUser() {
      const res = await api.loginApi.getStaffInfo()
      console.log('res', res)
    }
  }
}
