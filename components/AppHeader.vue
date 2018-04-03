<template>
  <sui-menu fixed="top">
    <sui-container>
      <sui-menu-item header>
        <router-link to="/" class="brand">Firebase使って遊ぼう</router-link>
      </sui-menu-item>
      <sui-menu-menu position="right">
        <sui-menu-item v-if="currentUser">
          <sui-image :src="currentUser.photoURL" avatar alt="プロフィール画像" />
          {{currentUser.displayName}}
        </sui-menu-item>
        <sui-menu-item>
          <sui-dropdown v-if="currentUser">
            <sui-dropdown-menu>
              <sui-dropdown-item @click="signOut">ログアウト</sui-dropdown-item>
            </sui-dropdown-menu>
          </sui-dropdown>
          <sui-button v-else primary @click="signIn">
            ログイン
          </sui-button>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-container>
  </sui-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: mapState(['currentUser']),
  methods: mapActions([ 'signIn', 'signOut' ]),
}
</script>

<style>
.brand {
  color: inherit;
}
</style>
