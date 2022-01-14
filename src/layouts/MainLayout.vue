<template>
  <q-layout :class="$q.dark.isActive? 'blue-grey-10' : 'layoutMy'" view="hHh lpr lfr">
    <main-header
      :is-waiter-active="true"
      :drawer="drawer"
      :notify-drawer="notifyDrawer"
      @openCloseDrawer="drawer = !drawer"
      @openCloseNotifyDrawer="notifyDrawer = !notifyDrawer"
    ></main-header>
    <cart-drawer
      v-if="routerContains === 'menu'"
      :drawer="drawer"
    ></cart-drawer>

    <notify-drawer
      :notifyDrawer="notifyDrawer"
    ></notify-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'
import MainHeader from "components/header/MainHeader";
import CartDrawer from "components/drawer/CartDrawer";
import NotifyDrawer from "components/drawer/NotifyDrawer";

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      drawer: true,
      notifyDrawer: false
    }
  },
  computed: {
    routerContains() {
      let item = this.$route.path
      return item.split('/')[1]
    },
  },
  created() {
    this.connect()
  },
  methods: {
    connect() {
      let channel = this.$pusher.subscribe('user.62')
      console.log(channel)
      channel.bind('neworder-event',  (data) => {
        console.log(data)
        this.$q.notify({
          color: 'green-4',
          type: 'positive',
          textColor: 'white',
          icon: 'fas fa-cart-arrow-down',
          message: data.message,
          position: 'top'
        })
      })
      channel.bind('callwaiter-event', (data) => {
        console.log(data)
        this.$q.notify({
          color: 'green-4',
          type: 'positive',
          textColor: 'white',
          icon: 'fas fa-running',
          message: `${data.msg} стол: ${data.table.name}`,
          position: 'top'
        })
      });
    }
  },
  components: {
    MainHeader,
    CartDrawer,
    NotifyDrawer
  },
})
</script>
<style lang="scss">

</style>
