<template>
<div class="Menu row">
  <div class="col-1">
    <sidebar></sidebar>
  </div>
  <div class="col-11">
    <menu-list></menu-list>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import Sidebar from "components/menu/Sidebar";
import MenuList from "components/menu/MenuList";

export default defineComponent({
    name: "Menu",
    data() {
        return {

        }
    },
    created() {},
    mounted() {},
    components: {
      Sidebar,
      MenuList,
    },
    computed: {},
    methods: {},
})
</script>

<style lang="scss" scoped>

</style>
