<template>
  <q-layout :class="$q.dark.isActive? 'blue-grey-10' : 'layoutMy'" view="hHh lpr lfr">
    <q-page-container
      class="loginLayout-bg"
      :style="backgroundImagePath"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "LoginLayout",
  mounted() {
    if (this.$q.localStorage.has('isRestaurant')) {
      // this.getImage()
    }
  },
  data() {
    return {
      backgroundImagePath: 'background: url('+require(`../assets/img/background/bg-login.jpg`)+');'
    }
  },
  methods: {
    getImage() {
      this.$api.get('')
      .then(res=>{
        if (res.data.path) {
          this.backgroundImagePath = res.data.path
        }
      })
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
