<template>
  <div>
    <app-header />
    <nuxt/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'

export default {
  created() {
    this.$store.dispatch('subscribeAuth');
  },
  components: {
    AppHeader
  }
}

</script>
