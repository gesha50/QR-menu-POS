<template>
  <q-layout :class="$q.dark.isActive? 'blue-grey-10' : 'layoutMy'" view="hHh lpr lfr">
    <main-header
      :is-waiter-active="true"
      :drawer="drawer"
      @openCloseDrawer="drawer = !drawer"
    ></main-header>
    <cart-drawer
      :drawer="drawer"
    ></cart-drawer>

    <dark-container-for-drawer
      @click="drawer = !drawer"
      :drawer="drawer"
    ></dark-container-for-drawer>
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
      drawer: false
    }
  },
  components: {
    MainHeader,
    CartDrawer,
    DarkContainerForDrawer
  },
})
</script>
<style lang="scss">

</style>
