<template>
  <q-layout :class="$q.dark.isActive? '' : 'layoutMy'" view="hHh lpr lfr">
    <main-header
      :is-waiter-active="true"
      :drawer="drawer"
      :notify-drawer="notifyDrawer"
      @openCloseDrawer="drawer = !drawer"
      @openCloseNotifyDrawer="notifyDrawerClick"
    ></main-header>
    <cart-drawer
      @click="closeCartDrawer($event)"
      v-if="routerContains === 'menu'"
      :drawer="drawer"
    ></cart-drawer>

    <notify-drawer
      @click="closeNotifyDrawer($event)"
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
      notifyDrawer: false,
      audioCallWaiter: new Audio(require('../assets/audio/call-waiter.mp3')),
      audioNewOrder: new Audio(require('../assets/audio/new-order.mp3')),
      audioChangeStatus: new Audio(require('../assets/audio/change-status.mp3')),
      channel: null
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
  unmounted() {
    this.channel.unsubscribe('user.' + this.$q.localStorage.getItem('owner_id'))
  },
  methods: {
    closeCartDrawer(e) {
      if (e.target.classList[0] === 'fullscreen') {
        this.drawer = !this.drawer
      }
    },
    closeNotifyDrawer(e) {
      if (e.target.classList[0] === 'fullscreen') {
        this.notifyDrawer = !this.notifyDrawer
      }
    },
    connect() {
      this.channel = this.$pusher.subscribe('user.' + this.$q.localStorage.getItem('owner_id'))
      console.log(this.channel)
      this.channel.bind('neworder-event',  (data) => {
        this.eventNewOrder(data)
      })
      this.channel.bind('callwaiter-event', (data) => {
        this.eventCallWaiter(data)
      });
      this.channel.bind('change-status', (data) => {
        this.eventChangeStatus(data)
      });
    },
    eventNewOrder(data) {
      console.log(data)
      let message = `${this.$t('notify.summ')}: ${data.order.order_price + this.$t('valuta')}, ${this.$t('notify.table')}: ${data.order.table.name}`
      this.playAudio(this.audioNewOrder)
      this.addNotify('fas fa-cart-arrow-down','New Order', message)
      this.showNotify('fas fa-cart-arrow-down', message)
    },
    eventCallWaiter(data) {
      let message = `${data.msg}: ${data.table.restoarea.name} ${data.table.name}`
      this.playAudio(this.audioCallWaiter)
      this.addNotify('fas fa-running','Call Waiter', message)
      this.showNotify('fas fa-running', message)

    },
    eventChangeStatus(data){
      console.log(data)
      let icon = 'fas fa-exchange-alt'
      let restAreaName = '-'
      let table = '-'
      if (data.order.tableassigned.length) {
        restAreaName = data.order.tableassigned[0].restoarea.name
        table = data.order.tableassigned[0].name
      }
      let message = `${this.$t('notify.zone')}:  ${restAreaName}, ${this.$t('notify.table')}: ${table}, ${this.$t('notify.status')}: ${data.status}`
      this.showNotify(icon, message)
      this.playAudio(this.audioChangeStatus)
      this.addNotify(icon,'Change Status', message)
    },
    addNotify(icon, label, message) {
      let notification = {
        icon: icon,
        label: label,
        description: message,
        isReading: false,
      }
      this.$store.dispatch('notify/addNotify', notification)
    },
    showNotify (icon, message) {
      this.$q.notify({
        color: 'green-4',
        type: 'positive',
        textColor: 'white',
        icon: icon,
        message: message,
        position: 'top'
      })
    },
    playAudio(audio) {
      audio.pause()
      audio.currentTime = 0
      audio.play()
    },
    notifyDrawerClick() {
      this.notifyDrawer = !this.notifyDrawer
      if (this.notifyDrawer) {
        this.$store.dispatch('notify/seeAllNotify')
      }
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
