<template>
  <div>
    <mcv-loader v-if="isLoading" />
    <mcv-error-message v-if="error" />

    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-listt">
        <router-link
          :to="{name: 'tag', params: {slug: popularTag}}"
          v-for="(popularTag, index) in popularTags"
          :key="index"
          class="tag-default tag-pill"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags'
import McvLoader from '@/components/Loader'
import McvErrorMessage from '@/components/ErrorMessage'
export default {
  name: 'McvPopularTags',
  components: {McvLoader, McvErrorMessage},
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      popularTags: (state) => state.popularTags.data,
      error: (state) => state.popularTags.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  },
}
</script>
