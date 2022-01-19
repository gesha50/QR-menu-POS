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
        <h3 class="no-margin text-center">Список официантов</h3>
        <div class="input-container q-mx-auto q-mt-md relative-position	">
          <img class="absolute" src="../assets/img/search.svg" alt="search">
          <input class="no-border q-py-sm" type="text" name="waiterSearch" placeholder="Поиск...">
        </div>
      </div>
      <div class="scroll-bar scroll-y overflow-auto">
        <div class="LoginPage row items-center">
          <div v-for="(waiter, i) in waiters" :key="i" class="col-6 col-md-4 waiters">
            <router-link class="row items-center no-wrap bg-white q-pa-md" :to="'/restaurant/login/' + waiter.id">
              <img width="65" height="65" src="https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png" alt="waiter">
              <span class="waiter-name q-ml-md">{{waiter.name}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import {api} from "boot/axios";

export default {
  name: "Waiters",
  data() {
    return {
      waiters: [],
    }
  },
  mounted() {
    this.getAllWaiters()
  },
  methods: {
    getAllWaiters() {
      api.get('/api/staff/list', {
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('ownerToken')
        }
      })
      .then(res=>{
        console.log(res.data)
        this.waiters = res.data.list
      })
      .catch(e=>{
        console.log(e)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
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
      .input-container {
        width: 270px;
        img {
          width: 20px;
          height: 20px;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
        input {
          width: 100%;
          background: #F5F5F5;
          border-radius: 50px;
          outline: none;
          padding-left: 40px;
          font-family: 'Raleway',sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 120%;
          color: #000;
          &:placeholder {
            color: #B5B5B5;
          }
        }
      }
    }
    .scroll-bar {
      max-height: 300px;
    }
    .scroll-bar::-webkit-scrollbar {
      display: none;
    }
    .LoginPage {
      .waiters {
        padding: 0 10px 10px 0;
        a {
          text-decoration: none;
          border-radius: 13px;
          img {
            border-radius:50%;
          }
          .waiter-name {
            font-family: 'Raleway',sans-serif;
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 130%;
            color: #1E1E1E;
            height: 26px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
@media (max-width: 1040px) {
  .q-page {
    .bg {
      width: 50%;
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
    }
  }
}
</style>
