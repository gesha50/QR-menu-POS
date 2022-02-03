<template>
<div class="MenuList q-pa-md">
    <div class="row">
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
      // store
      searchItemInMenu() {
        return this.$store.getters['items/searchItemInMenu']
      },
      items() {
        return this.$store.getters['items/items']
      },
      category_id() {
        return this.$store.getters['items/activeCategoryID']
      },
      // -----

      filteredItems() {
        if (this.searchItemInMenu === '') {
          return this.items.filter(item => item.category_id === this.category_id)
        } else {
          let itemsInCategory = this.items.filter(item => item.category_id === this.category_id)
          return itemsInCategory.filter(el => {
            let str = el.name.toLowerCase()
            return str.includes(this.searchItemInMenu.toLowerCase())
          })
        }
      },
    },
    methods: {},
})
</script>

<style lang="scss" scoped>
@media (max-width: $breakpoint-xs-max) {
  .MenuList {
    padding: 10px 5px;
  }
}
</style>
