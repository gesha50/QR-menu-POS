<template>
  <q-layout :class="$q.dark.isActive? 'blue-grey-10' : 'layoutMy'" view="hHh lpr lfr">
    <main-header
      :is-waiter-active="true"
    ></main-header>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import { defineComponent } from 'vue'
import MainHeader from "components/header/MainHeader";

export default defineComponent({
  name: 'MainLayout',
  components: {
    MainHeader,
  }
})
</script>
<style lang="scss">

</style>
