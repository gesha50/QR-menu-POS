<template>
  <q-layout :class="$q.dark.isActive? 'blue-grey-10' : 'layoutMy'" view="hHh lpr lfr">
    <main-header></main-header>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import MainHeader from "components/header/MainHeader";

export default {
  name: "RestaurantLayout",
  components: {
    MainHeader,
  }
}
</script>

<style scoped>

</style>
