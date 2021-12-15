<template>
  <q-header reveal class="text-white" :class="$q.dark.isActive? 'bg-black' : 'bg-white'">
    <q-toolbar>
      <q-toolbar-title class="row">
        <router-link to="/">
          <img v-if="$q.dark.isActive" class="logo" src="../../assets/img/logo.jpg">
          <img v-else class="logo" src="../../assets/img/logo2.jpg">
        </router-link>
      </q-toolbar-title>
      <q-input v-if="isMenuActive"  dense standout="bg-grey-6 text-white" v-model="text" class="q-mr-md">
        <template v-slot:prepend>
          <q-icon v-if="text === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
        </template>
      </q-input>
      <q-btn
        v-if="isMenuActive"
        class="grey q-mr-md"
        rounded
        :color="cart.length ? 'red-5' : 'grey-6'"
        :label="`Items in Cart (${cart.length})`"
        @click='$emit("openCloseDrawer", this.drawer)'
      />
      <q-btn to="/settings" round color="black" icon="fas fa-cog" :size="'sm'" />
      <q-btn v-if="isWaiterActive" @click="logout" round color="red" icon="fas fa-power-off" :size="'sm'" />
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "MainHeader",
  emits: ["click"],
  props: {
    isWaiterActive: Boolean,
    drawer: Boolean
  },
  data() {
    return {
      text: '',
      cart: []
    }
  },
  computed: {
    isMenuActive() {
      return this.$route.path.split('/')[1] === 'menu'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('settings/logoutWaiter', this.$store.getters['settings/getIsRestaurant'])
      if (this.$store.getters['settings/getIsRestaurant']) {
        this.$router.push('/restaurant')
      } else {
        this.$router.push('/login')
      }
    },
    openCloseDrawer() {
      this.$emit('openCloseDrawer', this.drawer)
    }
  },
}
</script>

<style lang="scss" scoped>
.logo {
  width: 130px;
}
</style>
