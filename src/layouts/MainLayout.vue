<template>
  <q-layout :class="$q.dark.isActive? 'blue-grey-10' : 'layoutMy'" view="hHh lpr lfr">
    <main-header
      :is-waiter-active="true"
      :drawer="drawer"
      @openCloseDrawer="drawer = !drawer"
    ></main-header>
    <cart-drawer
      v-if="routerContains === 'menu'"
      :drawer="drawer"
    ></cart-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'
import MainHeader from "components/header/MainHeader";
import CartDrawer from "components/drawer/CartDrawer";
import DarkContainerForDrawer from "components/drawer/DarkContainerForDrawer";

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    routerContains() {
      let item = this.$route.path
      return item.split('/')[1]
    },
  },
  components: {
    MainHeader,
    CartDrawer,

  },
})
</script>
<style lang="scss">

</style>
