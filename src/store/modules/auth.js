import authApi from '@/api/auth'

const state = {
  isSubmiting: false,
}
const mutations = {
  registerStart(state) {
    state.isSubmiting = true
  },
  registerSuccess(state) {
    state.isSubmiting = false
  },
  registerFailure(state) {
    state.isSubmiting = false
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
