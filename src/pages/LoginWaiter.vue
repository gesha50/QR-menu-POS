<template>
<q-page>
  <div class="q-gutter-sm flex justify-center q-mt-md">
    <q-form
      @submit="authWaiter"
      @reset="resetWaiterData"
      class="q-gutter-md LoginPage__form"
    >
      <q-input
        autofocus
        filled
        type="number"
        v-model="password"
        :label="$t('login.password')"
        lazy-rules
        :rules="[
            val => val !== null && val !== '' || $t('login.rules.password'),
            val => val >= 0 && val <= 9999 || $t('login.rules.enterFourNum'),
            val => val.length === 4 || $t('login.rules.enterFourNum')
          ]"
      />
      <div>
        <q-btn :label="$t('btn.login')" type="submit" color="primary"/>
        <q-btn :label="$t('btn.reset')" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</q-page>
</template>

<script>
import {api} from "boot/axios";

export default {
  name: "LoginWaiter",
  props: ['id'],
  data() {
    return {
      rest_id: null,
      password: null
    }
  },
  methods: {
    authWaiter () {
      const formData = new FormData()
      formData.append('id', this.id)
      formData.append('password', this.password)
      api.post('api/v2/staff/getStaffToken', formData)
        .then(res=>{
          console.log(res.data)
          if (res.data.status) {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: this.$t('login.success')
            })
            this.$store.dispatch('settings/setUserID', this.id)
            this.$store.dispatch('settings/restaurantID', res.data.restaurant_id)
            this.$store.dispatch('settings/userAuth', [true, res.data.token])
            this.$router.push('/')
          }
          else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: this.$t('login.failed')
            })
          }
        })
        .catch(e=>{
          console.log(e)
        })
    },
    resetWaiterData () {
      this.password = null
    },
  },
}
</script>

<style scoped>
.displayNone {
  display: none;
}
</style>
