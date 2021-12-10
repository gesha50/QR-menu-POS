<template>
<q-page>
all waiters
  <div v-for="(waiter, i) in waiters" :key="i" class="">
    <router-link :to="'/restaurant/login/' + waiter.id">{{waiter.name}}</router-link>
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
      api.get('api/staff/list', {
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

<style scoped>

</style>
