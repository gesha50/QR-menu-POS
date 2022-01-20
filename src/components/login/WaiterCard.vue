<template>
<div class="WaiterCard">
    <router-link class="row items-center no-wrap bg-white q-pa-md" :to="'/restaurant/login/' + waiter.id">
      <img width="65" height="65" src="https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png" alt="waiter">
      <span class="waiter-name q-ml-md">{{waiter.name}}</span>
    </router-link>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "WaiterCard",
    props: ['waiter'],
    data() {
        return {

        }
    },
    created() {},
    mounted() {},
    components: {},
    computed: {},
    methods: {},
})
</script>

<style lang="scss" scoped>
.WaiterCard {
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
</style>
