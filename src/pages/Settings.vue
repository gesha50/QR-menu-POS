<template>
  <q-page class="">
    <div class="flex flex-center">
      <q-select @update:model-value="changedLang" filled v-model="lang" :options="options" />
      <q-btn @click="toggleDarkMode" />
    </div>
    <q-btn v-if="isRestaurant" @click="logout" label="выйти из режима ресторана" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Settings",
  data() {
    return {
      isRestaurant: this.$store.getters["settings/getIsRestaurant"],
      lang: this.$store.getters["settings/getLang"],
      options: [
        'en-US',
        'ru',
        'uz'
      ]
    }
  },
  created() {
    console.log('work')
    if (this.$q.localStorage.getItem('currentLang')) {
      this.changedLang(this.$q.localStorage.getItem('currentLang'))
    }
  },

  methods: {
    toggleDarkMode() {
      this.$q.localStorage.set('darkMode', !this.$q.dark.isActive)
      this.$q.dark.toggle()
    },
    changedLang(val) {
      this.$q.localStorage.set('currentLang',val)
      console.log(val)
      this.lang = val
      this.$i18n.locale = val
      this.$store.dispatch('settings/setLang', val)
    },
    logout() {
      this.$store.dispatch('settings/logoutOwner', this.$store.getters['settings/getIsRestaurant'])
      this.$router.push('/login')
    }
  },
})
</script>

<style scoped>

</style>
