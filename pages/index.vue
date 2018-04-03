<template>
<div>
  <sui-header class="top attached">
    最新のポスト一覧
  </sui-header>
  <sui-segment class="attached posts">
    <sui-dimmer :active="loading" inverted>
      <sui-loader />
    </sui-dimmer>
    <sui-feed v-if="!loading">
      <sui-feed-event v-for="post in posts" :key="post.id">
        <sui-feed-label>
          <img :src="post.user.photoURL">
        </sui-feed-label>
        <sui-feed-content>
          <sui-feed-date content="" />
          <sui-feed-summary>{{post.title}}</sui-feed-summary>
        </sui-feed-content>
      </sui-feed-event>
    </sui-feed>
  </sui-segment>
  <sui-segment class="attached">
    <sui-container textAlign="center">
      <router-link to="/posts/new">新規作成</router-link>
    </sui-container>
  </sui-segment>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('post')

export default {
  data() {
    return { loading: true };
  },
  computed: mapState({ posts: 'latest' }),
  methods: mapActions([ 'fetchLatest' ]),
  async created() {
    await this.fetchLatest();
    this.loading = false;
  }
}
</script>

<style scoped>
.posts {
  min-height: 200px;
}
</style>
