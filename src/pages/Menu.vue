<template>
<div class="Menu row relative-position">
  <div class="col-11">
    <menu-list></menu-list>
  </div>
  <div class="absolute-right" style="width: 120px;">
    <sidebar></sidebar>
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
    created() {
      this.$store.dispatch('items/createCartForCurrentTable', this.$route.path.split('/')[2])
    },
    mounted() {

    },
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
