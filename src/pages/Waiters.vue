<template>
<q-page>
all waiters
  <router-link to="/restaurant/login">login</router-link>
</q-page>
</template>

<script>
import {api} from "boot/axios";

export default {
  name: "Waiters",
  mounted() {
    this.getAllWaiters()
  },
  methods: {
    getAllWaiters() {
      api.get('staff/list', {
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('ownerToken') //the token is a variable which holds the token
        }
      })
      .then(res=>{
        console.log(res.data)
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
