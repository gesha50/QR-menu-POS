<template>
<q-page>
  <div class="bg absolute-center">
    <div class="q-gutter-sm flex justify-center">
      <div class="text-center">
        <img class="logo" src="../assets/img/logo_login.svg" alt="logo">
        <div class="white">
          <q-btn-toggle
            v-model="isRestaurant"
            toggle-color="red-6"
            rounded
            color="white"
            text-color="black"
            :options="[
              {label: 'Inactive',  value: null},
              {label: 'Active ', value: 'true'},
            ]"
          />
        </div>
      </div>
    </div>
    <div class="column justify-center">
      <div class="q-pa-md LoginPage">
        <div v-if='isRestaurant === "Choose mode"' class="">
          {{$t('login.mode.choose_mode')}}
        </div>
        <div v-else-if="isRestaurant">
          <form
            @submit="authOwner"
            @reset="resetOwnerData"
            class="LoginPage__form"
          >
            <div class="input-container">
              <label class="block" for="restaurant-email">{{$t('login.email_owner')}}</label>
              <input
                type="text"
                id="restaurant-email"
                v-model="restaurant.email"
                :placeholder="$t('login.email_owner')"
                :rules="[
                  val => val !== null && val !== '' || $t('login.rules.email'),
                ]"
              />
            </div>
            <div class="input-container">
              <label class="block" for="restaurant-password">{{$t('login.password')}}</label>
              <input
                type="password"
                id="restaurant-password"
                v-model="restaurant.password"
                :placeholder="$t('login.rules.password')"
                :rules="[
                  val => val !== null && val !== '' || $t('login.rules.password'),
                ]"
              />
            </div>
            <button class="login-button" type="submit">{{$t('btn.login')}}</button>
          </form>
        </div>
        <div v-else>
          <form
            @submit="authWaiter"
            @reset="resetWaiterData"
            class="LoginPage__form"
          >
            <div class="input-container">
              <label class="block" for="restaurant-id">{{'ID ' + $t('login.waiter')}}</label>
              <input
                  type="number"
                  id="restaurant-id"
                  v-model="waiter.user_id"
                  :placeholder="'ID '+$t('login.waiter')"
                  :rules="[
                val => val !== null && val !== '' || $t('login.rules.id'),]"
              />
            </div>
            <div class="input-container">
              <label class="block" for="restaurant-email">{{$t('login.password')}}</label>
              <input
                type="number"
                v-model="waiter.password"
                id="restaurant-email"
                :placeholder="$t('login.password')"
                :rules="[
                val => val !== null && val !== '' || $t('login.rules.password'),
                val => val >= 0 && val <= 9999 || $t('login.rules.enterFourNum'),
                val => val.length === 4 || $t('login.rules.enterFourNum')]"
              />
            </div>
            <button class="login-button" type="submit">{{$t('btn.login')}}</button>
          </form>
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
              message: this.$t('login.success')
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
              message: this.$t('login.failed')
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
            message: this.$t('login.success')
          })
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
    resetOwnerData () {
      this.restaurant.email = null
      this.restaurant.password = null
    }
  }
}
</script>

<style scoped lang="scss">
.q-page {
  background: url('assets/img/background/bg-login.jpg') no-repeat center center;
  background-size: cover;
  .bg {
    width: 700px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    padding: 70px 70px 0 70px;
    img.logo {
      width: 150px;
    }
    .white {
      background-color: #ffffff;
      border-radius: 25px;
      padding: 3px;
      margin: 10px 0 30px;
      .q-btn-group {
        box-shadow: none;
        .q-btn-item {
          background-color: #000;
        }
      }
    }
  }
}
.q-btn-group {
  box-shadow: none;
  .q-btn-item {
    background-color: #000;
  }
}
.LoginPage {
  &__form {
    width: 400px;
    margin: 0 auto 100px;
    .input-container {
      width: 100%;
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 0;
      }
      label { 
        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 19px;
        margin: 0 0 5px;
        font-feature-settings: 'pnum' on, 'lnum' on;
        color: #1E1E1E;
      }
      input {
        width: 100%;
        background: #FFFFFF;
        border: 1.5px solid #DFDFDF;
        box-sizing: border-box;
        border-radius: 52px;
        padding: 14px 25px;
        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        margin: 0;
        font-feature-settings: 'pnum' on, 'lnum' on;
        color: #010101;
        outline: none;
        &:placeholder {
          font-family: 'Raleway',sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 19px;
          margin: 0;
          font-feature-settings: 'pnum' on, 'lnum' on;
          color: #B5B5B5;
        }
      }
    }
    .login-button {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background: #08C804;
      border: none;
      padding: 25px 0;
      border-radius: 0px 0px 30px 30px;
      font-family: 'Raleway',sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 26px;
      line-height: 120%;
      font-feature-settings: 'pnum' on, 'lnum' on;
      cursor: pointer;
      color: #FAFAFA;
    }
  }
}
.marginAuto {
  margin: auto;
}

@media (max-width: 1040px) {
  .q-page {
    .bg {
      width: 50%;
    }
  }
  .LoginPage {
    width: 100%;
    &__form {
      width: 100%;
    }
  }
}
@media (max-width: 990px) {
  .q-page {
    .bg {
      width: 60%;
    }
  }
}
@media (max-width: 770px) {
  .q-page {
    .bg {
      width: 70%;
      padding: 50px 40px 0 40px;
    }
  }
}
@media (max-width: 580px) {
  .q-page {
    .bg {
      width: 80%;
      padding: 50px 40px 0 40px;
    }
  }
}
@media (max-width: 500px) {
  .q-page {
    .bg {
      width: 90%;
      padding: 30px 20px 0 20px;
      img.logo {
        width: 120px;
      }
      .white {
        margin: 15px 0 25px;
      }
    }
  }
  .LoginPage {
    padding:0;
    &__form {
      margin: 0 auto 80px;
      .input-container {
        margin-bottom: 15px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .login-button {
        padding: 15px 0;
        font-size:22px
      }
    }
  }
}
</style>
