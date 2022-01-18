<template>
<div class="LoginIdividual">
  <form
    @submit.prevent="authWaiter"
    @reset="resetWaiterData"
    class="LoginPage__form"
  >
    <div class="input-container">
      <label class="block">
        <div class="q-mb-sm">{{'ID ' + $t('login.waiter')}}</div>
        <q-input
          class="q-mt-sm"
          type="number"
          bg-color="white"
          rounded
          outlined
          v-model="waiter.user_id"
          :placeholder="11"
          :rules="[
                  val => val !== null && val !== '' || $t('login.rules.id'),
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
          v-model="waiter.password"
          :placeholder="$t('login.password')"
          :rules="[
                     val => val !== null && val !== '' || $t('login.rules.password'),
                     val => val >= 0 && val <= 9999 || $t('login.rules.enterFourNum'),
                     val => val.length === 4 || $t('login.rules.enterFourNum')
                  ]"
        ></q-input>
      </label>
    </div>
    <button class="login-button" type="submit">{{$t('btn.login')}}</button>
  </form>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "LoginIndividual",
    data() {
        return {
          waiter: {
            password: null,
            user_id: this.$store.getters['settings/auth'].id
          },
        }
    },
    created() {
      let user_id = this.$q.localStorage.getItem('user_id')
      if (user_id) {
        this.waiter.user_id = user_id
      }
    },
    mounted() {},
    components: {},
    computed: {},
    methods: {
      authWaiter () {
        const formData = new FormData()
        formData.append('id', this.waiter.user_id)
        formData.append('password', this.waiter.password)
        this.$api.post('api/v2/staff/getStaffToken', formData)
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
              this.$store.dispatch('settings/setIsRestaurant', false)
              this.$store.dispatch('settings/setUserID', this.waiter.user_id)
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
        this.waiter.user_id = null
        this.waiter.password = null
      },
    },
})
</script>

<style lang="scss" scoped>

</style>
