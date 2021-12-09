<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  created() {
    if (this.$q.localStorage.getItem('userAuth')) {
      this.$store.dispatch('settings/userAuth', [true, this.$q.localStorage.getItem('userToken')])
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
