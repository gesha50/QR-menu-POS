<template>
<div class="LoginRestaurant">
  <form
    @submit.prevent="authOwner"
    @reset="resetOwnerData"
    class="LoginPage__form"
  >
    <div class="input-container">
      <label class="block">
        <div class="q-mb-sm">{{$t('login.email_owner')}}</div>
        <q-input
          class="q-mt-sm"
          type="email"
          bg-color="white"
          rounded
          outlined
          v-model="restaurant.email"
          :placeholder="$t('login.email_owner')"
          :rules="[
                  val => val !== null && val !== '' || $t('login.rules.email'),
                ]"
        ></q-input>
      </label>
    </div>
    <div class="input-container">
      <label class="block">
        <div class="q-mb-sm">{{$t('login.password')}}</div>
        <q-input
          class="q-mt-sm"
          type="password"
          bg-color="white"
          rounded
          outlined
          v-model="restaurant.password"
          :placeholder="$t('login.rules.password')"
          :rules="[
                  val => val !== null && val !== '' || $t('login.rules.password'),
                ]"
        ></q-input>
      </label>
    </div>
    <q-btn class="login-button" :loading="isUserLogin" :label="$t('btn.login')" type="submit" />
  </form>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "LoginRestaurant",
    data() {
        return {
          restaurant: {
            email: this.$store.getters['settings/owner'].email,
            password: null,
          },
          isUserLogin: false
        }
    },
    created() {
      let ownerEmail = this.$q.localStorage.getItem('ownerEmail')
      if (ownerEmail) {
        this.restaurant.email = ownerEmail
      }
    },
    mounted() {},
    components: {},
    computed: {},
    methods: {
      authOwner() {
        this.isUserLogin = true
        const formData = new FormData()
        formData.append('email', this.restaurant.email)
        formData.append('password', this.restaurant.password)
        this.$api.post('api/v2/vendor/auth/gettoken', formData)
          .then(res=>{
            this.isUserLogin = false
              console.log(res.data)
            if (res.data.status) {
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: this.$t('login.success')
              })
              this.$store.dispatch('settings/setIsRestaurant', true)
              this.$store.dispatch('settings/setOwnerEmail', this.restaurant.email)
              this.$store.dispatch('settings/ownerAuth', [true, res.data.token])
              this.$router.push('/restaurant')
            } else {
              this.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: this.$t('login.failed')
              })
            }
          })
          .catch(e=>{
            this.isUserLogin = false
            console.log(e)
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: this.$t('login.failed')
            })
          })
      },
      resetOwnerData () {
        this.restaurant.email = null
        this.restaurant.password = null
      }
    },
})
</script>

<style lang="scss" scoped>
.LoginRestaurant {

}
</style>
