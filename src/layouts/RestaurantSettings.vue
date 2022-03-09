<template>
  <q-layout :class="$q.dark.isActive? 'blue-grey-10' : 'layoutMy'" view="hHh lpr lfr">
    <main-header></main-header>
    <q-page-container
    class="RestaurantSettings"
    :style="backgroundImagePath"
    >
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import MainHeader from "components/header/MainHeader";

export default {
name: "SettingsLayout",
  components: {
    MainHeader,
  },
  data() {
    return {
      backgroundImagePath: 'background: url('+require(`../assets/img/background/bg-login.jpg`)+');'
    }
  },
}
</script>

<style scoped>
.RestaurantSettings {
  background-size: cover !important;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
}
</style>
