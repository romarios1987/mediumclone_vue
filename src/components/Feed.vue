<template>
  <div>
    <mcv-loader v-if="isLoading" />
    <mcv-error-message v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="article in feed.articles"
        :key="article.id"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img
              v-if="article.author.image"
              :src="article.author.image"
              :alt="article.author.username"
            />
            <img
              v-else
              src="../assets/default-avatar.png"
              :alt="article.author.username"
            />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pul-xs-right">Add To Favorites</div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>

      <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import McvPagination from '@/components/Pagination'
import McvLoader from '@/components/Loader'
import McvErrorMessage from '@/components/ErrorMessage'
import {LIMIT_PAGE} from '@/helpers/constants'
import {stringify, parseUrl} from 'query-string'

export default {
  name: 'McvFeed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },

  components: {McvPagination, McvLoader, McvErrorMessage},

  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    limit() {
      return LIMIT_PAGE
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * LIMIT_PAGE - LIMIT_PAGE
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit: LIMIT_PAGE,
        offset: this.offset,
        ...parsedUrl.query,
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    },
  },

  watch: {
    currentPage() {
      this.fetchFeed()
    },
  },

  mounted() {
    this.fetchFeed()
  },
}
</script>
