<template>
<q-page>
  <div class="bg absolute-center">
    <div class="q-gutter-sm flex justify-center">
      <div class="text-center">
        <img class="logo" src="../assets/img/logo_login.svg" alt="logo">
      </div>
    </div>
    <div class="column justify-center">
      <div class="q-pa-md LoginPage">
        <div v-for="(waiter, i) in waiters" :key="i" class="">
          <router-link :to="'/restaurant/login/' + waiter.id">{{waiter.name}}</router-link>
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

<style lang="scss">

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
