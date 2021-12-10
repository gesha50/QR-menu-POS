<template>
  <q-header reveal class="text-white" :class="$q.dark.isActive? 'bg-black' : 'bg-white'">
    <q-toolbar>
      <q-toolbar-title class="row">
        <router-link to="/">
          <img v-if="$q.dark.isActive" class="logo" src="../../assets/img/logo.jpg">
          <img v-else class="logo" src="../../assets/img/logo2.jpg">
        </router-link>
      </q-toolbar-title>
      <q-btn to="/settings" round color="black" icon="fas fa-cog" :size="'sm'" />
      <q-btn v-if="isWaiterActive" @click="logout" round color="red" icon="fas fa-power-off" :size="'sm'" />
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "MainHeader",
  props: {
    isWaiterActive: Boolean
  },
  methods: {
    logout() {
      this.$store.dispatch('settings/logoutWaiter', this.$store.getters['settings/getIsRestaurant'])
      if (this.$store.getters['settings/getIsRestaurant']) {
        this.$router.push('/restaurant')
      } else {
        this.$router.push('/login')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.logo {
  width: 130px;
}
</style>
