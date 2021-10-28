import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistenceStorage'

const state = {
  isSubmiting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null, // null, false, true
}

const mutations = {
  registerStart(state) {
    state.isSubmiting = true
    state.validationErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmiting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFailure(state, payload) {
    state.isSubmiting = false
    state.validationErrors = payload
  },
}

const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart')
      authApi
        .register(credentials)
        .then((res) => {
          context.commit('registerSuccess', res.data.user)
          setItem('accessToken', res.data.user.token)
          resolve(res.data.user)
        })
        .catch((result) => {
          context.commit('registerFailure', result.response.data.errors)
          console.log('result error', result)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}