<template>
  <router-view />
</template>
<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'App',
  created() {
    if (this.$q.localStorage.getItem('userAuth')) {
      this.$store.dispatch('settings/userAuth', [true, this.$q.localStorage.getItem('userToken')])
    }
    if (typeof this.$q.localStorage.getItem('isRestaurant') === 'boolean') {
      this.$store.dispatch('settings/setIsRestaurant', this.$q.localStorage.getItem('isRestaurant'))
    }
    if (this.$q.localStorage.getItem('ownerAuth')) {
      this.$store.dispatch('settings/ownerAuth', [true, this.$q.localStorage.getItem('ownerToken')])
    }
    if (this.$q.localStorage.getItem('currentLang')) {
      this.changedLang(this.$q.localStorage.getItem('currentLang'))
    }
    if (this.$q.localStorage.getItem('darkMode')) {
      this.$q.dark.set(this.$q.localStorage.getItem('darkMode'))
    }
  },

  methods: {
    changedLang(val) {
      this.$q.localStorage.set('currentLang',val)
      this.$i18n.locale = val
      this.$store.dispatch('settings/setLang', val)
    },
  },
})
</script>
<style lang="scss">
// >1440px
@media (min-width: $breakpoint-md-max) {

}
// >1024px  <1439px
@media (min-width: $breakpoint-sm-max) and (max-width: $breakpoint-md-max) {

}
// >600px and <1023px
@media (min-width: $breakpoint-xs-max) and (max-width: $breakpoint-sm-max) {

}
// <599px
@media (max-width: $breakpoint-xs-max) {

}
</style>
