<template>
  <q-header class="text-white header" :class="$q.dark.isActive? 'bg-black' : 'bg-white'">
    <q-toolbar>
      <q-toolbar-title class="row">
        <router-link class="flex" to="/">
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
        class="q-mr-sm"
        :class="cart.length? 'red' : 'grey'"
        rounded
        :color="cart.length ? 'red-5' : 'grey-6'"
        :label="`Items in Cart (${cart.length})`"
        @click='$emit("openCloseDrawer", this.drawer)'
      />
      <q-btn v-if="isWaiterActive" to="/orders" class="q-mr-sm text-blue-grey-9" round color="amber-5" icon="fas fa-concierge-bell" :size="'md'" />
      <q-btn
        v-if="isWaiterActive"
        class="text-amber-5"
        round
        color="blue-grey-9"
        icon="fas fa-bell"
        :size="'md'"
        @click='$emit("openCloseNotifyDrawer", this.notifyDrawer)'
      >
        <q-badge color="red" floating>{{ notificationsNumber }}</q-badge>
      </q-btn>
      <q-btn v-if="isWaiterActive" to="/archive" class="q-mx-sm" round color="blue-grey-8" icon="far fa-folder-open" :size="'md'" />
      <q-btn to="/settings" round color="grey-7" icon="fas fa-cog" :size="'md'" />
      <q-btn
        class="q-ml-sm"
        v-if="isWaiterActive"
        @click="logout"
        round
        color="red"
        icon="fas fa-power-off"
        :size="'md'"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "MainHeader",
  emits: ["click"],
  props: {
    isWaiterActive: Boolean,
    drawer: Boolean,
    notifyDrawer: Boolean
  },
  data() {
    return {
      text: '',
    }
  },
  computed: {
    isMenuActive() {
      return this.$route.path.split('/')[1] === 'menu'
    },
    table_id() {
      return this.$route.path.split('/')[2]
    },
    cart() {
      return this.$store.getters['items/ItemsInCart'](this.table_id)
        ? this.$store.getters['items/ItemsInCart'](this.table_id)
        : []
    },
    notificationsNumber() {
      return this.$store.getters['notify/notifications'].length
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
    },
    openCloseNotifyDrawer() {
      this.$emit('openCloseNotifyDrawer', this.notifyDrawer)
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 4px 0;
}
.logo {
  width: 130px;
}
</style>
