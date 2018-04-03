<template>
  <transition name="fade">
    <sui-message v-if="visible" :class="color" dissmissable @dismiss="dismiss">
      {{content}}
    </sui-message>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('message')

export default {
  computed: mapState(['content', 'color', 'visible']),
  methods: mapMutations([ 'dismiss' ]),
}
</script>

<style>

</style>
