<template>
  <q-layout :class="$q.dark.isActive? 'blue-grey-10' : 'layoutMy'" view="hHh lpr lfr">
    <q-page-container
      class="loginLayout-bg"
      :style="backgroundImagePathStyle"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "LoginLayout",
  data() {
    return {

    }
  },
  computed: {
    backgroundImagePath() {
      return this.$store.getters['settings/backgroundImagePath']
    },
    backgroundImagePathStyle(){
      return 'background: url('+this.backgroundImagePath+');'
    }
  },
  mounted() {
    if (this.$q.localStorage.has('backgroundImgPath')) {
      this.$store.dispatch(
        'settings/changeBackgroundImagePath',
        process.env.API + '/' + this.$q.localStorage.getItem('backgroundImgPath')
      )
    }
  },
})
</script>

<style scoped lang="scss">
.loginLayout-bg {
  background-size: cover !important;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
}
</style>
