<template>
  <div>
    <app-header />
    <sui-container class="pushed">
      <app-message />

      <sui-container class="main">
        <nuxt/>
      </sui-container>
    </sui-container>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import AppMessage from '~/components/AppMessage.vue'

export default {
  beforeCreate() {
    this.$store.dispatch('subscribeAuth');
  },
  components: {
    AppHeader,
    AppMessage
  }
}
</script>

<style scoped>
.pushed {
  margin-top: 7em;
}

.main {
  margin-top: 2em;
}
</style>
