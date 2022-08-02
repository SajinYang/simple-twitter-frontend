import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      avatar: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: '',
    updatePageNow: false
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
      state.token = ''
    },
    updatePage (state, stateNow) {
      state.updatePageNow = stateNow
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, account, name, email, avatar, isAdmin } = data

        commit('setCurrentUser', {
          id,
          account,
          name,
          email,
          avatar,
          isAdmin
        })
        return true // isAuthenticated
      } catch (error) {
        console.error(error.message)
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        Toast.fire({
          icon: 'info',
          title: '請重新登入'
        })
        commit('revokeAuthentication')
        return false
      }
    },
    updatePage ({ commit }, stateNow) {
      commit('updatePage', stateNow)
    }
  },
  modules: {
  }
})
