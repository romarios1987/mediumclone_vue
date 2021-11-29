<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <img
              v-if="userProfile.image"
              :src="userProfile.image"
              class="user-img"
              :alt="userProfile.username"
            />
            <img
              v-else
              class="user-img"
              src="../assets/default-avatar.png"
              :alt="userProfile.username"
            />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              FOLLOW USER BTN
              <router-link
                v-if="isCurrentUserProfile"
                class="btn btm-sm btn-outline-secondary action-btn"
                :to="{name: 'settings'}"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <div class="article-toggler">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfile'}"
                  :to="{
                    name: 'userProfile',
                    params: {slug: userProfile.username},
                  }"
                  >My Posts
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{active: routeName === 'userProfileFavorites'}"
                  :to="{
                    name: 'userProfileFavorites',
                    params: {slug: userProfile.username},
                  }"
                  >Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <mcv-feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {actionTypes as userProfileActionTypes} from '@/store/modules/userProfile'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import McvFeed from '@/components/Feed'
export default {
  name: 'McvUserProfile',
  components: {McvFeed},

  computed: {
    ...mapState({
      isLoading: (state) => state.userProfile.isLoading,
      error: (state) => state.userProfile.error,
      userProfile: (state) => state.userProfile.data,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false
      }
      return this.currentUser.username === this.userProfile.username
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites')
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`
    },
    userProfileSlug() {
      return this.$route.params.slug
    },
    routeName() {
      return this.$route.name
    },
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {
        slug: this.userProfileSlug,
      })
    },
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile()
    },
  },
  mounted() {
    this.getUserProfile()
  },
}
</script>
