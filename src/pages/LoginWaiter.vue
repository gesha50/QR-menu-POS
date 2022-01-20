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
      <div class="header-block column justify-center q-mb-md">
        <h3 class="no-margin text-center">Введите код</h3>
      </div>
      <div class="column pin-pad justify-center">
        <div class="pin-code row justify-center q-mb-md">
          <span class="q-mr-sm" id="one"></span>
          <span class="q-mr-sm" id="two"></span>
          <span class="q-mr-sm" id="three"></span>
          <span id="four"></span>
          <div class="displayNone">{{password}}</div>
        </div>
        <div class="row justify-center q-mb-sm">
          <button class="btn-number" @click="password += '1'; authWaiter()">1</button>
          <button class="btn-number" @click="password += '2'; authWaiter()">2</button>
          <button class="btn-number" @click="password += '3'; authWaiter()">3</button>
        </div>
        <div class="row justify-center q-mb-sm">
          <button class="btn-number" @click="password += '4'; authWaiter()">4</button>
          <button class="btn-number" @click="password += '5'; authWaiter()">5</button>
          <button class="btn-number" @click="password += '6'; authWaiter()">6</button>
        </div>
        <div class="row justify-center q-mb-sm">
          <button class="btn-number" @click="password += '7'; authWaiter()">7</button>
          <button class="btn-number" @click="password += '8'; authWaiter()">8</button>
          <button class="btn-number" @click="password += '9'; authWaiter()">9</button>
        </div>
        <div class="row justify-center">
          <button class="btn-number" @click="resetWaiterData()">сброс</button>
          <button class="btn-number" @click="password += '0'; authWaiter()">0</button>
<<<<<<< HEAD
          <button class="btn-number relative-position	" @click="password = password.slice(0, password.length - 1)"><q-icon class="fas fa-backspace absolute-center"/></button>
=======
          <button class="btn-number relative-position	" @click="deleteNumber">
            <q-icon class="fas fa-backspace" />
          </button>
>>>>>>> 68be1d9cb017ab988297338a72ad085b1c5bb225
        </div>
      </div>
      <router-link class="back q-py-sm q-px-lg" to="/">Назад</router-link>
    </div>
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
      password: "",
    }
  },
  mounted () {
    console.log(this.password) // this dont call any method of the web3 object
  },
  methods: {
    deleteNumber() {
      this.password = this.password.slice(0, this.password.length - 1)
      if (this.password.length === 0) {
        document.getElementById("one").classList.remove('active')
      } else if (this.password.length === 1) {
        document.getElementById("two").classList.remove('active')
      } else if (this.password.length === 2) {
        document.getElementById("three").classList.remove("active");
      } else if (this.password.length === 3) {
        document.getElementById("four").classList.remove("active");
      }
    },
    authWaiter () {
      console.log(this.password)
      if (this.password.length === 1) {
        document.getElementById("one").classList.add('active')
      } else if (this.password.length === 2) {
         document.getElementById("two").classList.add("active");
      } else if (this.password.length === 3) {
         document.getElementById("three").classList.add("active");
      } else if (this.password.length === 4) {
        document.getElementById("four").classList.add("active");
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
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: this.$t('login.failed')
            })
            this.resetWaiterData()
          }
        })
        .catch(e=>{
          console.log(e)
        })
      } else {
        document.getElementsByClassName("pin-pad").classList.add("disabled");
      }

    },
    resetWaiterData () {
      this.password = ''
      document.getElementById("one").classList.remove('active')
      document.getElementById("two").classList.remove('active')
      document.getElementById("three").classList.remove("active");
      document.getElementById("four").classList.remove("active");
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
    padding: 40px 50px 60px;
    .back {
      font-family: "Raleway",sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 120%;
      text-align: center;
      font-feature-settings: 'pnum' on, 'lnum' on;
      color: #5B5B5B;
      text-decoration: none;
      background: #EBEBEB;
      border-radius: 80px;
    }
    .header-block {
      h3 {
        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 130%;
      }
    }
    .pin-pad {
      width: 180px;
      margin: auto;
      .pin-code {
        span {
          width: 15px;
          height: 15px;
          background: #F5F5F5;
          border: 1px solid #B5B5B5;
          box-sizing: border-box;
          border-radius: 50%;
        }
        .active {
          background: #B5B5B5;
        }
      }
      .btn-number {
        width: 50px;
        height: 50px;
        background: #EBEBEB;
        border: 2px solid #D2D2D2;
        border-radius: 50%;
        font-family: 'Raleway',sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 130%;
        margin-left: 10px;
        cursor: pointer;
        font-feature-settings: 'pnum' on, 'lnum' on;
        color: #5B5B5B;
        &:active {
          background-color: rgba(85, 62, 62, 9%);
          outline: 0;
        }
      }
    }
  }
}
</style>
