<template>
<q-page>
  <div class="column justify-evenly items-center">
    <div class="logo q-my-md">
      <img
        width="110"
        height="110"
        class="q-mb-sm"
        src="../assets/img/1.svg"
        alt="logo"
      >
      <h5 class="no-margin text-center">QR-Menu</h5>
    </div>
    <div class="bg">
      <div class="header-block column justify-center q-mb-xl">
        <h3 class="no-margin text-center">Введите код</h3>
      </div>
    </div>
  </div>
  <!-- <div class="flex justify-center">
    <q-form
      @submit.prevent="authWaiter"
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
  </div> -->
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
            this.$store.dispatch('settings/setRestaurantName', res.data.restaurant_name)
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

<style lang="scss" scoped>
.displayNone {
  display: none;
}
.q-page {
  .logo {
    h5 {
      font-family: 'Raleway',sans-serif;
      color: #ffffff;
      font-weight: bold;
    }
  }
  .bg {
      width: 900px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 30px;
      padding: 40px 50px 0 50px;
      .header-block {
      h3 {
        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 130%;
      }
    }
  }
}
</style>
