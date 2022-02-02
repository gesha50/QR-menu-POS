<template>
<div class="MenuList q-pa-md">
    <div class="row justify-around">
      <card-item
        v-for="(item, index) in filteredItems"
        :key="index"
        :item="item"
      ></card-item>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import CardItem from "components/menu/CardItem";

export default defineComponent({
    name: "MenuList",
    data() {
        return {

        }
    },
    created() {},
    mounted() {
      this.$store.dispatch('items/getItems')
    },
    components: {
      CardItem,
    },
    computed: {
      filteredItems() {
        return this.$store.getters['items/items'].filter(item => item.category_id === this.category_id)
      },
      category_id() {
        return this.$store.getters['items/activeCategoryID']
      },
    },
    methods: {},
})
</script>

<style lang="scss" scoped>

</style>
