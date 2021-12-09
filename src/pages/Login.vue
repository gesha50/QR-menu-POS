<template>
<q-page >
  <div class="column">
    <div class="q-gutter-sm flex justify-center q-mt-md">
      <div class="text-center">
        <div v-if='isRestaurant === "Choose mode"'>
          {{isRestaurant}}
        </div>
        <div v-else-if="isRestaurant" class="">Restaurant mode</div>
        <div v-else class="">Individual mode</div>
        <q-toggle color="red-5" size="130px" indeterminate-value="Do not choose" v-model="isRestaurant" />
      </div>
    </div>
    <div class="column justify-center">
      <div class="q-pa-md flex justify-center LoginPage">
        <div v-if='isRestaurant === "Choose mode"' class="">
          Please choose mode
        </div>
        <div v-else-if="isRestaurant" class="">
          <q-form
            @submit="authOwner"
            @reset="resetOwnerData"
            class="q-gutter-md LoginPage__form"
          >
            <q-input
              filled
              type="text"
              v-model="restaurant.email"
              label="Email owner restaurant"
              lazy-rules
              :rules="[
            val => val !== null && val !== '' || 'Please write correct email',
          ]"
            />
            <q-input
              autofocus
              filled
              type="password"
              v-model="restaurant.password"
              label="password"
              lazy-rules
              :rules="[
            val => val !== null && val !== '' || 'Please write password',
          ]"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>
        <div v-else class="">
          <q-form
            @submit="authWaiter"
            @reset="resetWaiterData"
            class="q-gutter-md LoginPage__form"
          >
            <q-input
              filled
              type="number"
              v-model="waiter.user_id"
              label="ID waiter"
              lazy-rules
              :rules="[
            val => val !== null && val !== '' || 'Please write ID',
          ]"
            />
            <q-input
              autofocus
              filled
              type="number"
              v-model="waiter.password"
              label="password"
              lazy-rules
              :rules="[
            val => val !== null && val !== '' || 'Please write password',
            val => val >= 0 && val <= 9999 || 'Please enter 4 numbers',
            val => val.length === 4 || 'Please enter 4 numbers'
          ]"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import {api} from "boot/axios";

export default {
  name: "Login",
  data() {
    return {
      isRestaurant: this.$store.getters['settings/getIsRestaurant'],
      waiter: {
        password: null,
        user_id: this.$store.getters['settings/auth'].id
      },
      restaurant: {
        email: this.$store.getters['settings/owner'].email,
        password: null,
      }
    }
  },
  created() {
    let ownerEmail = this.$q.localStorage.getItem('ownerEmail')
    if (ownerEmail) {
      this.restaurant.email = ownerEmail
    }
    let isRestaurant = this.$q.localStorage.getItem('isRestaurant')
    if (typeof isRestaurant == "boolean") {
      this.isRestaurant = isRestaurant
    }
    let user_id = this.$q.localStorage.getItem('user_id')
    if (user_id) {
      this.waiter.user_id = user_id
    }
  },
  methods: {
    authOwner() {
      const formData = new FormData()
      formData.append('email', this.restaurant.email)
      formData.append('password', this.restaurant.password)
      api.post('api/v2/vendor/auth/gettoken', formData)
        .then(res=>{
          console.log(res.data)
          if (res.data.status) {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted'
            })
            this.$store.dispatch('settings/setIsRestaurant', true)
            this.$store.dispatch('settings/setOwnerEmail', this.restaurant.email)
            this.$store.dispatch('settings/ownerAuth', [true, res.data.token])
            this.$router.push('/restaurant')
          }
          else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'It`s not correct password'
            })
          }
        })
        .catch(e=>{
          console.log(e)
        })
    },
    authWaiter () {
      const formData = new FormData()
      formData.append('id', this.waiter.user_id)
      formData.append('password', this.waiter.password)
      api.post('api/v2/staff/getStaffToken', formData)
      .then(res=>{
        console.log(res.data)
        if (res.data.status) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
          this.$store.dispatch('settings/setIsRestaurant', false)
          this.$store.dispatch('settings/setUserID', this.waiter.user_id)
          this.$store.dispatch('settings/userAuth', [true, res.data.token])
          this.$router.push('/')
        }
        else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'It`s not correct password'
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
    resetOwnerData () {
      this.restaurant.email = null
      this.restaurant.password = null
    }
  }
}
</script>

<style scoped lang="scss">
.LoginPage {
  &__form {
    width: 300px;
  }
}
.marginAuto {
  margin: auto;
}
</style>
