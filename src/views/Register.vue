<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <div class="text-xs-center">Sign up</div>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">Have an account?</router-link>
          </p>
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmiting"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import McvValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from '@/store/modules/auth'
export default {
  components: {McvValidationErrors},
  name: 'McvRegister',
  data() {
    return {
      email: '',
      password: '',
      username: '',
    }
  },
  computed: {
    ...mapState({
      isSubmiting: (state) => state.auth.isSubmiting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
    // isSubmiting() {
    //   return this.$store.state.auth.isSubmiting
    // },
    // validationErrors() {
    //   return this.$store.state.auth.validationErrors
    // },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then((user) => {
          console.log('Successfuly register user', user)
          this.$router.push({name: 'globalFeed'})
        })
    },
  },
}
</script>
